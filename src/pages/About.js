import React, { useState } from "react";
import Image from '../assets/about.png'
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
import Footer from "../components/Footer";

const { Header, Sider, Content } = Layout;

const About = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout>
        <Sider width={290} trigger={null} collapsible collapsed={!collapsed} style={{border:"1px #1d1d1d solid"}}>
          <Menu
            style={{
              height: 1350,
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
              border:"1px #1d1d1d solid"
            }}
          >
            {React.createElement(
              collapsed ? ArrowLeftOutlined : ArrowRightOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
          className="about"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          >
            <span style={{ fontWeight: "bold" , fontSize:"23px"}}>PassCore</span> is a web
            application that stores and protect all your password on the
            websites you visit and use on daily basis. PassCore is best because
            you get to use a long and very strong password on a website and save
            it on PassCore, you don't have to store passwords on your heads
            again. Don't worry about your passwords on PassCore they are all
            encrypted in our database. PassCore has a built-in Password
            generator you can use on your website. All you have to do is create
            an account, log in and create a tab for the website, add the website
            link, and add the password you used on the website below. Now you
            can access the password whenever you forget or want to log into the
            website.<br></br>
            <div className="aboutImgBody"><img src={Image} className="aboutImage" alt='about'/></div><br></br>
            (Image example)
            <br style={{ marginTop: "20px" }}></br>
            <span style={{ fontWeight: "bold", marginTop: "20px", fontSize:"23px" }}>
              Password Generator
            </span>
            <br></br>
            Passcore is a built-in option that you can use. You can generate a
            100% secure password with capital letters, small letters, numbers,
            and symbols included with up to 20 characters. As you can see, there
            is no way someone can guess your password, and to remember this
            password, you can store it on our password manager.
            <Footer/>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default About;
