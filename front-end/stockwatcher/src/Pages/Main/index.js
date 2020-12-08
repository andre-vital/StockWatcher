import React from "react";
import "./styles.css";
import Header from "../../GlobalComponents/Header";
import StockTable from "./Components/StockTable";
import AddStockModal from "./Components/AddStockModal";

const MainPage = () => {
  return (
    <div className="main-page-wrapper">
      <Header>
        <AddStockModal />
      </Header>
      <StockTable />
    </div>
  );
};

export default MainPage;
