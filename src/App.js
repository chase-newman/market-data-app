import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import Aux from './hoc/Aux';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import axios from 'axios';
import './App.module.css';

const API_KEY = "1D24JWD6HONH93GD"

class App extends Component {
  state = {
      stockSymbol: null,
      dateLabels: null,
      prices: null
  }
  
  componentDidMount() {
    if(this.state.stockSymbol === null) {
      axios({
      method: "get",
      url: `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${API_KEY}`
    }).then(response => {
      console.log(response);
      console.log(Object.values(response.data));
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
      console.log(dates);
      console.log(finalClosePrices);
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
      console.log(response);
      console.log(Object.values(response.data));
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
      console.log(dates);
      console.log(finalClosePrices);
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
  
  
  render() {
    return (
      <Aux>
        <Header clicked={this.searchHandler}/>
        <div className="container-fluid">
          <Route path="/main" render={() => {
            return <Main
                      stockSymbol={this.state.stockSymbol}
                      dates={this.state.dateLabels}
                      prices={this.state.prices}
                      clicked={this.searchHandler}/>
          }} />
          <Route path="/login" render={() => {
            return <Login /> 
          }}/>
        </div>
      </Aux>
    );
  }
  
}

export default App;
