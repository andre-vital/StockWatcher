import React from "react";
import "./styles.css";

const ListItem = ({ title, value }) => {
  return (
    <div className="list-item-container">
      <div className="list-item-top">
        <div className="list-item-top">{title}</div>
      </div>
      <div className="list-item-bottom">{value}</div>
    </div>
  );
};
// ListItem.handleOpen = handleOpen
export default ListItem;
