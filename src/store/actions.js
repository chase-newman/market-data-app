import axios from 'axios';

export const CHANGE_EMAIL = "CHANGE_EMAIL";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const LOGIN = "LOGIN";
export const SIGN_UP = "SIGN_UP";
export const LOGOUT = "LOGOUT";
export const CHECK_AUTH = "CHECK_AUTH";
export const MODAL_CLOSE = "MODAL_CLOSE";
export const AUTH_ERROR = "AUTH_ERROR";
export const TICKER_ERROR = "TICKER_ERROR";
export const NETWORK_ERROR = "NETWORK_ERROR";

const FIREBASE_KEY = "AIzaSyDEhTxapjqufs8ulp4bq-qWEjFe2zBZ1zY"


export const changeEmail = (value) => {
    return {
        type: CHANGE_EMAIL,
        val: value
    }
}

export const changePassword = (value) => {
    return {
        type: CHANGE_PASSWORD,
        val: value
    }
}

export const logout = (auth, user) => {
    console.log("Logout");
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    return {
        type: LOGOUT,
        auth: auth,
        user: user
    }
}

export const postLoginData = (idToken, email) => {
    return {
        type: LOGIN,
        auth: idToken,
        user: email
    }
}

export const postSignUpData = (idToken, email) => {
    return {
        type: SIGN_UP,
        auth: idToken,
        user: email
    }
}

export const authError = () => {
    return {
        type: AUTH_ERROR
    }
}

export const login = (email, password) => {
    return dispatch => {
        axios({
        method: "post",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
        data: {
          email: email,
          password: password,
          returnSecureToken: true
        }
      }).then(response => {
          console.log(response);
          localStorage.setItem("auth", response.data.idToken);
          localStorage.setItem("user", response.data.email);
          dispatch(postLoginData(response.data.idToken, response.data.email));
      }).catch(err => {
          dispatch(authError());
      });
    }
}

export const signUp = (email, password) => {
    return dispatch => {
        axios({
        method: "post",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`,
        data: {
          email: email,
          password: password,
          returnSecureToken: true
        }
      }).then(response => {
          console.log(response);
          localStorage.setItem("auth", response.data.idToken);
          localStorage.setItem("user", response.data.email);
          dispatch(postSignUpData(response.data.idToken, response.data.email));
      }).catch(err => {
          dispatch(authError());
      });
    }
}

export const checkAuth = (auth, user) => {
    return {
        type: CHECK_AUTH,
        auth: auth,
        user: user
    }
}

export const modalClose = () => {
    return {
        type: MODAL_CLOSE
    }
}

export const tickerError = () => {
    return {
        type: TICKER_ERROR
    }
}

export const networkError = () => {
    return {
        type: NETWORK_ERROR   
    }
}
