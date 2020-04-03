import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default function SwitchLabels() {
  const [state, setState] = React.useState({
    checkedB: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
          />
        }
        label="Done"
      />
    </div>
  );
}
