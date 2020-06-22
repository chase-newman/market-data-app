import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './Login.module.css';

class Login extends Component {
    state = {
        email: "",
        password: ""
    }
    
    
    onChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
     loginHandler = () => {
        console.log(this.state.email, this.state.password);
    }
  
    signUpHandler = () => {
        console.log(this.state.email,this.state.password);
    }

    
    render() {
       let rowStyle = `row justify-content-center ${classes.Row}`

        return(
            <div className={rowStyle}>
                {!this.props.auth ?
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <h1>Login or Sign Up</h1>
                    <input 
                        type="email"
                        name="email"
                        className="form-control" 
                        placeholder="email..."
                        onChange={event => {
                            this.setState({
                                email: event.target.value
                            }, () => {
                                return this.props.onChangeEmail(this.state.email);  
                            })
                        }}/>
                    <input 
                        type="password"
                        name="password"
                        className="form-control" 
                        placeholder="password (6 characters min. for sign up)..."
                        onChange={event => {
                            this.setState({
                                password: event.target.value
                            }, () => {
                                return this.props.onChangePassword(this.state.password);
                            })
                        }}/>
                    <button 
                        className="btn btn-block"
                        onClick={this.props.loginHandler}>Login</button>
                    <button 
                        className="btn btn-block btn-info"
                        onClick={this.props.signUpHandler}>Sign Up</button>
                </div> : 
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <h1>You Are Signed In...</h1>
                    <Link 
                        className="btn btn-block btn-outline-info"
                        to="/stock-data">Continue to Stock Data</Link>
                    <div 
                        className="btn btn-block btn-outline-danger"
                        onClick={this.props.logoutHandler}>Logout</div>
                </div>
                }
            </div>
        ); 
    }

}

export default Login;
