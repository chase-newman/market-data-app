import React from 'react';
import {Link} from 'react-router-dom';
import classes from './LandingPage.module.css';
import { connect } from 'react-redux';

const landingPage = (props) => {
    
    let rowStyle=`row justify-content-center ${classes.Row}`;
    let imgColStyle=`col-lg-5 col-md-6 col-sm-6 ${classes.ImgCol}`;
    let linkColStyle=`col-lg-5 col-md-6 col-sm-6 ${classes.LinkCol}`;
    
    return(
        <div className={rowStyle}>
        <div className={imgColStyle}>
            <h1>Market Data App</h1>
            <img 
                src={props.imgUrl}
                alt="stock-data-screenshot" 
                className="img-fluid"/>
        </div>
        <div className={linkColStyle}>
            <p>This stock market data app allows you to search through
               any stock held in the S&P 500 & NASDAQ (via ticker name) and gives you a 30
               day history of stock closing prices. </p>
            {!props.auth ?
            <Link to="/login" className="btn btn-outline-info">Sign up or Login to check it out</Link>:
            <Link to="/stock-data" className="btn btn-outline-info">Go to Stock Data</Link>
            }
        </div>
    </div>
    );
};
    

const mapStateToProps = state => {
    return {
        imgUrl: state.imgUrl,
        auth: state.auth
    }
}


export default connect(mapStateToProps)(landingPage);