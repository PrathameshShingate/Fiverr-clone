import { useCookies } from "react-cookie";
import { useContext, useRef, useEffect } from "react";
import { ModalContext } from "../context/ModalContext";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/constants";
import axios from "axios";

const AuthWrapper = ({ type }) => {
  const { dispatch } = useContext(ModalContext);
  const [cookies, setCookies] = useCookies();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    try {
      if (emailRef.current.value && passwordRef.current.value) {
        const {
          data: { user, jwt },
        } = await axios.post(
          type === "signIn" ? LOGIN_ROUTE : SIGNUP_ROUTE,
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          },
          { withCredentials: true }
        );
        setCookies("jwt", jwt);
        dispatch({
          type: "CLOSE_MODAL",
          payload: {
            showSignInModal: false,
            showSignUpModal: false,
          },
        });

        if (user) {
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed top-0 z-[100]">
      <div
        className="h-screen w-screen backdrop-blur fixed top-0"
        id="blur-div"
        onClick={() =>
          dispatch({
            type: "CLOSE_MODAL",
            payload: { showSignInModal: false, showSignUpModal: false },
          })
        }
      ></div>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div
          className="fixed z-[101] h-max w-max bg-white rounded-md flex flex-col justify-center items-center"
          id="auth-modal"
        >
          <div className="flex flex-col justify-center items-center p-8 gap-7">
            <h3 className="text-[#404145] font-bold text-2xl">
              {type === "signIn" ? "Sign In to Fiverr" : "Join Fiverr"}
            </h3>
            <div className="flex flex-col gap-5">
              <button className="text-white bg-blue-800 opacity-80 hover:opacity-75 rounded-[4.5px] py-3 px-5 font-semibold w-80 flex items-center justify-start gap-8">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                >
                  <path d="M20 10.0022C20.0004 8.09104 19.4532 6.2198 18.4231 4.61003C17.393 3.00026 15.9232 1.71938 14.1877 0.919062C12.4522 0.118741 10.5237 -0.167503 8.63053 0.0942223C6.73739 0.355948 4.9589 1.15468 3.50564 2.39585C2.05237 3.63701 0.985206 5.26863 0.430495 7.0975C-0.124217 8.92636 -0.143239 10.8759 0.37568 12.7152C0.894599 14.5546 1.92973 16.2067 3.35849 17.476C4.78726 18.7453 6.54983 19.5786 8.4375 19.8772V12.8922H5.89875V10.0022H8.4375V7.79843C8.38284 7.28399 8.44199 6.76382 8.61078 6.2748C8.77957 5.78577 9.05386 5.33986 9.4142 4.96866C9.77455 4.59746 10.2121 4.31007 10.6959 4.12684C11.1797 3.94362 11.6979 3.86905 12.2137 3.90843C12.9638 3.91828 13.7121 3.98346 14.4525 4.10343V6.56718H13.1925C12.9779 6.53911 12.7597 6.55967 12.554 6.62733C12.3484 6.69498 12.1607 6.80801 12.0046 6.95804C11.8486 7.10807 11.7283 7.29127 11.6526 7.49408C11.577 7.69689 11.5479 7.91411 11.5675 8.12968V10.0047H14.3412L13.8975 12.8947H11.5625V19.8834C13.9153 19.5112 16.058 18.3114 17.6048 16.4999C19.1516 14.6884 20.001 12.3842 20 10.0022Z"></path>
                </svg>
                <span className="text-base font-semibold">
                  Continue with Facebook
                </span>
              </button>
              <button className="border border-slate-300 hover:bg-gray-200 hover:bg-opacity-30 rounded-[4.5px] py-3 px-5 font-medium w-80 flex items-center justify-start gap-11">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 7.84363V11.307H13.8438C13.6365 12.428 12.9994 13.373 12.0489 14.0064V16.2534H14.9562C16.6601 14.6951 17.641 12.4029 17.641 9.67839C17.641 9.04502 17.5854 8.43176 17.4792 7.84865H9V7.84363Z"
                    fill="#3E82F1"
                  ></path>
                  <path
                    d="M9.00001 14.861C6.65394 14.861 4.67192 13.2876 3.96406 11.1714H0.955627V13.4937C2.43709 16.4142 5.48091 18.4198 9.00001 18.4198C11.432 18.4198 13.4697 17.6206 14.9562 16.2533L12.0489 14.0064C11.245 14.5443 10.2135 14.861 9.00001 14.861Z"
                    fill="#32A753"
                  ></path>
                  <path
                    d="M3.96404 5.45605H0.955617C0.348876 6.66246 0 8.02972 0 9.47238C0 10.915 0.348876 12.2823 0.955617 13.4887L3.96404 11.1714C3.78202 10.6335 3.6809 10.0605 3.6809 9.47238C3.6809 8.88426 3.78202 8.31122 3.96404 7.77336V5.45605Z"
                    fill="#F9BB00"
                  ></path>
                  <path
                    d="M0.955627 5.45597L3.96406 7.77327C4.67192 5.65703 6.65394 4.08368 9.00001 4.08368C10.3197 4.08368 11.5079 4.53608 12.4382 5.42078L15.0219 2.85214C13.4646 1.40948 11.427 0.52478 9.00001 0.52478C5.48091 0.52478 2.43709 2.53043 0.955627 5.45597Z"
                    fill="#E74133"
                  ></path>
                </svg>
                <span className="text-base text-[#404145] font-semibold">
                  Continue with Google
                </span>
              </button>
            </div>
            <div className="relative w-full text-center">
              <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-2/4 before:left-0 before:bg-slate-300">
                <span className="bg-white relative z-10 px-2">OR</span>
              </span>
            </div>
            <div className="flex flex-col gap-5">
              <input
                type="text"
                name="email"
                placeholder="Email / Username"
                ref={emailRef}
                className="border border-slate-300 py-2 px-3 w-80 text-[#404145] rounded-sm font-medium focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                ref={passwordRef}
                className="border border-slate-300 py-2 px-3 w-80 text-[#404145] rounded-sm font-medium focus:outline-none"
              />
              <button
                className="bg-[#1dbf73] text-white p-2 font-semibold rounded-[4.5px] hover:bg-[#1ba163] transition-all duration-200"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>
          </div>
          <div className="py-4 w-full flex items-center justify-center border-t border-r-slate-400">
            <span className="text-sm font-medium text-[#404145]">
              {type === "signIn" ? (
                <>
                  Not a member yet?&nbsp;
                  <span
                    className="text-[#1dbf73] cursor-pointer hover:underline"
                    onClick={() => {
                      dispatch({
                        type: "TOGGLE_SIGNUP_MODAL",
                        payload: { showSignUpModal: true },
                      });
                      dispatch({
                        type: "TOGGLE_SIGNIN_MODAL",
                        payload: { showSignInModal: false },
                      });
                    }}
                  >
                    Join now{" "}
                  </span>
                </>
              ) : (
                <>
                  Already a member?&nbsp;
                  <span
                    className="text-[#1dbf73] cursor-pointer hover:underline"
                    onClick={() => {
                      dispatch({
                        type: "TOGGLE_SIGNIN_MODAL",
                        payload: { showSignInModal: true },
                      });
                      dispatch({
                        type: "TOGGLE_SIGNUP_MODAL",
                        payload: { showSignUpModal: false },
                      });
                    }}
                  >
                    Sign In{" "}
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
