import React from "react";
import "./styles.css";
import Header from "../../GlobalComponents/Header";
import StockTable from "./Components/StockTable";
import AddStockModal from "./Components/AddStockModal";

const MainPage = ({ ...props }) => {
  console.log({ props });
  return (
    <div className="main-page-wrapper">
      <Header>
        <AddStockModal {...props} />
      </Header>
      <StockTable {...props} />
    </div>
  );
};

export default MainPage;
