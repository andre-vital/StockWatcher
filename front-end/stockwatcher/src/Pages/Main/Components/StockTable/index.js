import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton, Paper, TableContainer } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import getAllControlledStock from "../../Requests/getAllControlledStock";
import "./styles.css";
import Chart from "../Chart";
const useStyles = makeStyles({
  table: {
    minWidth: 700,
    mindHeight: 300,
    margin: 20,
    height: 500,
  },
});

const StockTable = () => {
  const [controlledStock, setControlledStock] = useState([]);
  const [open, setOpen] = useState(false);

  async function fetchControlledStock() {
    setControlledStock(await getAllControlledStock(1));
  }

  useEffect(() => {
    fetchControlledStock();
  }, []);
  const classes = useStyles();
  return (
    <div className="main-stock-table-container">
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow className="main-stock-table-row">
              <TableCell />
              <TableCell>Empresa</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell align="right">Compra</TableCell>
              <TableCell align="right">Venda</TableCell>
              <TableCell align="right">Valor de mercado</TableCell>
              <TableCell align="right">Intervalo de Atualização</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {controlledStock.map((row) => (
              <>
                <TableRow key={row.name}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>

                  <TableCell component="th" scope="row">
                    {row?.name}
                  </TableCell>
                  <TableCell align="right">{row?.values[0].price}</TableCell>
                  <TableCell align="right">{row?.buyPrice}</TableCell>
                  <TableCell align="right">{row?.sellPrice}</TableCell>
                  <TableCell align="right">
                    {row?.values[0].marketCap}
                  </TableCell>
                  <TableCell align="right">{row?.updateInterval}</TableCell>
                </TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Chart data={row?.values} />
                  </Collapse>
                </TableCell>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StockTable;
