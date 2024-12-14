// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({ symbol }) {
  const container = useRef(null);
  // "${symbol}|1D|USD"

  useEffect(() => {
    if (!container.current || !symbol) return;

    // Clear previous widget if any
    container.current.innerHTML = '';

    // Dynamically create the widget script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          [
            "CRYPTO:${symbol}USD|1D"
          ]
        ],
        "chartOnly": true,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "colorTheme": "light",
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": true,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "2",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "headerFontSize": "large",
        "backgroundColor": "rgba(255, 255, 255, 1)",
        "lineWidth": 2,
        "lineType": 0,
        "dateRanges": [
          "1d|1",
          "1w|15",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"
        ]
      }
    `;
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div className="tradingview-widget-scrollable">
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
    </div>
  );
}

export default memo(TradingViewWidget);
