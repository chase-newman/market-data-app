import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';
import classes from './Main.module.css';

class Main extends Component {
    state = {
        inputText: ""
    }
    
    onChangeHandler = event => {
        this.setState({inputText: (event.target.value).toUpperCase()});
    }
    
    render() {
        
    let rowStyle = `row ${classes.Row}`
    let searchColStyle = `col-lg-3 col-md-4 col-sm-6  ${classes.Search}`
    let currentPrice;
    if(this.props.prices) {
        currentPrice = this.props.prices[this.props.prices.length - 1];
    }
        return(
          <div className={rowStyle}>
            <div className="col-lg-9 col-md-12 col-sm-12">
                <h1>{this.props.stockSymbol} <span>${currentPrice}</span></h1>
                    <Line
                      data={{
                          labels: this.props.dates,
                          datasets: [
                            {
                              label: 'Closing Price',
                              lineTension: 0,
                              fill: true,
                              backgroundColor: 'rgba(23,162,184,1)',
                              borderColor: 'rgba(0,0,0,1)',
                              borderWidth: 2,
                              data: this.props.prices
                            }
                        ]
                      }}
                      options={{
                        title:{
                          display:false,
                          text: null,
                          fontSize:20
                        },
                        responsive: true,
                        maintainAspectRatio: true,
                        legend:{
                          display: false,
                          position:'right'
                        }
                      }}
                    />
                </div>
                {this.props.auth ? <div className={searchColStyle}>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ticker Symbol (ex. AAPL, TSLA, FB)"
                        onChange={this.onChangeHandler}/>
                    <button
                        onClick={() => {
                          return this.props.clicked(this.state.inputText)}
                        }
                        className="btn btn-block btn-outline-success">Search</button>
                </div> : 
                  <div className={searchColStyle}>
                    <p>Please Sign Up or Login to Search New Stock Data</p>
                  </div>
                }
          </div>
        );
    }
}


const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Main);