import React, { useReducer, useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../DB/firebase";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 400,
    margin: "0 auto",
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  loginBtn: {
    marginTop: "1rem",
    flexGrow: 1,
  },
  header: {
    textAlign: "center",
    background: "#212121",
    color: "#fff",
  },
  card: {
    marginTop: "5rem",
  },
}));

// state type
type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "loginSuccess"; payload: string }
  | { type: "loginFailed"; payload: string }
  | { type: "setIsError"; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "loginSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "loginFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.username, state.password]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      // Attempt to log in the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        state.username,
        state.password
      );

      dispatch({
        type: "loginSuccess",
        payload: "Login Successfully",
      });

      navigate("/Chat");
    } catch (error) {
      // Handle any other errors that occur during login
      dispatch({
        type: "loginFailed",
        payload: "Failed to login",
      });
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.username,
        state.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: state.username,
        uid: userCredential.user.uid,
      });

      dispatch({
        type: "loginSuccess",
        payload: "Account created Successfully, you can now Login.",
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      dispatch({
        type: "loginFailed",
        payload: "Failed to create account",
      });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setUsername",
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login App" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}
          >
            Login
          </Button>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.loginBtn}
            onClick={handleSignUp}
            disabled={state.isButtonDisabled}
          >
            Sign Up
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Login;
