import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Aux from './hoc/Aux';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import axios from 'axios';
import classes from './App.module.css';

const API_KEY = "1D24JWD6HONH93GD"
const FIREBASE_KEY = "AIzaSyDEhTxapjqufs8ulp4bq-qWEjFe2zBZ1zY"

class App extends Component {
  state = {
      stockSymbol: null,
      dateLabels: null,
      prices: null,
      email: "",
      password: "",
      auth: null
  }
  
  componentDidMount() {
    console.log(this.props)
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
      //Need to implement Error Handling if the length of the array returned = 0, respond with error on the screen
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
        finalClosePrices.push(parseFloat(el[3]));
      });
      this.setState({
        stockSymbol: meta,
        dateLabels: dates,
        prices: finalClosePrices
      });
    }).catch(err => {
        console.log(err)
        alert("Ticker Symbol Does Not Exist");
    });
  }
  
  onChangeHandler = event => {
      this.setState({
          [event.target.name]: event.target.value
        })
      }
    
  loginHandler = () => {
      axios({
        method: "post",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_KEY}`,
        data: {
          email: this.state.email,
          password: this.state.password,
          returnSecureToken: true
        }
      }).then(response => {
          console.log(response);
          this.setState({
              email: "",
              password: "",
              auth: response.data.idToken
          });
           this.props.history.push("/stock-data");
      }).catch(err => {
          console.log(err);
      });
    }
  
  signUpHandler = () => {
      axios({
        method: "post",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_KEY}`,
        data: {
          email: this.state.email,
          password: this.state.password,
          returnSecureToken: true
        }
      }).then(response => {
          console.log(response);
          this.setState({
              email: "",
              password: "",
              auth: response.data.idToken
          });
          this.props.history.push("/stock-data");
      }).catch(err => {
          console.log(err);
      });
    }

    logoutHandler = () => {
      this.setState({auth: null});
    }
    
    onChangeEmailHandler = (email) => { 
      this.setState({
        email: email
      })
    }
    
    onChangePasswordHandler = (password) => { 
      this.setState({
        password: password
      })
    }
  
  render() {
    return (
      <Aux>
        <Header 
          clicked={this.searchHandler}
          logoutHandler={this.logoutHandler}
          auth={this.state.auth}
            />
        <div className="container-fluid">
          <Route path="/stock-data" render={() => {
            return <Main
                      stockSymbol={this.state.stockSymbol}
                      dates={this.state.dateLabels}
                      prices={this.state.prices}
                      clicked={this.searchHandler}
                      auth={this.state.auth}/>
          }} />
        <Route path="/login" render={() => {
            return <Login 
                      onChangeEmail={this.onChangeEmailHandler}
                      onChangePassword={this.onChangePasswordHandler}
                      loginHandler={this.loginHandler}
                      signUpHandler={this.signUpHandler}
                      auth={this.state.auth}
                      logoutHandler={this.logoutHandler}/>
        }} />
        </div>
      </Aux>
    );
  }
  
}

export default withRouter(App);
