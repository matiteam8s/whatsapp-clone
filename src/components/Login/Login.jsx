import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import db from "../../config/firebase";
import { auth, googleProvider } from "../../config/firebase";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        db.collection("users")
          .doc(result.user.uid)
          .set({
            id: result.user.uid,
            displayName: result.user.displayName,
            email: result.user.email,
          });
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
      })
      .catch((error) => console.log(error, error.code));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-2-1.png"
          alt="login_img"
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signInWithGoogle}>Sign in With Google</Button>
      </div>
    </div>
  );
}

export default Login;
