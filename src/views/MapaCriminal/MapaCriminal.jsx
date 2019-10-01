import React from "react";
import ReactMapboxGl, { Layer, Feature, GeoJSONLayer } from "react-mapbox-gl";

import { connect } from "react-redux";

//const data = require('variables/geojson.json');

import { mapBoxAccessToken } from 'config';

const Map = ReactMapboxGl({
  accessToken: mapBoxAccessToken
});

const layerPaint = {
  /*
  'heatmap-weight': {
    property: 'weight',
    type: 'exponential',
    stops: [[0, 0], [5, 2]]
  },
  */
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  'heatmap-intensity': {
    stops: [[0, 0], [5, 1.2]]
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  'heatmap-color': [
    'interpolate',
    ['linear'],
    ['heatmap-density'],
    0,
    'rgba(52,52,235,0)',
    0.25,
    'rgba(52,52,235,0.8)',
    0.5,
    'rgba(18, 230, 57, 0.8)',
    0.8,
    'rgba(230, 223, 18, 0.8)',
    1,
    'rgba(230, 18, 18, 0.8)',
  ],
  // Adjust the heatmap radius by zoom level
  'heatmap-radius': {
    stops: [[0, 1], [5, 50]]
  }
}

const mapStateToProps = (state) => {
  return { crimes: state.crimes };
}

// in render()
class MapaCriminal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          display: "flex",
          height: "calc(100vh - 60px)",
          width: "100%"
        }}
        center={[-50.632994, -24.326451]}
        zoom={[13]}
      >
        <Layer type="circle">
          {this.props.crimes.map((el, index) => (
            <Feature key={index} coordinates={el.lngLat} />
          ))}
        </Layer>
        <Layer type="heatmap" paint={layerPaint}>
          {this.props.crimes.map((el, index) => (
            <Feature key={index} coordinates={el.lngLat} />
          ))}
        </Layer>
      </Map>
    );
  }
}

MapaCriminal.defaultProps = {
  crimes: []
}

export default connect(mapStateToProps)(MapaCriminal);
