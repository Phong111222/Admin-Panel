import { LoadingOutlined } from "@ant-design/icons";
import React from "react";
import { Route, Switch } from "react-router-dom";

interface type {
  name: string;
  component: React.ComponentType;
  path: string;
  id: string;
  exact: boolean;
}

const routes: type[] = [
  // {
  //   name: 'login',
  //   component: React.lazy(() =>
  //     Promise.all([
  //       import('../components/Auth/login/Login'),
  //       new Promise((resolve) => setTimeout(resolve, 100)),
  //     ]).then(([moduleExports]) => moduleExports)
  //   ),
  //   path: '/login',
  //   id: 'login',
  //   exact: true,
  // },

  {
    name: "logout",
    component: React.lazy(() =>
      Promise.all([
        import("../components/Auth/logout/Logout"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),
    path: "/logout",
    id: "logout",
    exact: true,
  },
  {
    name: "home",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/Home"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),
    path: "/home",
    id: "home",
    exact: true,
  },
  {
    name: "product",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/Product/ListProducts"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/product/list",
    id: "products_list",
    exact: true,

  },
  {
    name: "product",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/Product/CreateProduct"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/product/create",
    id: "products_create",
    exact: true,

  },
  {
    name: "category",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/Category/ListCategory"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/category/list",
    id: "category_list",
    exact: true,

  },
  {
    name: "category",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/Category/CreateCategory"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/category/create",
    id: "category_create",
    exact: true,

  },
  {
    name: "role",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/Role/RoleList"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/role/list",
    id: "role_create",
    exact: true,

  },
  {
    name: "role",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/Role/CreateRole"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/role/create",
    id: "role_list",
    exact: true,

  },
  {
    name: "account",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/Account"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/account/info",
    id: "account_info",
    exact: true,

  },
  {
    name: "user",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/User/UserList"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/user/list",
    id: "user_list",
    exact: true,

  },
  {
    name: "user",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/User/CreateUser"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/user/create",
    id: "user_create",
    exact: true,

  },

  {
    name: "staff",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/Staff/StaffCreate"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/staff/create",
    id: "staff_create",
    exact: true,

  },
  {
    name: "staff",
    component: React.lazy(() =>
      Promise.all([
        import("../components/app/Staff/StaffList"),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),

    path: "/staff/list",
    id: "staff_list",
    exact: true,

  },
  {
    name: 'Invoice',
    component: React.lazy(() =>
      Promise.all([
        import('../components/app/Invoice/InvoiceList'),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),
    path: '/invoice/list',
    id: 'invoice_list',
    exact: false,
  },
];

const MakeRoute = () => {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            position: "fixed",
            top: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            right: 0,
          }}
        >
          <LoadingOutlined style={{ fontSize: 100 }} />
        </div>
      }
    >
      <Switch>
        {routes.map((route) => (
          <Route
            exact={route.exact || false}
            path={route.path}
            key={route.id}
            component={() => <route.component />}
          />
        ))}
        ))
      </Switch>
      {/* {!jwt ? <Redirect from='/home' to='/login' /> : <Redirect to='/home' />} */}
    </React.Suspense>
  );
};

export default MakeRoute;
