import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as styles from "./auth-page.styles";
import assets from "Assets";

function AuthPage({ setAuthState }) {
  const logIn = async (e) => {
    try {
      e.preventDefault();
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
        <assets.brandLogo />
      </styles.Logo>
      <styles.Login>
        <styles.Illustrations>
          <assets.loginScreenAnalysis />
          <styles.IllustrationsContent>
            Data driven dashboard solution
          </styles.IllustrationsContent>
        </styles.Illustrations>

        <styles.Form onSubmit={logIn}>
          <styles.FormCaption>Welcome Back</styles.FormCaption>
          <styles.Input type="text" placeholder="Email" />
          <styles.Input type="password" placeholder="Password" />
          <styles.FormAction></styles.FormAction>
          <styles.PrimaryBtn>Log In</styles.PrimaryBtn>
        </styles.Form>
      </styles.Login>
    </styles.Main>
  );
}

export default AuthPage;
