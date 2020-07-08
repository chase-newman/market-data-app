import * as actionTypes from './actions';

const initialState = {
    imgUrl: "./assets/stock-data-screenshot.png",
    email: "",
    password: "", 
    auth: null,
    user: null,
    error: false,
    errMessage: "Oops, something went wrong. Please try again... "
}


const reducer = (state = initialState, action) => {
    if(action.type === actionTypes.CHANGE_EMAIL) {
        return {
            ...state,
            email: action.val
        }    
    }
    else if(action.type === actionTypes.CHANGE_PASSWORD) {
        return {
            ...state,
            password: action.val
        }
    }
    else if(action.type === actionTypes.LOGOUT) {
        console.log("[Reducer]: logout clicked")
        return {
            ...state,
            auth: null,
            user: null
        }
    } 
    else if(action.type === actionTypes.LOGIN) {
        console.log("[Reducer]" + action.auth, action.user);
        return {
            ...state,
            auth: action.auth,
            user: action.user
        }
    }
    else if(action.type === actionTypes.SIGN_UP) {
        console.log(action.auth, action.user)
        return {
            ...state,
            auth: action.auth,
            user: action.user
        }
    }
    else if(action.type === actionTypes.CHECK_AUTH) {
        return {
            ...state,
            auth: action.auth,
            user: action.user
        }
    }
    else if(action.type === actionTypes.AUTH_ERROR) {
        return {
            ...state,
            error: true,
            errMessage: "Invalid Username & Password. Please Try Again... "
        }
    }
    else if(action.type === actionTypes.TICKER_ERROR) {
        return {
            ...state,
            error: true,
            errMessage: "Invalid Ticker Symbol. Please Try Again..."
        }
    }
    else if(action.type === actionTypes.NETWORK_ERROR) {
        return {
            ...state,
            error: true,
            errMessage: "[Network Error] API call limit. Please Try Again... "
        }
    }
    else if(action.type === actionTypes.MODAL_CLOSE) {
        return {
            ...state,
            error: false
        }
    }
    else {
        return state;
    }
}

export default reducer;