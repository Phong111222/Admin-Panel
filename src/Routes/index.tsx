import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
    name: 'register',
    component: React.lazy(() =>
      Promise.all([
        import('../components/Auth/register/Register'),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),
    path: '/register',
    id: 'register',
    exact: true,
  },
  {
    name: 'logout',
    component: React.lazy(() =>
      Promise.all([
        import('../components/Auth/logout/Logout'),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),
    path: '/logout',
    id: 'logout',
    exact: true,
  },
  {
    name: 'home',
    component: React.lazy(() =>
      Promise.all([
        import('../components/app/Home'),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),
    path: '/home',
    id: 'home',
    exact: true,
  },
  {
    name: 'product',
    component: React.lazy(() =>
      Promise.all([
        import('../components/app/Product/ListProducts'),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),
    path: '/product/list',
    id: 'products_list',
    exact: true,
  },
  {
    name: 'product',
    component: React.lazy(() =>
      Promise.all([
        import('../components/app/Product/CreateProduct'),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),
    path: '/product/create',
    id: 'products_create',
    exact: true,
  },
];

const MakeRoute = () => {
  return (
    <React.Suspense fallback={<>Loading</>}>
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
