import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import React from 'react';
import Send from './pages/Send';
import Main from './pages/Main';
import Submitted from './pages/Submitted';
import Archive from './pages/Archive';
import LastView from './pages/LastView';
import { Link } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  function Navbar() {
    const location = useLocation();
    if (location.pathname !== '/send') {
      return (
        <nav style={{ position: 'absolute' }}>
          {/* <Link to="/main">main</Link>
              <br />
              <Link to="/send">send</Link>
              <br />
              <Link to="/view">view</Link> */}
        </nav>
      );
    }
    return null;
  }
  const navigate = useNavigate();

  return (
    <>
      {location.pathname !== '/main' &&
        (location.pathname !== '/archive' &&
        location.pathname !== '/lastview' ? (
          <div
            className="flex w-5/6 justify-between "
            style={{ height: '10%' }}
          >
            <Link
              to="/send"
              className="h-full flex items-center text-white gap-3"
            >
              <img className="h-1/3" src="/moon.png" alt="" />
              나의 조각집
            </Link>
            <div
              onClick={() => navigate('/archive')}
              className="h-full flex flex-col justify-center items-center text-white cursor-pointer"
            >
              <img className="h-1/5" src="/message.png" alt="" />
              <span className="text-sm pretendard">보관함</span>
            </div>
          </div>
        ) : location.pathname === '/archive' ? (
          <div
            className="flex w-5/6 justify-between "
            style={{ height: '10%' }}
          >
            <div className="h-full flex items-center text-white gap-3 text-xl font-semibold">
              <span onClick={() => navigate('/main')}>&lt;</span> &nbsp; 보관함
            </div>
          </div>
        ) : (
          <div
            className="flex w-5/6 justify-between items-center text-white"
            style={{ height: '10%' }}
          >
            <span className="lastViewTitle text-base
font-bold"></span>
            <span
              onClick={() => navigate('/archive')}
              className="text-3xl font-semibold"
            >
              <img className='w-[18px] h-[18px]' src="/close.png" alt="" />
            </span>
          </div>
        ))}

      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<Main />} />
        <Route path="/send" element={<Send />} />

        <Route path="/submitted" element={<Submitted />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/lastview" element={<LastView />} />
      </Routes>
    </>
  );
}
