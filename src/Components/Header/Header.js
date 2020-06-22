import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';


const header= (props) => {
  
        let iconStyle = `fab fa-ethereum ${classes.Fab}`
        
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
                  <a 
                    className="nav-link"
                    style={{cursor: "pointer"}}
                    onClick={props.logoutHandler}>Logout<span className="sr-only">(current)</span></a>
                </li>
                }
                <li className="nav-item">
                  <Link className="nav-link" to="/stock-data">Stock Data</Link>
                </li>
              </ul>
             
            </div>
          </nav>
        );
      };
      
export default header;