import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth,db, logout } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import "antd/dist/antd.min.css";
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

const { Header, Sider } = Layout;

const Logout = () => {
  const [user,loading] = useAuthState(auth);
  const [setName] = useState("");
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  
  return (
    <>
      <Layout>
        <Sider
          width={290}
          trigger={null}
          collapsible
          collapsed={!collapsed}
          style={{ border: "1px #1d1d1d solid" }}
        >
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
        <Layout style={{ backgroundColor: "white" }} className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              backgroundColor: "white",
              color: "black",
              border: "1px #1d1d1d solid",
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
          <div className="logout">
            <p>Are sure you want to log out?</p>
            <button onClick={logout}>Logout</button>
          </div>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
};

export default Logout;
