import LoginForm from '../components/ArchiveComponents/loginForm';
import ArchiveComponents from '../components/ArchiveComponents/archiveComp';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { api } from '../api';

export default function Archive() {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const login = useSelector((state) => state.login.isLoggedIn);
  const phoneNumber = useSelector((state) => state.user.number);
  const [archiveItems, setArchiveItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.querySelector('body').classList.remove('grad');
    document.querySelector('body').style.backgroundColor = '#321E5B';
  }, []);

  useEffect(() => {
    if (!login) return;
    let cancelled = false;
    setIsLoading(true);
    api
      .fetchUserPosts(phoneNumber)
      .then((posts) => {
        if (!cancelled) setArchiveItems(posts);
      })
      .catch((error) => console.error('요청 오류:', error))
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [login, phoneNumber]);

  const totalPages = Math.max(1, Math.ceil(archiveItems.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = archiveItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full h-full relative flex justify-center items-center overflow-hidden" style={{ height: '85%' }}>
      <div className={`w-full h-full transition-transform duration-500 ${!login ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ position: 'absolute', top: 0, left: 0 }}>
        <LoginForm />
      </div>
      <div className={`archive-grid grid gap-y-5 gap-x-4 justify-center content-start overflow-auto transition-transform duration-500 ${login ? 'translate-x-0 ' : 'translate-x-full'}`}
        style={{ position: 'absolute', top: 0, left: login ? '5%' : '100%', width: '90%', height: '90%', gridTemplateColumns: 'repeat(2, 159px)' }}>
        {login && !isLoading && archiveItems.length === 0 && (
          <div className="col-span-2 flex justify-center items-center text-white/70 text-sm pretendard">
            아직 남긴 조각글이 없어요
          </div>
        )}
        {currentItems.map((item) => (
          <div key={item.id} className="w-full h-full">
            <ArchiveComponents item={item} />
          </div>
        ))}
      </div>

      {/* 페이지네이션 컨트롤 */}
      {login &&
        <div className="pagination-controls flex justify-center gap-4 mt-4 absolute bottom-0">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded-xl disabled:opacity-50"
          >
            이전
          </button>
          <span className="text-white flex justify-center items-center">{currentPage} / {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded-xl disabled:opacity-50"
          >
            다음
          </button>
        </div>
      }
    </div>
  );
}
