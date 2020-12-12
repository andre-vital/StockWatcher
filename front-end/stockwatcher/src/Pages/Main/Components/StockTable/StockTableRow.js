import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Chart from "../Chart";
import { IconButton } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Create from "@material-ui/icons/Create";
import Check from "@material-ui/icons/Check";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import EditableField from "./EditableField";
import removeFromControlledStock from "../../Requests/removeFromControlledStock";

const StockTableRow = ({ rowData, editInfo, refresh }) => {
  const INTERVALS = [5, 15, 30, 60];
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

  async function removeStock() {
    await removeFromControlledStock(rowData?.values[0].controlledStock_id);
    await refresh();
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const TEXT_FIELD_PROPS = {
    onChange: handleChange,
    values: values,
    edit: edit,
  };

  return (
    <>
      <TableRow key={rowData.name}>
        <IconButton size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <TableCell component="th" scope="row">
          {rowData?.name}
        </TableCell>
        <TableCell align="right">{rowData?.values[0].price}</TableCell>
        <TableCell align="right">{rowData?.values[0].marketCap}</TableCell>
        <TableCell align="right">
          <EditableField {...TEXT_FIELD_PROPS} type="buyPrice" />
        </TableCell>
        <TableCell align="right">
          <EditableField {...TEXT_FIELD_PROPS} type="sellPrice" />
        </TableCell>
        <TableCell align="right">
          <EditableField {...TEXT_FIELD_PROPS} type="updateInterval">
            {INTERVALS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </EditableField>
        </TableCell>
        <TableCell align="right">
          <IconButton size="small" onClick={() => openConfigurables()}>
            {edit ? <Check /> : <Create />}
          </IconButton>
          <IconButton size="small" onClick={removeStock}>
            <HighlightOffIcon />
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
