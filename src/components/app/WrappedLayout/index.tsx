import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Col, Layout, Menu, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "../../../store/RootReducer";
import { UserState } from "../../../store/user/types";
import Logo from "../../Logo";
import { ROUTES } from "./Routes";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
}

const { Sider, Header, Footer, Content } = Layout;
const { SubMenu } = Menu;

const WrappedLayout: React.FC<Props> = ({ children }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const {
    permissions: { methods, routes },
    user: { info },
  } = useSelector<RootState, UserState>((state) => state.user);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/") {
      history.replace("/home");
    }
  }, [pathname, history]);
  const makeLegalRoute = () => {
    // const methodsTest = ['POST'];
    // const routesTest = ['Products', 'Category'];
    let legalRoutes: typeof ROUTES = [];
    if (routes[0] === "all" && methods[0] === "ALL") return ROUTES;

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
      <SubMenu
        key={item.route}
        title={item.route}
        icon={<item.icon style={{ marginRight: 10 }} />}
      >
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
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={handleCollapsed}
          theme="light"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px 0",
            }}
          >
            <Link to="/home">
              <Logo width={collapsed ? 65 : 80} height={collapsed ? 65 : 80} />
            </Link>
          </div>
          <Menu theme="dark" mode="inline">
            {/* <Menu.Item
              icon={<UserOutlined />}
              style={{ background: '#438ad5', margin: '0' }}>
              <Link to='/account/info'>Information</Link>
            </Menu.Item> */}
            {makeRoute(makeLegalRoute())}
            <Menu.Item
              icon={<LogoutOutlined />}
              style={{ background: "#438ad5", margin: "0" }}
            >
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              boxShadow:
                "0 1px 2px -2px rgb(117 117 117 / 16%), 0 3px 6px 0 rgb(34 33 33 / 12%), 0 0px 8px 0px rgb(78 78 78 / 90%)",
            }}
          >
            <Row style={{ height: "100%" }}>
              <Col offset={19} span={5} className={styles.avatar_container}>
                <Link to="/account/info">
                  <div className={styles.avatar_group}>
                    <Avatar size="small" icon={<UserOutlined />} />
                    {info.fullname && (
                      <Typography.Text
                        style={{
                          marginLeft: 10,
                          fontWeight: 500,

                          overflow: "hidden",
                        }}
                      >
                        {info.fullname}
                      </Typography.Text>
                    )}
                  </div>
                </Link>
              </Col>
            </Row>
          </Header>

          <Breadcrumb style={{ margin: "15px 30px" }} separator=">">
            {pathname.length === 1
              ? null
              : pathname === "/home"
              ? null
              : pathname.split("/").map((item, index) =>
                  item === "" ? null : (
                    <Breadcrumb.Item key={index}>
                      <strong>{item}</strong>
                    </Breadcrumb.Item>
                  )
                )}
          </Breadcrumb>

          <Content style={{ margin: "0 30px" }}>{children}</Content>
          <Footer
            style={{
              height: 48,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            ADMIN PANEL
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default WrappedLayout;
