import React from "react";

import ToastPlayground from "../ToastPlayground";
import ToastProvider from "../ToastProvider";
import ToastShelf from "../ToastShelf";
import Footer from "../Footer";

function App() {
  return (
    <ToastProvider>
      <ToastPlayground />
      <Footer />
      <ToastShelf />
    </ToastProvider>
  );
}

export default App;
