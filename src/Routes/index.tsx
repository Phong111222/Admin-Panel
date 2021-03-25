import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

interface type {
  name: string;
  component: React.ComponentType;
  path: string;
  id: string;
  exact: boolean;
}

const routes: type[] = [
  {
    name: 'login',
    component: React.lazy(() =>
      Promise.all([
        import('../components/Auth/login/Login'),
        new Promise((resolve) => setTimeout(resolve, 100)),
      ]).then(([moduleExports]) => moduleExports)
    ),
    path: '/login',
    id: 'login',
    exact: true,
  },
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
];
const MakeRoute = () => (
  <React.Suspense fallback={<>Loading</>}>
    <Switch>
      {routes.map((route) => (
        <Route
          exact={route.exact || false}
          path={route.path}
          key={route.id}
          component={route.component}
        />
      ))}
      ))
      <Redirect from='/' to='/login' />
    </Switch>
  </React.Suspense>
);

export default MakeRoute;
