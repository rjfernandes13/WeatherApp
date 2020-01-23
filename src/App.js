import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Paper, AppBar, Typography, Toolbar } from "@material-ui/core";
import "./App.css";
import LocationListContainer from "./containers/LocationListContainer";
import ForecastExtendedContainer from "./containers/ForecastExtendedContainer";

const cities = [
  "Bogota,col",
  "Caracas,ve",
  "Lisboa,pt",
  "Washington, us",
  "Barcelona, ve"
];
class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h4" color="initial">
                Weather App
              </Typography>
            </Toolbar>
          </AppBar>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <LocationListContainer cities={cities} />
          </Col>
          <Col xs={12} md={6}>
            <Paper>
              <div className="details">
                <ForecastExtendedContainer />
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

//video 148
