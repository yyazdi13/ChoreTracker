import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));



export default function InteractiveList(props) {
  const classes = useStyles();
  

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "flexStart"}}>
    <div className={classes.root}>
      <FormGroup row>
        <List>
            <ul>
           <li> {props.item}
          <Checkbox onClick={() => props.handleCheck(props.id)}/>
          </li>
          </ul>
        </List>
      </FormGroup>
    </div>
    </div>
  )
}