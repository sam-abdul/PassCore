import React, { useEffect, useState } from "react";
import { createTodo, readTodos, deleteTodo } from "./recordDb";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import "antd/dist/antd.min.css";
import "./dashboard.css";
import { Link } from "react-router-dom";
import {
  PhoneOutlined,
  ProfileOutlined,
  KeyOutlined,
  HomeOutlined,
  LogoutOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "../../styles/App.css";

const { Header, Sider } = Layout;

const Record = () => {
  const [user, loading, setUser] = useAuthState(auth);
  const [todos, setTodos] = useState([]);

  const [name, setName] = useState("");
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
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("user useEffect");

    if (user) {
      readTodos(user.uid).then((todos) => {
        setTodos(todos);
      });
    } else if (storedUser) {
      setUser(storedUser);
      readTodos(storedUser.uid).then((todos) => {
        setTodos(todos);
      });
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    user
      ? localStorage.setItem("user", JSON.stringify(user))
      : localStorage.removeItem("user");
  }, [user]);

  const handleTodoAdd = (event) => {
    const todoTitle = event.target.title.value;
    const todoNote = event.target.note.value;
    event.preventDefault();

    if ((todoTitle, todoNote)) {
      const newTodo = {
        title: todoTitle,
        note: todoNote,
        completed: false,
        userRef: user.uid,
      };

      createTodo(newTodo).then((todoId) => {
        setTodos([
          ...todos,
          {
            id: todoId,
            ...newTodo,
          },
        ]);
      });
    }

    event.target.title.value = "";
    event.target.note.value = "";
  };

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
                />  
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
          <div className="dashboard-header">
            <div>Welcome {name}</div>
            {/* <div>{user?.email}</div> */}
          </div>
          <div className="dashboard-body">
            <form className="dash-form" onSubmit={handleTodoAdd}>
              <input
                type="text"
                placeholder="Enter website"
                name="title"
                id="title"
                className="dash-input"
              />
              <input
                type="text"
                placeholder="Enter Password"
                name="note"
                id="note"
                className="dash-input"
              />

              <button className="dash-add" type="submit">
                <PlusOutlined />
              </button>
            </form>
            <div className="dashboard-topic">
              <div>Website</div>
              <div>Password</div>
            </div>
            <div className="dashboard-table">
              <div>
                {todos.map((todo) => (
                  <ul className="dash-colon" key={todo.id}>
                    {todo.completed ? (
                      <s>{todo.title}</s>
                    ) : (
                      <span>{todo.title}</span>
                    )}
                    <div className="dash-delete-body">
                      {" "}
                      <button
                        className="dash-delete-dum"
                        onClick={() => {
                          deleteTodo(todo.id).then(() => {
                            setTodos(todos.filter((t) => t.id !== todo.id));
                          });
                        }}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </ul>
                ))}
              </div>

              <div>
                <div>
                  {todos.map((todo) => (
                    <ul className="dash-colon" key={todo.id}>
                      {todo.completed ? (
                        <s>{todo.note}</s>
                      ) : (
                        <span>{todo.note}</span>
                      )}
                      <div className="dash-delete-body">
                        {" "}
                        <button
                          className="dash-delete"
                          onClick={() => {
                            deleteTodo(todo.id).then(() => {
                              setTodos(todos.filter((t) => t.id !== todo.id));
                            });
                          }}
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </Layout>
    </>
  );
};

export default Record;
