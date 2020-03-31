import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
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
    <div style={{background: "cadetblue", border: '1px solid sienna', margin: "5px"}}>
    <div className={classes.root}>
      <FormGroup row>
        <List>
          <ListItem>
            <ul>
           <li> {props.item}
          <Checkbox onClick={function(){console.log("click")}}/>
          </li>
          </ul>
          </ListItem>
        </List>
      </FormGroup>
    </div>
    </div>
  )
}