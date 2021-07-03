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
  create_user: '/auth/register',
  all_user: '/user',
  toggle_user: (id: string) => `/user/${id}`,
  update: (id: string) => `/user/updateOne/${id}`,
};

export const Staff = {
  create_staff_and_staff_list: '/staff',
  staff_ind: (id: string) => `/staff/${id}`,
  toggle_staff: (id: string) => `/staff/${id}`,
  update: (id: string) => `/staff/updateOne/${id}`,
};

export const Category = {
  LIST_CATEGORIES_AND_CREATE: '/category',
  GET_AND_TOGGLE_BY_ID: (id: string) => `/category/${id}`,
};

export const Product = {
  LIST_PRODUCTS_CREATE_PRODUCT: '/product',
  TOGGLE_AND_GET_BY_ID: (id: string) => `/prodcut/${id}`,
};

export const Role = {
  LIST_AND_CREATE_ROLE: '/role',
  TOGGLE_AND_GET_BY_ID: (id: string) => `/role/${id}`,
};

export const Analytic = {
  GET_TOTAL: '/analytic/total',
  GET_MONTHLY_REVENUE_BY_YEAR: (year: string | number) =>
    `/analytic/revenue/${year}`,
  GET_RANK_STAFF: '/analytic/rankStaff',
  GET_RANK_PRODUCT: '/analytic/rankProduct',
};
export const methods = ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'];
export const permissions = ['category', 'role', 'product', 'staff', 'invoice'];
