const ModalReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_SIGNIN_MODAL":
      return {
        ...state,
        showSignInModal: action.payload.showSignInModal,
      };
    case "TOGGLE_SIGNUP_MODAL":
      return {
        ...state,
        showSignUpModal: action.payload.showSignUpModal,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        showSignInModal: action.payload.showSignInModal,
        showSignUpModal: action.payload.showSignUpModal,
      };
    case "SET_USER":
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    case "SWITCH_MODE":
      return {
        ...state,
        isSeller: !state.isSeller,
      };
    case "USER_ORDERS":
      return {
        ...state,
        userOrders: action.payload.userOrders,
      };
    case "USER_CONVERSATIONS":
      return {
        ...state,
        userConversations: action.payload.userConversations,
      };
    default:
      return state;
  }
};

export default ModalReducer;
