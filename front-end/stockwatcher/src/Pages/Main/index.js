import React from "react";
import "./styles.css";
import Header from "../../GlobalComponents/Header";
import StockTable from "./Components/StockTable";
import AddStockModal from "./Components/AddStockModal";
import mainBackgrounds from "../../assets/images/mainBackgrounds.jpg";
import Logout from "../../GlobalComponents/Logout";

const MainPage = () => {
  return (
    <>
      <div className="main-page-wrapper">
        <Header>
          <AddStockModal />
          <Logout />
        </Header>
        <img className="main-image" src={mainBackgrounds} alt="pic" />
        <StockTable />
      </div>
    </>
  );
};

export default MainPage;
