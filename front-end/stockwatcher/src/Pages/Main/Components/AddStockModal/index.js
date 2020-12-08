import React, { useEffect, useState } from "react";
import { Modal } from "../../../../GlobalComponents/Modal";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./styles.css";
import { Paper } from "@material-ui/core";
import getStockList from "../../Requests/getStockList";
import searchStock from "../../Requests/searchStock";
import ListItem from "../ListItem";

const AddStockModal = () => {
  const [stockList, setStockList] = useState([]);
  const [stockInfo, setStockInfo] = useState({});

  async function fetchStockList() {
    setStockList(await getStockList());
  }
  async function fetchStockInfo(ticker) {
    setStockInfo(await searchStock(ticker));
  }
  const stockDetails = {
    firstHalf: [
      { title: "Empresa:", value: stockInfo?.company_name },
      { title: "Descrição:", value: stockInfo?.description },
      { title: "Valor:", value: stockInfo?.price },
      { title: "Região:", value: stockInfo?.region },
    ],
    secondHalf: [
      { title: "Variação:", value: stockInfo?.change_percent },
      { title: "Moeda:", value: stockInfo?.currency },
      { title: "Valor de Mercado:", value: stockInfo?.market_cap },
      { title: "Atualizado em:", value: stockInfo?.updated_at },
    ],
  };

  useEffect(() => {
    fetchStockList();
  }, []);

  return (
    <Modal disclosure={<AddCircleOutlineIcon />}>
      <Paper elevation={10}>
        <div className="main-add-stock-modal-container">
          <div className="main-add-stock-modal-upper">
            <div className="main-add-stock-modal-upper-box">
              <Autocomplete
                id="combo-box-demo"
                options={stockList}
                getOptionLabel={(option) => option?.ticker}
                style={{ width: 200, padding: 15 }}
                renderInput={(params) => (
                  <TextField {...params} label="Combo box" variant="outlined" />
                )}
                onInputChange={(event, value) => fetchStockInfo(value)}
              />
            </div>
          </div>
          <div className="main-add-stock-modal-body">
            <div className="main-add-stock-modal-body-left">
              {stockDetails.firstHalf.map((stockDetail) => {
                return (
                  <ListItem
                    title={stockDetail.title}
                    value={stockDetail.value}
                  />
                );
              })}
            </div>
            <div className="main-add-stock-modal-body-right">
              {stockDetails.secondHalf.map((stockDetail) => {
                return (
                  <ListItem
                    title={stockDetail.title}
                    value={stockDetail.value}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};
// AddStockModal.handleOpen = handleOpen
export default AddStockModal;
