import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Exchange from "./components/Exchange.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Exchange />
      <Footer />
    </>
  );
}

export default App;
