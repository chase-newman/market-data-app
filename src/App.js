import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Aux from './hoc/Aux';
import { connect } from 'react-redux';
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import axios from 'axios';
import * as actionCreators from './store/actions';


const API_KEY = "1D24JWD6HONH93GD"
// const FIREBASE_KEY = "AIzaSyDEhTxapjqufs8ulp4bq-qWEjFe2zBZ1zY"

class App extends Component {
  state = {
      date: "",
      stockSymbol: null,
      dateLabels: null,
      prices: null,
      email: "",
      password: "",
      auth: null,
      user: null,
      imgUrl: "./assets/stock-data-screenshot.png"
  }
  
  componentDidMount() {
    let date = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let day = date.getDate();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayOfWeek = days[date.getDay()];
    date = `${dayOfWeek} - ${month} ${day}, ${year}`;
    this.setState({date});
    
    if(localStorage.auth) {
      this.setState({auth: localStorage.auth});
      this.setState({user: localStorage.user});
      //lets run a function here that will set the auth state in redux to true
      this.props.checkAuth(localStorage.auth, localStorage.user)
    } else {
      console.log("No User");
    }

    if(this.state.stockSymbol === null) {
      axios({
      method: "get",
      url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${API_KEY}`
    }).then(response => {
      let data = Object.values(response.data)
      let meta = data[0];
      let metaArr = [];
      for(let key in meta) {
        metaArr.push(meta[key])
      }
      meta = metaArr[1];
      let priceData = data[1];
      let dates = [];
      let closePrices = [];
      for(let dateLabel in priceData) {
        dates.push(dateLabel);
        closePrices.push(priceData[dateLabel]);
      }
      dates = dates.splice(0,30).reverse();
      closePrices = closePrices.splice(0,30);
      let revisedClosePrices = [];
      closePrices.forEach(el => {
        revisedClosePrices.push(Object.values(el));
      });
      let finalClosePrices = [];
      revisedClosePrices.forEach(el => {
        finalClosePrices.push(parseFloat(el[3]));
      });
      this.setState({
        stockSymbol: meta,
        dateLabels: dates,
        prices: finalClosePrices
      });
    }).catch(err => console.log(err));
    } 
  }
  
  
  searchHandler = (inputValue) => {
    console.log(inputValue);
     axios({
      method: "get",
      url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${inputValue}&apikey=${API_KEY}`
    }).then(response => {
      let data = Object.values(response.data)
      let meta = data[0];
      let metaArr = [];
      for(let key in meta) {
        metaArr.push(meta[key])
      }
      meta = metaArr[1];
      console.log("meta: " + meta);
      let priceData = data[1];
      let dates = [];
      let closePrices = [];
      for(let dateLabel in priceData) {
        dates.push(dateLabel);
        closePrices.push(priceData[dateLabel]);
      }
      dates = dates.splice(0,30).reverse();
      closePrices = closePrices.splice(0,30);
      let revisedClosePrices = [];
      closePrices.forEach(el => {
        revisedClosePrices.push(Object.values(el));
      });
      let finalClosePrices = [];
      revisedClosePrices.forEach(el => {
        finalClosePrices.push(parseFloat(el[3]).toFixed(2));
      });
      console.log(finalClosePrices.length);
      if(finalClosePrices.length > 0) {
      finalClosePrices = finalClosePrices.reverse();
        this.setState({
          stockSymbol: meta,
          dateLabels: dates,
          prices: finalClosePrices
        });
      }
      else {
        alert("Invalid Ticker Symbol. Please Try Again...");
      }  
    }).catch(err => {
        console.log(err);
    });
  }
  
  
  render() {
    return (
      <Aux>
        <Header date={this.state.date} />
        <div className="container-fluid">
          <Route path="/" exact component={LandingPage} />
          <Route path="/stock-data" render={() => {
            return <Main
                      stockSymbol={this.state.stockSymbol}
                      dates={this.state.dateLabels}
                      prices={this.state.prices}
                      clicked={this.searchHandler}
                      />
          }} />
        <Route path="/login" component={Login} />
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
    return {
      email: state.email,
      password: state.password
    }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: (auth, user) => dispatch(actionCreators.checkAuth(auth, user))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
