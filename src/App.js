import React, { Component } from 'react';
import { Grid, Row, Col } from "react-flexbox-grid";
import { Paper, AppBar, Typography, Toolbar } from '@material-ui/core'
import './App.css';
import LocationList from './components/LocationList';
import ForecastExtended from './components/ForecastExtended';

const cities = [
  "Bogota,col",
  "Caracas,ve",
  "Lisboa,pt",
  "Washington, us",
  "Barcelona, ve",
]
class App extends Component {

  constructor() {
    super();
    this.state = {
      city: null,
    };
  }

  handleSelectedLocation = city => {
    this.setState({ city })
  }

  render() {
    const { city } = this.state;
    return (
      <Grid>
        <Row>
          <AppBar position='sticky'>
            <Toolbar>
              <Typography variant='title' color='inherit'>
                Weather App
              </Typography>
            </Toolbar>
          </AppBar>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <LocationList
              cities={cities}
              onSelectedLocation={this.handleSelectedLocation}
            />
          </Col>
          <Col xs={12} md={6}>
            <Paper zDepth={4}>
              <div className='details'>
                {city ?
                  <ForecastExtended city={city} />
                  :
                  null
                }
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

//video 100