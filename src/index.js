import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
/* global gtag */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </AppProvider>
);

function sendToGoogleAnalytics({ name, delta, value, id }) {
  // Assumes the global `gtag()` function exists, see:
  // https://developers.google.com/analytics/devguides/collection/ga4
  window.gtag('event', name, {
    // Built-in params:
    value: delta, // Use `delta` so the value can be summed.
    // Custom params:
    metric_id: id, // Needed to aggregate events.
    metric_value: value, // Optional.
    metric_delta: delta, // Optional.

    // OPTIONAL: any additional params or debug info here.
    // See: https://web.dev/articles/debug-performance-in-the-field
    // metric_rating: 'good' | 'needs-improvement' | 'poor',
    // debug_info: '...',
    // ...
  });
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendToGoogleAnalytics);
