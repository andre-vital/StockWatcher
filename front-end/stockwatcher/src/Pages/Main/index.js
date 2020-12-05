import React from "react";
import "./styles.css";
import Header from "../../GlobalComponents/Header";
import StockTable from "./Components/StockTable";

const MainPage = () => (
  <div className="main-page-wrapper">
    <Header />
    <StockTable />
  </div>
);

export default MainPage;
