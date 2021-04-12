import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { STAFF_FEATURE } from './Routes';
import Logo from '../../Logo';
interface Props {
  children: React.ReactNode;
}

const { Sider, Header, Footer, Content } = Layout;
const { SubMenu } = Menu;

const WrappedLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapsed}
        theme='light'
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px 0',
          }}
        >
          <Logo width={80} height={80} />
        </div>
        <Menu theme='dark' mode='inline'>
          <SubMenu title='Staff' icon={<UserOutlined />}>
            {STAFF_FEATURE.map((item) => (
              <Menu.Item key={item.id} icon={<item.icon />}>
                {item.title}
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default WrappedLayout;
