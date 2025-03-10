import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./screens/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./utils/Store";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
             <Route path="/feed" element={<Feed/>}/>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/error" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
