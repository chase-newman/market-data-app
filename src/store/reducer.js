import * as actionTypes from './actions';

const initialState = {
    imgUrl: "./assets/stock-data-screenshot.png",
    email: "",
    password: "", 
    auth: null,
    user: null
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
    else {
        return state;
    }
}

export default reducer;