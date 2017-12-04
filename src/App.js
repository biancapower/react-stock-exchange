import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo';
import StockInfoError from './components/StockInfoError';
import { loadQuoteForStock } from './api/iex';


class App extends Component {
  state = {
    symbol: 'MNKD',
    quote: null
  }

  componentDidMount() {
    this.loadQuote()
  }

  loadQuote() {
    loadQuoteForStock(this.state.symbol)
      .then((quote) => {
        this.setState({ quote: quote, error: null })
      })
      .catch((err) => {
        this.setState({
          error: err.message
        })
        // console.log(err)
      })

  }

  handleSymbolChange = (event) => {
    console.log(event.target);
    const target = event.target;
    const value = target.value;
    this.setState({
      symbol: value
    });
  }

  handleButtonClick = (event) => {
    this.loadQuote();
  }

  render() {
    return (
      <div className="App">
        <h1>React Stock Info</h1>
        <input
          value={ this.state.symbol }
          placeholder="Enter symbol"
          onChange={ this.handleSymbolChange }
        />
        <button onClick={ this.handleButtonClick }>Get Quote</button>
        <StockInfoError err={this.state.error}  />
        <StockInfo {...this.state.quote}/>
      </div>
    );
  }
}

export default App;
