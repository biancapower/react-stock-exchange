import React from 'react';

function StockQuotesHistory({
  history
}) {
  return (
    <div>
      { history.map((quote, index) =>
        <li key={index}>
          { quote.symbol }: { quote.companyName }
        </li>
      )}

    </div>
  );
}

export default StockQuotesHistory;
