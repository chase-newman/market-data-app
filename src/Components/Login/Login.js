import React from 'react';
import classes from './Login.module.css';

const login = () => {

    let rowStyle = `row justify-content-center ${classes.Row}`

    return(
        <div className={rowStyle}>
            <div className="col-lg-6 col-md-8 col-sm-10">
                <h1>Login</h1>
                <input type="email" className="form-control" placeholder="email..."/>
                <input type="password" className="form-control" placeholder="password..." />
                <button className="btn btn-block">Login</button>
            </div>
        </div>
    );
}

export default login;
