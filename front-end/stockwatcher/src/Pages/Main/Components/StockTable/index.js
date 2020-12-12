import React, { useEffect, useState } from "react";
import { IconButton, Paper, TableContainer } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Refresh from "@material-ui/icons/Refresh";
import getAllControlledStock from "../../Requests/getAllControlledStock";
import StockTableRow from "./StockTableRow";
import { useStyles } from "./MuiStyles";
import editStockInfo from "../../Requests/editStockInfo";
import "./styles.css";

const background = { backgroundColor: "#cccac6" };

const StockTable = () => {
  const [controlledStock, setControlledStock] = useState([]);
  const classes = useStyles();

  async function fetchControlledStock() {
    setControlledStock(await getAllControlledStock());
  }
  async function editStock(data) {
    await editStockInfo(data);
    await fetchControlledStock();
  }

  const tableHeader = [
    "Valor",
    "Compra",
    "Venda",
    "Valor de mercado (BRL)",
    "Intervalo de Atualização (m)",
  ];

  useEffect(() => {
    console.log("teste");
    fetchControlledStock();
  }, []);

  return (
    <div className="main-stock-table-container">
      <TableContainer className={classes.table} component={Paper}>
        <Table stickyHeader aria-label="customized table">
          <TableHead style={background}>
            <TableRow className="main-stock-table-row">
              <TableCell style={background}>
                <IconButton onClick={fetchControlledStock}>
                  <Refresh />
                </IconButton>
              </TableCell>
              <TableCell style={background}>Empresa</TableCell>
              {tableHeader.map((name) => (
                <TableCell style={background} align="right">
                  {name}
                </TableCell>
              ))}
              <TableCell style={background} />
            </TableRow>
          </TableHead>
          <TableBody>
            {controlledStock.map((row) => (
              <StockTableRow rowData={row} editInfo={editStock} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StockTable;
