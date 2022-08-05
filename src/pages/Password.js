import React, { useState } from "react";
import "./Dashboard/dashboard.css";
import { Link } from "react-router-dom";
import {
  PhoneOutlined,
  ProfileOutlined,
  KeyOutlined,
  HomeOutlined,
  LogoutOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import PasswordGen from "../components/Password";
import Footer from "../components/Footer";

const { Header, Sider, Content } = Layout;

const Password = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout>
        <Sider width={290} trigger={null} collapsible collapsed={!collapsed} style={{border:"1px #1d1d1d solid"}}>
          <Menu
            style={{
              height: 1000,
              paddingTop: 60,
              backgroundColor: "white",
              color: "#1d1d1d",
            }}
          >
            <Link to="/">
              <Menu.Item className="menu-item">
                <HomeOutlined
                  style={{ fontSize: 25, margin: 14, color: "#1d1d1d" }}
                />{" "}
                <span style={{ fontSize: 20, margin: 11, color: "#1d1d1d" }}>
                  Dashboard
                </span>
              </Menu.Item>
            </Link>
            <div className="breaker"></div>
            <Link to="/password">
              <Menu.Item className="menu-item">
                <KeyOutlined
                  style={{ fontSize: 25, margin: 14, color: "#1d1d1d" }}
                />{" "}
                <span style={{ fontSize: 20, margin: 11, color: "#1d1d1d" }}>
                  Password generator
                </span>
              </Menu.Item>
            </Link>
            <div className="breaker"></div>
            <Link to="/about">
              <Menu.Item className="menu-item">
                <ProfileOutlined
                  style={{ fontSize: 25, margin: 14, color: "#1d1d1d" }}
                />{" "}
                <span style={{ fontSize: 20, margin: 11, color: "#1d1d1d" }}>
                  About Us
                </span>
              </Menu.Item>
            </Link>
            <div className="breaker"></div>
            <a href="https://twitter.com/SamAbdul_">
              <Menu.Item className="menu-item">
                <PhoneOutlined
                  style={{ fontSize: 25, margin: 14, color: "#1d1d1d" }}
                />{" "}
                <span style={{ fontSize: 20, margin: 11, color: "#1d1d1d" }}>
                  Contact Us
                </span>
              </Menu.Item>
            </a>
            <div className="breaker"></div>
            <Link to="/logout">
              <Menu.Item className="menu-item">
                <LogoutOutlined
                  style={{ fontSize: 25, margin: 14, color: "#1d1d1d" }}
                />{" "}
                <span style={{ fontSize: 20, margin: 11, color: "#1d1d1d" }}>
                  {" "}
                  Logout
                </span>
              </Menu.Item>
            </Link>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              backgroundColor: "white",
              color: "black",
              border:"1px #1d1d1d solid",
            }}
          >
            {React.createElement(
              collapsed ? ArrowLeftOutlined : ArrowRightOutlined,
              {
                className: "trigger",
                color: "black",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content style={{ background: "white" }}>
            <PasswordGen/>
            <Footer/>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Password;
