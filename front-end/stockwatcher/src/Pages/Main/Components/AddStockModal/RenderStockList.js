import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export const RenderStockList = ({ anchorEl, data, search, setAnchorEl }) => {
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {data.map((option) => (
        <MenuItem key={option?.ticker} onClick={() => search(option?.ticker)}>
          {option?.ticker}
        </MenuItem>
      ))}
    </Menu>
  );
};
