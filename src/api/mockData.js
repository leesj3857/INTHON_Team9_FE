export function ago({ days = 0, hours = 0, minutes = 0 } = {}) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours, d.getMinutes() - minutes, 0, 0);
  return toLocalISO(d);
}

export function toLocalISO(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  );
}

export const RECOMMENDATIONS = [
  {
    key: 'career',
    keywords: ['취업', '취직', '진로', '미래', '불안', '졸업', '조급', '늦', '창업', '회사'],
    category: '글',
    author: '로버트 프로스트',
    title: 'The Road Not Taken',
    authorMessage:
      '삶의 불확실함 속에서 자신의 길을 찾고자 하는 마음이 느껴져요. ' +
      '프로스트는 숲속 두 갈래 길 앞에서 사람이 덜 다닌 길을 택했다고 말합니다. ' +
      '어느 길이 옳은지는 걸어본 뒤에야 알 수 있어요. 지금 당신이 걷는 길도 결국 당신의 이야기가 될 거예요.',
  },
  {
    key: 'lonely',
    keywords: ['외로', '혼자', '쓸쓸', '고독', '아무도', '말을 하지'],
    category: '그림',
    author: '에드워드 호퍼',
    title: 'Nighthawks',
    authorMessage:
      '도시의 불빛 속에서 홀로 남겨진 듯한 고요한 마음이 담겨 있어요. ' +
      '호퍼의 밤의 사람들 속 인물들은 같은 공간에 있지만 서로 다른 곳을 바라봅니다. ' +
      '그 고독은 당신만의 것이 아니에요. 같은 밤을 견디는 사람들이 이 그림 속에도, 이 조각집에도 있습니다.',
  },
  {
    key: 'breakup',
    keywords: ['이별', '헤어', '그리', '보고싶', '보고 싶', '지우', '그 사람'],
    category: '음악',
    author: '아이유',
    title: '밤편지',
    authorMessage:
      '떠나보낸 사람을 향한 그리움이 아직 마음에 머물러 있어요. ' +
      '밤편지는 닿지 않을 걸 알면서도 마음을 적어 내려가는 노래입니다. ' +
      '그리움은 그 시간이 진심이었다는 증거예요. 서두르지 않아도 괜찮아요.',
  },
  {
    key: 'tired',
    keywords: ['지쳤', '지친', '피곤', '쉬고', '힘들', '번아웃', '출근', '퇴근', '회의', '똑같은'],
    category: '영화',
    author: '임순례',
    title: '리틀 포레스트',
    authorMessage:
      '반복되는 일상에 지쳐 잠시 멈추고 싶은 마음이 느껴져요. ' +
      '리틀 포레스트의 혜원은 도시를 떠나 고향에서 직접 밥을 지어 먹으며 천천히 자신을 회복합니다. ' +
      '멈추는 것도 앞으로 나아가는 방법 중 하나예요. 당신에게도 작은 숲이 필요한 때인지도 몰라요.',
  },
  {
    key: 'family',
    keywords: ['가족', '엄마', '아빠', '어머니', '아버지', '부모', '전화', '동생', '언니', '누나'],
    category: '드라마',
    author: '박해영',
    title: '나의 아저씨',
    authorMessage:
      '가까운 사람에게 미처 전하지 못한 마음을 돌아보게 되는 글이에요. ' +
      '나의 아저씨는 상처 입은 사람들이 서로의 안부를 물으며 조금씩 살아갈 힘을 얻는 이야기입니다. ' +
      '별말 아닌 말 한마디가 누군가에게는 하루를 버티게 하는 힘이 되기도 해요.',
  },
  {
    key: 'night',
    keywords: ['밤', '별', '새벽', '잠', '천장', '불면'],
    category: '그림',
    author: '빈센트 반 고흐',
    title: '별이 빛나는 밤',
    authorMessage:
      '잠들지 못하는 새벽, 감춰둔 마음들이 하나씩 떠오르는 밤이 담겨 있어요. ' +
      '고흐는 요양원의 창밖으로 본 밤하늘을 소용돌이치는 별빛으로 그려냈습니다. ' +
      '혼란스러운 밤도 이렇게 아름다울 수 있다는 걸, 그는 그림으로 말하고 있어요.',
  },
  {
    key: 'growth',
    keywords: ['실수', '자책', '뒤처', '못하', '처음', '서툴', '익숙'],
    category: '글',
    author: '나태주',
    title: '풀꽃',
    authorMessage:
      '서툰 자신을 자책하면서도 조금씩 나아가고 있는 마음이 보여요. ' +
      '나태주 시인은 자세히 보아야 예쁘고, 오래 보아야 사랑스럽다고 썼습니다. ' +
      '당신도 그렇습니다. 오늘의 실수는 오래 보면 성장의 흔적으로 남을 거예요.',
  },
  {
    key: 'calm',
    keywords: ['바다', '파도', '고요', '감사', '평온', '귀한', '산책', '바람'],
    category: '음악',
    author: '김광석',
    title: '바람이 불어오는 곳',
    authorMessage:
      '별일 없이 지나가는 하루의 소중함을 발견한 마음이에요. ' +
      '김광석은 바람이 불어오는 곳, 그곳으로 가겠다고 담담하게 노래합니다. ' +
      '거창한 목적지가 아니어도 괜찮아요. 오늘처럼 조용한 하루가 쌓여 삶이 됩니다.',
  },
];

export const DEFAULT_RECOMMENDATION = {
  category: '글',
  author: '윤동주',
  title: '서시',
  authorMessage:
    '스스로에게 솔직해지려는 마음이 담긴 글이에요. ' +
    '윤동주는 죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를 바란다고 썼습니다. ' +
    '자신의 마음을 이렇게 글로 꺼내 놓는 일 자체가 이미 용기예요.',
};

/** 다른 사용자들의 조각글 풀. 새로 작성된 조각글의 "닮은 조각글"로 매칭됩니다. */
export const STRANGER_POSTS = [
  {
    id: 's1',
    nickname: '도담',
    recommendation: 'career',
    createdDate: ago({ hours: 5 }),
    content:
      '요즘 내가 잘 하고 있는 건지 모르겠다. 친구들은 하나둘 취직을 하는데 나는 아직도 제자리인 것 같다. ' +
      '늦어지는 게 아닐까 조급해지다가도, 내 속도대로 가도 괜찮다고 스스로를 다독여본다.',
    comments: [
      '저도 같은 고민을 하고 있어요. 남들의 속도가 아니라 나의 속도로 가는 중이라고 믿어요. 우리 조금만 더 걸어봐요.',
    ],
  },
  {
    id: 's2',
    nickname: '하루',
    recommendation: 'lonely',
    createdDate: ago({ days: 1, hours: 2 }),
    content:
      '오늘 하루 종일 아무와도 말을 하지 않았다는 걸 밤이 되어서야 알았다. ' +
      '도시에 사람은 이렇게 많은데 왜 나는 늘 혼자인 것 같을까.',
    comments: [
      '혼자라고 느껴지는 밤에 이 글을 읽고 있는 저도 있어요. 오늘은 조금 덜 혼자인 밤이길 바라요.',
    ],
  },
  {
    id: 's3',
    nickname: '봄비',
    recommendation: 'breakup',
    createdDate: ago({ days: 9, hours: 1 }),
    content:
      '헤어진 지 석 달이 지났는데 아직도 그 사람이 듣던 노래를 지우지 못했다. ' +
      '잊고 싶은 건지, 잊고 싶지 않은 건지 모르겠다.',
    comments: [
      '지우지 못한 노래는 아직 그 시간을 살고 있다는 뜻이겠죠. 천천히, 준비가 되면 그때 지워도 늦지 않아요.',
    ],
  },
  {
    id: 's4',
    nickname: '노을',
    recommendation: 'tired',
    createdDate: ago({ days: 3, hours: 4 }),
    content:
      '매일 똑같은 출근길, 똑같은 회의. 열심히 살고 있는데 어디로 가고 있는지는 모르겠다. ' +
      '그냥 며칠만 아무것도 안 하고 쉬고 싶다.',
    comments: [
      '가끔은 멈춰 서는 것도 앞으로 가는 방법이라고 생각해요. 며칠쯤 푹 쉬어도 세상은 무너지지 않더라고요.',
    ],
  },
  {
    id: 's5',
    nickname: '온기',
    recommendation: 'family',
    createdDate: ago({ days: 14, hours: 3 }),
    content:
      '엄마가 아프시고 나서야 내가 얼마나 무심한 딸이었는지 알게 됐다. ' +
      '오늘은 퇴근길에 전화를 걸었다. 별말 아닌 말들이 이렇게 소중했나.',
    comments: [
      '별말 아닌 말이 제일 오래 남더라고요. 오늘 건 전화, 참 잘하셨어요.',
    ],
  },
  {
    id: 's6',
    nickname: '새벽',
    recommendation: 'night',
    createdDate: ago({ days: 6, hours: 1 }),
    content:
      '새벽 세 시. 또 잠이 오지 않아 천장만 보고 있다. ' +
      '낮에는 괜찮은 척 잘 지내는데, 밤이 되면 감춰둔 마음들이 하나씩 올라온다.',
    comments: [
      '새벽에 올라오는 마음들은 대체로 낮보다 솔직하죠. 그 마음들을 미워하지 않으셨으면 해요.',
    ],
  },
  {
    id: 's7',
    nickname: '여름',
    recommendation: 'growth',
    createdDate: ago({ days: 21, hours: 2 }),
    content:
      '처음 하는 일이라 매일 실수투성이다. 나만 뒤처지는 것 같아서 밤마다 자책한다. ' +
      '언젠가 익숙해지는 날이 오긴 할까.',
    comments: [
      '익숙해지는 날은 어느 순간 조용히 와 있더라고요. 지금의 실수는 그날의 밑거름이에요.',
    ],
  },
  {
    id: 's8',
    nickname: '바다',
    recommendation: 'calm',
    createdDate: ago({ days: 40, hours: 6 }),
    content:
      '오랜만에 바다를 보러 갔다. 파도 소리를 듣고 있으니 한동안 잊고 있던 마음이 조용해졌다. ' +
      '별일 없이 지나가는 하루가 얼마나 귀한지 새삼 느낀다.',
    comments: [
      '저도 오늘 하루를 조금 더 귀하게 여겨보려고요. 좋은 하루를 나눠주셔서 고마워요.',
    ],
  },
];

/** 데모 계정의 보관함에 미리 들어 있는 조각글 */
export const DEMO_POSTS = [
  {
    id: 'm1',
    nickname: '별빛',
    recommendation: 'career',
    twinPostId: 's1',
    createdDate: ago({ hours: 3 }),
    content:
      '요즘 내가 잘 하고 있는 건지, 이렇게 계속 졸업을 미뤄도 되는 건지 고민이 될 때가 있다. ' +
      '주변에 창업하는 사람들을 보면 안도하기도 하지만, 좋은 회사에 취직하는 친구들을 보면 불안하고 조급한 마음도 든다. ' +
      '내가 너무 늦어지는 건 아닐까. 무엇보다 지금 하는 일이 어떻게 끝날지 감조차 오지 않는다.',
    comments: [],
  },
  {
    id: 'm2',
    nickname: '별빛',
    recommendation: 'lonely',
    twinPostId: 's2',
    createdDate: ago({ days: 1, hours: 1 }),
    content:
      '자취를 시작한 지 일 년이 됐다. 처음엔 자유로워서 좋았는데, 요즘은 불 꺼진 집에 들어올 때마다 이상하게 마음이 가라앉는다. ' +
      '누군가에게 오늘 있었던 일을 말하고 싶은데, 막상 연락할 사람이 떠오르지 않는다.',
    comments: [
      '혼자인 밤이 길게 느껴질 때, 누군가도 같은 창밖을 보고 있다는 걸 기억해 주세요. 오늘은 제가 그 누군가였어요.',
    ],
  },
  {
    id: 'm3',
    nickname: '별빛',
    recommendation: 'tired',
    twinPostId: 's4',
    createdDate: ago({ days: 3, hours: 2 }),
    content:
      '이번 주만 벌써 세 번째 야근이다. 열심히 살고 있다는 건 알겠는데 정작 내가 뭘 위해 이러고 있는지 모르겠다. ' +
      '주말에는 아무것도 하지 않고 그냥 쉬고 싶다. 그래도 되는 걸까.',
    comments: ['쉬는 것도 용기예요. 당신의 주말을 응원할게요. 아무것도 하지 않은 하루도 충분히 의미 있어요.'],
  },
  {
    id: 'm4',
    nickname: '별빛',
    recommendation: 'night',
    twinPostId: 's6',
    createdDate: ago({ days: 6 }),
    content:
      '새벽 두 시가 넘었는데 잠이 오지 않는다. 낮에는 아무렇지 않게 웃고 떠들었는데, ' +
      '밤이 되니 낮에 삼켰던 말들이 하나씩 떠오른다. 별을 보러 옥상에 올라갔다.',
    comments: ['그 옥상에서 본 별이 조금은 위로가 되었기를 바라요. 삼킨 말들은 여기에 두고 가셔도 돼요.'],
  },
  {
    id: 'm5',
    nickname: '별빛',
    recommendation: 'breakup',
    twinPostId: 's3',
    createdDate: ago({ days: 9 }),
    content:
      '함께 가기로 했던 전시를 오늘 혼자 다녀왔다. 그 사람이 좋아했을 그림 앞에서 한참을 서 있었다. ' +
      '보고 싶다는 말을 이제는 어디에도 할 수 없다는 게 이상하다.',
    comments: ['혼자 다녀온 전시가 언젠가는 당신만의 기억으로 남을 거예요. 오늘의 발걸음이 참 용감했어요.'],
  },
  {
    id: 'm6',
    nickname: '별빛',
    recommendation: 'family',
    twinPostId: 's5',
    createdDate: ago({ days: 14 }),
    content:
      '아빠 생신인데 바쁘다는 핑계로 전화만 드렸다. 목소리가 많이 작아지셨다. ' +
      '늘 옆에 있을 것 같던 사람이 조금씩 나이 들어가고 있다는 걸 오늘 처음 실감했다.',
    comments: ['전화 한 통이 아버지께는 하루 종일 기다린 선물이었을 거예요. 다음엔 조금 더 긴 통화를 해보는 건 어때요.'],
  },
  {
    id: 'm7',
    nickname: '별빛',
    recommendation: 'growth',
    twinPostId: 's7',
    createdDate: ago({ days: 21 }),
    content:
      '입사 한 달째. 오늘도 같은 실수를 반복했다. 팀장님은 괜찮다고 하셨지만 나 자신에게 화가 난다. ' +
      '다들 처음엔 이랬을까. 나만 이렇게 서툰 걸까.',
    comments: ['다들 그랬어요, 정말로요. 서툰 시간을 지나고 있다는 건 배우고 있다는 뜻이에요.'],
  },
  {
    id: 'm8',
    nickname: '별빛',
    recommendation: 'calm',
    twinPostId: 's8',
    createdDate: ago({ days: 40 }),
    content:
      '오늘은 아무 일도 없었다. 산책을 하고, 좋아하는 카페에서 책을 읽고, 저녁엔 오랜만에 친구와 통화를 했다. ' +
      '이런 하루가 그냥 지나가는 게 아까워서 여기에 적어둔다.',
    comments: ['아무 일도 없는 하루를 이렇게 기록해 두는 마음이 참 예뻐요. 저도 오늘을 적어봐야겠어요.'],
  },
];

/** 새로 작성한 조각글에 시간이 지나면 도착하는 익명의 답장 */
export const CANNED_REPLIES = [
  '당신의 글을 읽고 한참을 머물렀어요. 지금 느끼는 그 마음, 이상한 게 아니에요. 오늘 하루도 잘 버텨줘서 고마워요.',
  '비슷한 시간을 지나온 사람으로서 말해주고 싶어요. 지나고 보면 이 시기도 당신의 일부가 되어 있을 거예요.',
  '글에서 조심스럽게 꺼내 놓은 마음이 느껴졌어요. 누군가 읽고 있다는 것만으로 조금은 가벼워졌으면 해요.',
];

/** 새 조각글에 답장이 도착하기까지 걸리는 시간(ms). 데모 흐름을 위해 짧게 설정 */
export const REPLY_ARRIVAL_DELAY_MS = 5 * 1000;
