import React, { useEffect, useState } from "react";
import { Modal } from "../../../../GlobalComponents/Modal";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import "./styles.css";
import { Button, IconButton, Paper } from "@material-ui/core";
import getStockList from "../../Requests/getStockList";
import searchStock from "../../Requests/searchStock";
import addToControlledStock from "../../Requests/addToControlledStock";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SearchIcon from "@material-ui/icons/Search";
import ListItem from "../ListItem";
import { useStyles } from "./MuiStyles";
import { RenderStockList } from "./RenderStockList";
import getAllControlledStock from "../../Requests/getAllControlledStock";

const AddStockModal = () => {
  const [stockList, setStockList] = useState([]);
  const [stockInfo, setStockInfo] = useState({});
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  async function fetchStockList() {
    setStockList(await getStockList());
  }

  async function fetchStockInfo(ticker) {
    setStockInfo(await searchStock(ticker));
  }

  async function addStock(ticker) {
    await addToControlledStock(ticker);
    await fetchStockInfo(ticker);
    await fetchStockList();
    await getAllControlledStock();
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
    <Modal disclosure={<AddCircleOutlineIcon style={{ fill: "white" }} />}>
      <Paper elevation={10}>
        <div className="main-add-stock-modal-container">
          <div className="main-add-stock-modal-upper">
            <div className="main-add-stock-modal-upper-left">
              <Button
                variant="contained"
                color="primary"
                className={classes.margin}
                onClick={() => addStock(stockInfo?.symbol)}
              >
                Adicionar : {stockInfo?.company_name}
              </Button>
            </div>
            <div className="main-add-stock-modal-upper-right">
              <div className="main-add-stock-modal-upper-box">
                <div style={{ paddingRight: 5 }}>
                  <IconButton onClick={() => fetchStockInfo(search)}>
                    <SearchIcon />
                  </IconButton>
                </div>
                <TextField
                  label="Ticker"
                  variant="outlined"
                  value={search}
                  style={{ width: 100 }}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <div style={{ paddingRight: 5, paddingLeft: 5 }}>
                  <IconButton onClick={handleClick}>
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </div>
                <RenderStockList
                  anchorEl={anchorEl}
                  data={stockList}
                  search={setSearch}
                  setAnchorEl={setAnchorEl}
                />
              </div>
            </div>
          </div>
          <div className="main-add-stock-modal-body">
            <div className="main-add-stock-modal-body-left">
              {stockDetails.firstHalf.map((stockDetail) => (
                <ListItem title={stockDetail.title} value={stockDetail.value} />
              ))}
            </div>
            <div className="main-add-stock-modal-body-right">
              {stockDetails.secondHalf.map((stockDetail) => (
                <ListItem title={stockDetail.title} value={stockDetail.value} />
              ))}
            </div>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};
// AddStockModal.handleOpen = handleOpen
export default AddStockModal;
