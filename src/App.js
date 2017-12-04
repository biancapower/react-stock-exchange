import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo';
import { loadQuoteForStock } from './api/iex';


class App extends Component {
  state = {
    quote: null
  }

  componentDidMount() {
    this.loadQuote()
  }

  loadQuote() {
    loadQuoteForStock('F')
      .then((quote) => {
        this.setState({ quote: quote })
      })
      .catch((err) => { console.log(err) })

  }

  render() {
    return (
      <div className="App">
        <StockInfo {...this.state.quote}/>
      </div>
    );
  }
}

export default App;
