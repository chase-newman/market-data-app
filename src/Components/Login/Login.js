import React from 'react';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import classes from './Login.module.css'
import * as actionCreators from '../../store/actions';

const login = props => {
    
       let rowStyle = `row justify-content-center ${classes.Row}`

        return(
            <div className={rowStyle}>
                {!props.auth ?
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <h1>Login or Sign Up</h1>
                    <input 
                        type="email"
                        name="email"
                        className="form-control" 
                        placeholder="email..."
                        onChange={event => props.onChangeEmail(event)}
                        />
                    <input 
                        type="password"
                        name="password"
                        className="form-control" 
                        placeholder="password (6 characters min. for sign up)..."
                        onChange={event => props.onChangePassword(event)}
                        />
                    <button 
                        className="btn btn-block"
                        onClick={() => props.reduxLoginHandler(props.email, props.password)}>Login</button>
                    <button 
                        className="btn btn-block btn-info"
                        onClick={() => props.reduxSignUpHandler(props.email, props.password)}>Sign Up</button>
                </div> : <Redirect to="/stock-data" />}
            </div>
        ); 
    }


const mapStateToProps = state => {
    return {
        email: state.email,
        password: state.password,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeEmail: event => dispatch(actionCreators.changeEmail(event.target.value)),
        onChangePassword: event => dispatch(actionCreators.changePassword(event.target.value)),
        reduxLoginHandler: (email, password) => dispatch(actionCreators.login(email, password)),
        reduxSignUpHandler: (email, password) => dispatch(actionCreators.signUp(email, password)),
        reduxLogoutHandler: (auth, user) => dispatch(actionCreators.logout(auth, user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(login));
