import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';


const header= (props) => {
  
        let iconStyle = `fab fa-ethereum ${classes.Fab}`
        let btnStyle = `nav-link ${classes.Button}`
        
        return (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Market Data App <i className={iconStyle}></i></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                {!props.auth ? 
                <li className="nav-item active">
                  <Link className="nav-link" to="/login">Login<span className="sr-only">(current)</span></Link>
                </li> : 
                 <li className="nav-item active">
                  <button 
                    className={btnStyle}
                    onClick={() => props.reduxLogoutHandler(props.auth, props.user)}>Logout<span className="sr-only">(current)</span></button>
                </li>
                }
                <li className="nav-item">
                  <Link className="nav-link" to="/stock-data">Stock Data</Link>
                </li>
              </ul>
        
              <div className="navbar-text">
                {!props.auth ? 
                <span>{props.date}</span> : 
                <div>
                  <span className={classes.DateDisplay}>{props.date}</span> 
                  <span>
                    <strong className={classes.UserDisplay}>Hello, {props.user}</strong>
                  </span>
                  </div>}
              </div> 
            </div>
          </nav>
        );
      };
      
      
const mapStateToProps = state => {
    return {
      auth: state.auth,
      user: state.user
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
      reduxLogoutHandler: (auth, user) => dispatch(actionCreators.logout(auth, user))
    }
}
      
export default connect(mapStateToProps, mapDispatchToProps)(header);