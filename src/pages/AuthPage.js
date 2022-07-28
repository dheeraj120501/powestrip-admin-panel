import React, { useState } from "react";
import * as styles from "./AuthPage.styles";

function AuthPage() {
  const [isLogIn, setIsLogIn] = useState(true);

  return (
    <styles.Main>
      <styles.Form>
        <styles.FormCaption>
          {isLogIn ? "Log In" : "Sign Up"}
        </styles.FormCaption>
        <styles.Input type="text" placeholder="Email" />
        <styles.Input type="password" placeholder="Password" />
        {!isLogIn && (
          <styles.Input type="password" placeholder="Confirm Password" />
        )}
        <styles.FormAction>
          <styles.SecondaryBtn
            onClick={() => {
              setIsLogIn(!isLogIn);
            }}
          >
            {isLogIn ? "Sign Up?" : "Log In?"}
          </styles.SecondaryBtn>
          <styles.PrimaryBtn>
            {isLogIn ? "Log In" : "Sign Up"}
          </styles.PrimaryBtn>
        </styles.FormAction>
      </styles.Form>
    </styles.Main>
  );
}

export default AuthPage;
