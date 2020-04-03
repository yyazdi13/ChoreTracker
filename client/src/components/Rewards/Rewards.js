import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
    <div style={{background: "cadetblue", border: '1px solid sienna', margin: "5px", marginLeft: "25px", borderRadius: '2pc', width: "400px", height: "60px", boxShadow: "2px 2px 2px black"}}>
    <div className={classes.root}>
      <FormGroup row>
        <List>
          <ListItem>
            <ul>
           <li> {props.item}
          <Checkbox onClick={() => props.handleCheck(props.id)}/>
          </li>
          </ul>
          </ListItem>
        </List>
      </FormGroup>
    </div>
    </div>
    </div>
  )
}