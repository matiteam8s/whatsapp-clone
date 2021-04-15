import React, { useState } from "react";
import {
  Button,
  makeStyles,
  Typography,
  Divider,
  FormControl,
  TextField,
} from "@material-ui/core";
import db, { facebookProvider } from "../../config/firebase";
import { auth, googleProvider } from "../../config/firebase";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    display: "grid",
    placeItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f8f8f8",
  },
  loginContainer: {
    minWidth: "30vw",
    minHeight: "50vh",
    padding: "50px",
    backgroundColor: "#FFF",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "-1px 12px 17px -8px rgba(0,0,0,0.75)",
    display: "flex",
    flexDirection: "column",
    "& img": {
      objectFit: "contain",
      height: "50px",
      marginBottom: "10px",
    },
  },
  loginButtons: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    display: "block",
    width: "90%",
    marginBottom: "10px",
  },
  inputs: {
    width: "90%",
    marginBottom: "10px",
    "& .MuiInputBase-input": {
      height: "10px",
    },
  },
}));

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        db.collection("users").doc(result.user.uid).set({
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

  const signInWithFacebook = async () => {
    await auth
      .signInWithPopup(facebookProvider)
      .then((result) => {
        const credential = result.credential;

        dispatch({
          type: "SET_USER",
          user: result.user,
          accessToken: credential.accessToken,
        });
      })
      .catch((err) => console.log(err));
  };

  const signInWithEmailAndPassword = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        dispatch({
          type: "SET_USER",
          user: user,
        });
      })
      .catch((error) => {
        var errorMessage = error.message;
        setErrors(errorMessage);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <img
          src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-2-1.png"
          alt="login_img"
        />
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          Sign in to WhatsApp
        </Typography>
        <div className={classes.loginButtons}>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={signInWithGoogle}
          >
            <FontAwesomeIcon style={{ color: "#DB4437" }} icon={faGoogle} />{" "}
            Continue With Google
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={signInWithFacebook}
          >
            <FontAwesomeIcon style={{ color: "#4267B2" }} icon={faFacebook} />{" "}
            Continue With Facebook
          </Button>
        </div>
        <Divider variant="middle" />
        <form autoComplete="off" style={{ margin: "20px 0" }}>
          <FormControl style={{ display: "block" }}>
            <TextField
              error={errors !== null}
              helperText={errors}
              className={classes.inputs}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl style={{ display: "block" }}>
            <TextField
              className={classes.inputs}
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter your password"
            />
          </FormControl>
          <Button
            style={{
              backgroundColor: "#128C7E",
              color: "#FFF",
              padding: "10px",
              width: "90%",
            }}
            variant="primary"
            onClick={signInWithEmailAndPassword}
          >
            Continue
          </Button>
        </form>
        <Typography variant="p">¿Dont have an account?</Typography>
        <Link style={{ color: "#128C7E", marginTop: "20px" }} to={"/register"}>
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default Login;
