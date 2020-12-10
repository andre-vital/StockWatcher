import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Chart from "../Chart";
import { IconButton, TextField } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Create from "@material-ui/icons/Create";
import Check from "@material-ui/icons/Check";

const StockTableRow = ({ rowData, editInfo }) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [values, setValues] = useState({
    buyPrice: rowData?.buyPrice,
    updateInterval: rowData?.updateInterval,
    sellPrice: rowData?.sellPrice,
  });

  const openConfigurables = () => {
    setEdit(!edit);
    if (edit) {
      const dataToEdit = {
        ...values,
        stockId: rowData?.stockId,
      };
      editInfo(dataToEdit);
    } else {
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <TableRow key={rowData.name}>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <TableCell component="th" scope="row">
          {rowData?.name}
        </TableCell>
        <TableCell align="right">{rowData?.values[0].price}</TableCell>
        <TableCell align="right">
          {edit ? (
            <TextField
              name="buyPrice"
              defaultValue={values.buyPrice}
              onChange={handleChange}
            />
          ) : (
            values.buyPrice
          )}
        </TableCell>
        <TableCell align="right">
          {edit ? (
            <TextField
              name="sellPrice"
              defaultValue={values.sellPrice}
              onChange={handleChange}
            />
          ) : (
            values.sellPrice
          )}
        </TableCell>
        <TableCell align="right">{rowData?.values[0].marketCap}</TableCell>
        <TableCell align="right">
          {edit ? (
            <TextField
              name="updateInterval"
              defaultValue={values.updateInterval}
              onChange={handleChange}
            />
          ) : (
            values.updateInterval
          )}
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => openConfigurables()}>
            {edit ? <Check /> : <Create />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Chart data={rowData} />
        </Collapse>
      </TableCell>
    </>
  );
};
export default StockTableRow;
