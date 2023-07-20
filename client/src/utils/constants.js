export const HOST = "http://localhost:8000";
export const API_URL = `${HOST}/api`;
export const IMAGES_URL = `${HOST}/images/`;

export const AUTH_ROUTES = `${API_URL}/auth`;
export const GIG_ROUTES = `${API_URL}/gigs`;
export const ORDER_ROUTES = `${API_URL}/orders`;
export const REVIEW_ROUTES = `${API_URL}/reviews`;
export const CONVERSATION_ROUTES = `${API_URL}/conversations`;
export const MESSAGE_ROUTES = `${API_URL}/messages`;
export const GET_SELLER_DASHBOARD_DATA = `${API_URL}/dashboard/seller`;

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;
export const SET_USER_INFO = `${AUTH_ROUTES}/set-user-info`;
export const SET_USER_IMAGE = `${AUTH_ROUTES}/set-user-image`;
export const UPDATE_SELLER_OR_BUYER = `${AUTH_ROUTES}/set-user-seller-or-buyer`;

export const ADD_GIG_ROUTE = `${GIG_ROUTES}/add`;
export const GET_USER_GIGS_ROUTE = `${GIG_ROUTES}/get-user-gigs`;
export const GET_USER_GIGS_BY_ID = `${GIG_ROUTES}/get-user-gigs-by-id`;
export const GET_GIG_DATA = `${GIG_ROUTES}/get-gig-data`;
export const EDIT_GIG_ROUTE = `${GIG_ROUTES}/edit-gig`;
export const DELETE_GIG_ROUTE = `${GIG_ROUTES}/delete-gig`;
export const GET_GIGS_ROUTE = `${GIG_ROUTES}`;

export const PAYMENT_INTENT = `${ORDER_ROUTES}/create-payment-intent`;
export const PAYMENT_COMPLETED = `${ORDER_ROUTES}/success`;
export const GET_BUYER_ORDERS_ROUTE = `${ORDER_ROUTES}/get-orders`;
