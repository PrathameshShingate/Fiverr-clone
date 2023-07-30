import { createContext, useReducer, useEffect } from "react";
import ModalReducer from "./ModalReducer";

//add missing links, hover effects, cursor
//dashboard, add more 2 fields
//Tostify
//Logout functionality
//message profile photo
//solve Add gig error

const initialState = JSON.parse(localStorage.getItem("user")) || {
  showSignInModal: false,
  showSignUpModal: false,
  userInfo: undefined,
  isSeller: true,
  userOrders: [],
  userConversations: [],
};

export const ModalContext = createContext(initialState);

const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state));
  }, [state]);

  return (
    <ModalContext.Provider value={{ state: state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
