import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Earnings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAmt: null,
      user: null,
      savedAmt: null,
    };
    this.getChores();
    axios
      .get("api/showChores")
      .then((Chores) => this.setState({ Chores: Chores.data }));

    const useStyles = makeStyles({
      root: {
        maxWidth: 345,
        marginLeft: 20,
      },
      media: {
        height: 140,
      },
    });

    function EarningsCard(props) {
      const classes = useStyles();

      return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.chore}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              {props.amount}
            </Button>
            <Button size="small" color="primary">
              View Earnings
            </Button>
            <Button size="small" color="primary">
              Save Earnings
            </Button>
          </CardActions>
        </Card>
      );
    }
  }
}

export default Earnings;
