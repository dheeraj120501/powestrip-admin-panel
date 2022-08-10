import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import * as styles from "./auth-page.styles";
import Assets from "Assets";
import components from "./components";

function AuthPage({ setAuthState }) {
  const logIn = async (e) => {
    try {
      e.preventDefault();
      console.log("hi");
      const data = {};
      data.email = e.target[0].value;
      data.password = e.target[1].value;
      setAuthState(undefined);
      const config = {
        method: "post",
        url: "https://dev2.powerstrip.in/user/login",
        data: data,
      };
      const res = await axios(config);
      const userData = JSON.parse(JSON.stringify(res.data));
      console.log(userData);
      if (userData.status === "error") {
        toast.error(userData.message);
        setAuthState(null);
      } else {
        window.localStorage.setItem("jwt", userData.userAuthToken);
        setAuthState(userData.userAuthToken);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <styles.Main>
      <styles.Logo>
        <Assets.BrandLogo />
      </styles.Logo>
      <styles.Login>
        <components.Carousel />
        <styles.Form onSubmit={logIn}>
          <styles.FormCaption>Welcome Back</styles.FormCaption>
          <styles.Input type="text" placeholder="Email" />
          <styles.Input type="password" placeholder="Password" />
          <styles.FormAction>
            <div className="flex items-center">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="ml-2">
                Remember me
              </label>
            </div>
            <div className="cursor-pointer">Forget Password?</div>
          </styles.FormAction>
          <styles.PrimaryBtn>Log In</styles.PrimaryBtn>
        </styles.Form>
      </styles.Login>
    </styles.Main>
  );
}

export default AuthPage;
