// 이 앱의 유일한 데이터 계층. 서버 없이 동작하며,
// 시드 데이터는 mockData.js 에 있고 사용자가 만든 조각글/답장은 localStorage 에 저장됩니다.
import {
  DEMO_POSTS,
  STRANGER_POSTS,
  RECOMMENDATIONS,
  DEFAULT_RECOMMENDATION,
  CANNED_REPLIES,
  REPLY_ARRIVAL_DELAY_MS,
  toLocalISO,
} from './mockData.js';

const STORAGE_KEY = 'jogakjip-demo-v1';
const LATENCY_MS = 400;

const delay = (ms = LATENCY_MS) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------- 저장소 ----------
let cache = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* localStorage 를 쓸 수 없는 환경이면 메모리만 사용 */
  }
  return { userPosts: [], extraComments: {} };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function getState() {
  if (!cache) cache = loadState();
  return cache;
}

function persist() {
  saveState(getState());
}

// ---------- 헬퍼 ----------
const recommendationByKey = Object.fromEntries(RECOMMENDATIONS.map((r) => [r.key, r]));

function withRecommendation(post) {
  const rec = recommendationByKey[post.recommendation] || DEFAULT_RECOMMENDATION;
  return {
    ...post,
    category: rec.category,
    author: rec.author,
    title: rec.title,
    authorMessage: rec.authorMessage,
  };
}

function findPost(id) {
  const { userPosts } = getState();
  return (
    userPosts.find((p) => p.id === id) ||
    DEMO_POSTS.find((p) => p.id === id) ||
    STRANGER_POSTS.find((p) => p.id === id) ||
    null
  );
}

function commentsOf(post) {
  const extra = getState().extraComments[post.id] || [];
  return [...extra, ...(post.comments || [])];
}

/** 새로 작성된 조각글에 일정 시간이 지나면 익명 답장이 도착한 것처럼 처리 */
function deliverPendingReply(post) {
  const state = getState();
  if (!state.userPosts.some((p) => p.id === post.id)) return;
  if (commentsOf(post).length > 0) return;
  const age = Date.now() - new Date(post.createdDate).getTime();
  if (age < REPLY_ARRIVAL_DELAY_MS) return;
  const idx = hash(post.id) % CANNED_REPLIES.length;
  state.extraComments[post.id] = [CANNED_REPLIES[idx]];
  persist();
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function scoreByKeywords(text, keywords) {
  return keywords.reduce((score, kw) => (text.includes(kw) ? score + 1 : score), 0);
}

function pickRecommendation(content) {
  let best = null;
  let bestScore = 0;
  RECOMMENDATIONS.forEach((rec) => {
    const score = scoreByKeywords(content, rec.keywords);
    if (score > bestScore) {
      best = rec;
      bestScore = score;
    }
  });
  return best;
}

function newId() {
  return `u${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

// ---------- API ----------

/** 로그인. 비밀번호 없이 전화번호 형식만 확인 */
export async function login({ phone }) {
  await delay();
  if (!/^\d{10,11}$/.test(phone)) {
    throw new Error('전화번호가 올바르지 않습니다.');
  }
  return { message: 'ok', data: { phone } };
}

/** 나와 닮은 조각글의 id (키워드 매칭) */
export async function fetchSimilarPostId({ content = '' } = {}) {
  await delay();
  const rec = pickRecommendation(content);
  const candidates = rec
    ? STRANGER_POSTS.filter((p) => p.recommendation === rec.key)
    : [];
  const pool = candidates.length ? candidates : STRANGER_POSTS;
  const pick = pool[hash(content) % pool.length];
  return pick.id;
}

/** 조각글 작성 */
export async function createPost({ content, nickname, phone, twinPostId }) {
  await delay(600);
  const rec = pickRecommendation(content);
  const post = {
    id: newId(),
    nickname,
    phone,
    recommendation: rec ? rec.key : null,
    twinPostId: twinPostId || (await fetchSimilarPostId({ content })),
    createdDate: toLocalISO(new Date()),
    content,
    comments: [],
  };
  const state = getState();
  state.userPosts.unshift(post);
  persist();
  return { message: '조각글이 저장되었습니다.', data: withRecommendation(post) };
}

/** 조각글 상세 */
export async function fetchPostDetail(id) {
  await delay();
  const post = findPost(id);
  if (!post) throw new Error('조각글을 찾을 수 없습니다.');
  deliverPendingReply(post);
  return { ...withRecommendation(post), comments: commentsOf(post) };
}

/** 보관함 목록 (시드 조각글 + 이 전화번호로 작성한 글) */
export async function fetchUserPosts(phone) {
  await delay();
  const { userPosts } = getState();
  const mine = userPosts.filter((p) => p.phone === phone);
  const all = [...mine, ...DEMO_POSTS].sort(
    (a, b) => new Date(b.createdDate) - new Date(a.createdDate),
  );
  all.forEach(deliverPendingReply);
  return all.map((p) => ({ ...withRecommendation(p), comments: commentsOf(p) }));
}

/** 조각글에 답장 남기기 */
export async function createComment({ postId, commentContent }) {
  await delay();
  const post = findPost(postId);
  if (!post) throw new Error('조각글을 찾을 수 없습니다.');
  const state = getState();
  const prev = state.extraComments[postId] || [];
  state.extraComments[postId] = [commentContent, ...prev];
  persist();
  return { message: '답장이 전송되었습니다.' };
}

