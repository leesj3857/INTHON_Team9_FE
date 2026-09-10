import { useDispatch } from 'react-redux';
import { toggleLogin } from '../../features/loginSlice';
import { useState } from 'react';
import { setNumber } from '../../features/userSlice';
import { api } from '../../api';

const DEMO_PHONE = '01012345678';

export default function LoginForm() {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [wrong, setWrong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const submit = async (phone) => {
    if (isLoading) return;
    setIsLoading(true);
    setWrong(false);
    try {
      await api.login({ phone });
      dispatch(setNumber(phone));
      dispatch(toggleLogin());
    } catch (error) {
      setWrong(true);
      console.error('로그인 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = () => submit(phoneNumber);

  const enterAsDemo = () => {
    setPhoneNumber(DEMO_PHONE);
    submit(DEMO_PHONE);
  };

  return (
    <div className="login-form-container w-full h-full flex flex-col justify-center items-center gap-10">
      <div className="form-group flex flex-col text-white w-[306px] gap-2">
        <div className="flex items-center justify-start">
          <label className="text-purple-100 text-xs font-medium pretendard">
            전화번호
            <span className="ml-2 text-white/60 text-[10px] font-normal pretendard">
              *조각글을 작성할 때 입력한 전화번호를 입력해주세요
            </span>
          </label>
        </div>
        <input
          type="tel"
          placeholder="전화번호를 입력해주세요."
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          onKeyDown={(e) => e.key === 'Enter' && isValid()}
          className={
            'text-white pretendard transition-all duration-100 form-input-tel mt-[7px] px-5 py-2 text-xs outline-none focus:border-solid focus:border-white focus:border w-[306px] h-9 bg-[#7763a5]/50 rounded-[18px]'
          }
        />
      </div>
      {wrong &&
        <div className='text-xs font-medium text-red-500 w-[306px] pretendard '>
          전화번호를 다시 확인하세요 (숫자 10~11자리)
        </div>
      }
      <div className="flex flex-col gap-3 items-center">
        <button
          onClick={isValid}
          disabled={isLoading}
          className="w-[306px] h-[39px] bg-white/80 py-2 text-[#2d1a58] text-xs pretendard rounded-full disabled:opacity-60"
        >
          입장하기
        </button>
        <button
          type="button"
          onClick={enterAsDemo}
          disabled={isLoading}
          className="w-[306px] h-[39px] py-2 text-white text-xs pretendard rounded-full border border-white/50 disabled:opacity-60"
        >
          데모 계정으로 둘러보기
        </button>
        <p className="text-white/60 text-[10px] pretendard text-center w-[306px]">
          데모 모드: 비밀번호 없이 전화번호만으로 입장할 수 있어요
        </p>
      </div>
    </div>
  );
}
