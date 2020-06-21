import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
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
    let searchColStyle = `col-sm-3 ${classes.Search}`
    let currentPrice;
    if(this.props.prices) {
        currentPrice = this.props.prices[this.props.prices.length - 1];
    }
        return(
          <div className={rowStyle}>
            <div className="col-lg-9 col-md-9 col-sm-9">
                <h1>{this.props.stockSymbol} <span>${currentPrice}</span></h1>
                    <Line
                      data={{
                          labels: this.props.dates,
                          datasets: [
                            {
                              label: 'Closing Price',
                              lineTension: 0,
                              fill: true,
                              backgroundColor: 'rgba(75,192,192,1)',
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
                <div className={searchColStyle}>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ticker Symbol..."
                        onChange={this.onChangeHandler}/>
                    <button
                        onClick={() => this.props.clicked(this.state.inputText)}
                        className="btn btn-block btn-outline-success">Search</button>
                </div>
          </div>
        );
    }
}

export default Main;