import * as React from "react";
import { Modal } from "../../../../GlobalComponents/Modal";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./styles.css";
import { Paper } from "@material-ui/core";

const AddStockModal = () => {
  const options = [{ title: "1" }, { title: "2" }, { title: "3" }];
  return (
    <Modal disclosure={<AddCircleOutlineIcon />}>
      <Paper elevation={10}>
        <div className="main-add-stock-modal-container">
          <div className="main-add-stock-modal-upper">
            <div className="main-add-stock-modal-upper-box">
              <Autocomplete
                id="combo-box-demo"
                options={options}
                getOptionLabel={(option) => option.title}
                style={{ width: 200, padding: 15 }}
                renderInput={(params) => (
                  <TextField {...params} label="Combo box" variant="outlined" />
                )}
              />
            </div>
          </div>
          <div className="main-add-stock-modal-body">aqui dois</div>
        </div>
      </Paper>
    </Modal>
  );
};
// AddStockModal.handleOpen = handleOpen
export default AddStockModal;
