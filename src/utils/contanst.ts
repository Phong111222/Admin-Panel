export const BasicAuth = {
  basicauth_user: 'futureitmafia',
  basicauth_password: 'whothehellru',
};

export const Auth = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
};

export const User = {
  user_info: '/user/getCurrent',
};

export const Category = {
  LIST_CATEGORIES_AND_CREATE: '/category',
  GET_AND_TOGGLE_BY_ID: (id: string) => `/category/${id}`,
};

export const Product = {
  LIST_PRODUCTS_CREATE_PRODUCT: '/product',
  TOGGLE_AND_GET_BY_ID: (id: string) => `/prodcut/${id}`,
};
