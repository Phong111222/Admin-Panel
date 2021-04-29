import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

import { ROUTES } from './Routes';
import Logo from '../../Logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/RootReducer';
import { UserState } from '../../../store/user/types';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const { Sider, Header, Footer, Content } = Layout;
const { SubMenu } = Menu;

const WrappedLayout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const {
    permissions: { methods, routes },
  } = useSelector<RootState, UserState>((state) => state.user);

  const makeLegalRoute = () => {
    // const methodsTest = ['POST'];
    // const routesTest = ['Products', 'Category'];
    let legalRoutes: typeof ROUTES = [];
    if (routes[0] === 'all' && methods[0] === 'ALL') return ROUTES;

    for (const route of routes) {
      ROUTES.map((item) =>
        item.route === route ? legalRoutes.push(item) : null
      );
    }
    legalRoutes.forEach((item) => {
      let newArrMethods: any = [];
      item.methods.forEach((item) => {
        if (methods.includes(item.httpRequest)) {
          newArrMethods.push(item);
        }
      });
      item.methods = [...newArrMethods];
    });

    return legalRoutes;
  };

  const makeRoute = (routes: typeof ROUTES) => {
    return routes.map((item) => (
      <SubMenu key={item.route} title={item.route} icon={<item.icon />}>
        {item.methods.map((method) => {
          return (
            <Menu.Item key={method.path}>
              <Link to={method.path}>{method.title}</Link>
            </Menu.Item>
          );
        })}
      </SubMenu>
    ));
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapsed}
        theme='light'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px 0',
          }}>
          <Logo width={collapsed ? 65 : 80} height={collapsed ? 65 : 80} />
        </div>
        <Menu theme='dark' mode='inline'>
          {makeRoute(makeLegalRoute())}
        </Menu>
      </Sider>
      <Layout>
        <Header>show user icon </Header>

        <Breadcrumb style={{ margin: '15px 30px' }} separator='>'>
          {pathname.length === 1
            ? null
            : pathname
                .split('/')
                .map((item) => <Breadcrumb.Item>{item}</Breadcrumb.Item>)}
        </Breadcrumb>

        <Content style={{ margin: '0 30px' }}>{children}</Content>
        <Footer
          style={{
            height: 48,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          ADMIN PANEL
        </Footer>
      </Layout>
    </Layout>
  );
};

export default WrappedLayout;
