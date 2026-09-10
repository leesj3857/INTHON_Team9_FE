import PropTypes from 'prop-types';

export default function DiaryCont({ archiveItems }) {
  const {date, writer, content} = archiveItems
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.toLocaleString('ko-KR', { month: 'long' });
  const day = formattedDate.getDate();
  return (
 
    <div
    className={`flex flex-col ${writer === '나' ? `items-start`  : `items-end`} text-white w-5/6 p-6 rounded-2xl`} 
      style={{ backgroundColor: '#503E7D' }}
    >
      <div className="text-[#e8dfff] text-xs font-normal">
        {year}년 {month} {day}일,
      </div>
      <div className="title text-center py-[7px]">
        <span className="text-[#e8dfff] text-xl font-semibold">
          {writer==='나' ? `나의 조각글` :`${writer}님으로부터`}
        </span>
      </div>
      <div className=" border mt-[7px] border-[#e8dfff] w-full"></div>
      <div className="cont py-4"> 
        <span className="text-white text-xs font-normal pretendard">
                 {content}
        </span> 
      </div>
    </div>
  );
}

DiaryCont.propTypes = {
  archiveItems: PropTypes.shape({
      date: PropTypes.string,
      writer: PropTypes.string,
      content: PropTypes.string,
  }).isRequired,
};

