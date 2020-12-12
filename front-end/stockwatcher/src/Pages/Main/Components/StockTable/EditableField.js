import { TextField } from "@material-ui/core";

const EditableField = ({ children, type, ...props }) => {
  const values = props.values;
  const edit = props.edit;
  if (type === "updateInterval") {
    return edit ? (
      <TextField
        select
        SelectProps={{
          native: true,
        }}
        name={type}
        defaultValue={values[type]}
        {...props}
      >
        {children}
      </TextField>
    ) : (
      values[type]
    );
  } else {
    return edit ? (
      <TextField name={type} defaultValue={values[type]} {...props} />
    ) : (
      values[type]
    );
  }
};

export default EditableField;
