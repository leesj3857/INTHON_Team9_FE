import { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import DiaryCont from '../components/ViewComponents/DiaryCont';
import Comments from '../components/ArchiveComponents/Comments';
import { api } from '../api';

const typeIcons = {
  '글': '/writing_filled.png',
  '영화': '/film_filled.png',
  '드라마': '/film_filled.png',
  '음악': '/music_filled.png',
  '그림': '/picture_filled.png',
};

export default function LastView() {
  const location = useLocation();
  const data = location.state; // 보관함 카드에서 전달된 조각글
  const [view, setView] = useState('myCont');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myPost, setMyPost] = useState({ content: '', comment: '' });
  const [twinPost, setTwinPost] = useState({ date: '', content: '', comment: '' });

  const dateOnly = data ? data.createdDate.split('T')[0] : '';

  useEffect(() => {
    if (!data) return;
    const formattedDate = new Date(dateOnly);
    const year = formattedDate.getFullYear();
    const month = formattedDate.toLocaleString('ko-KR', { month: 'long' });
    const day = formattedDate.getDate();
    const title = document.querySelector('.lastViewTitle');
    if (title) title.textContent = `${year}년 ${month} ${day}일의 조각글`;

    let cancelled = false;
    (async () => {
      try {
        const mine = await api.fetchPostDetail(data.id);
        if (cancelled) return;
        setMyPost({
          content: mine.content,
          comment: mine.comments && mine.comments.length ? mine.comments[0] : '',
        });
        if (!mine.twinPostId) return;
        const twin = await api.fetchPostDetail(mine.twinPostId);
        if (cancelled) return;
        setTwinPost({
          date: twin.createdDate.split('T')[0],
          content: twin.content,
          comment: twin.comments && twin.comments.length ? twin.comments[0] : '',
        });
      } catch (error) {
        console.error('요청 오류:', error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [data, dateOnly]);

  // 새로고침 등으로 state 가 없으면 보관함으로
  if (!data) return <Navigate to="/archive" replace />;

  const summary = data.authorMessage.split('.')[0] + '.';
  const iconSrc = typeIcons[data.category];

  const archiveItemsToUnknown = { date: dateOnly, writer: '나', content: myPost.content };
  const archiveItemsFromUnknown = { date: twinPost.date, writer: '익명', content: twinPost.content };
  // user 가 비어 있으면 "답변을 기다리는 중" 으로 표시됨
  const commentItemsFromUnknown = { user: myPost.comment ? '나' : '', content: myPost.comment };
  const commentItemsToUnknown = { user: '익명', content: twinPost.comment };

  return (
    <div className='w-full h-full relative flex flex-col items-center p-4 text-white overflow-auto' style={{ backgroundColor: '#321E5B' }}>
      {/* 상단 전환 버튼 */}
      <div className="flex justify-between items-center w-5/6 max-w-md mb-4  rounded-full " style={{ border: '1px solid #7763a5', padding: '3px' }}>
        <button
          onClick={() => setView('myCont')}
          className={`flex-1 rounded-full px-4 py-2  transition-all duration-500 ${view === 'myCont' ? `bg-white text-purple-800` : `bg-transparent text-white`} pretendard`}
        >
          나의 조각글
        </button>
        <button
          onClick={() => setView('myComment')}
          className={`flex-1 rounded-full px-4 py-2  transition-all duration-500 ${view === 'myComment' ? `bg-white text-purple-800` : `bg-transparent text-white`} pretendard`}
        >
          내가 남긴 말
        </button>
      </div>

      {/* 글 조각 소개 */}
      <div onClick={() => setIsModalOpen(true)} className="text-center flex flex-col justify-center items-center gap-2 py-3 w-5/6 rounded-xl bg-white/90 text-black cursor-pointer" >
        <img src={iconSrc} alt="type icon" className="h-5 mb-2" />
        <p className="text-xs font-normal m-0 pretendard">{summary}</p>
        <p className="text-xs font-semibold m-0 pretendard">{data.author}</p>
      </div>

      <img className='h-16 my-5' src="/star.png" alt="" />
      <div className='flex flex-col gap-10 w-full justify-center items-center'>
        <DiaryCont archiveItems={view === 'myCont' ? archiveItemsToUnknown : archiveItemsFromUnknown}></DiaryCont>
        <Comments items={view === 'myCont' ? commentItemsFromUnknown : commentItemsToUnknown}></Comments>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <div
            className="bg-white rounded-lg p-6 w-[257px] h-[354px] text-black text-center relative flex flex-col justify-center items-center gap-5 transform transition-transform duration-300 ease-out"
            style={{ animation: 'scaleUp 0.3s ease-out' }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-lg font-bold "
            >
              &times;
            </button>
            <img src={iconSrc} alt="type icon" className="w-[17px] h-[17px]" />
            <div>
              <p className='text-sm font-semibold pretendard'>{data.title}</p>
              <p className='text-xs font-normal pretendard'>{data.author}</p>
            </div>
            <div className='border-solid border-2 w-1/3 border-purple-950'></div>
            <p className='m-3 text-[10px] pretendard'>{data.authorMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}
