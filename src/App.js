import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo';
import StockInfoError from './components/StockInfoError';
import StockQuotesHistory from './components/StockQuotesHistory';
import { loadQuoteForStock, loadLogoForStock } from './api/iex';


class App extends Component {
  state = {
    symbol: 'MNKD',
    quote: null,
    history: []
  }

  componentDidMount() {
    this.loadQuote()
  }

  loadQuote() {
    loadQuoteForStock(this.state.symbol)
      .then((quote) => {
        this.state.history.push(quote)
        this.setState({ quote: quote, error: null })
      })
      .catch((err) => {
        this.setState({
          error: err.message
        })
        // console.log(err)
      })

    loadLogoForStock(this.state.symbol)
      .then((logo) => {
        this.setState({ logoURL: logo.url })
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
        <br/>
        <img src={this.state.logoURL} alt={this.state.symbol}></img>
        <StockInfoError err={this.state.error}  />
        <StockInfo {...this.state.quote}/>
        <StockQuotesHistory history={this.state.history}/>
      </div>
    );
  }
}

export default App;
