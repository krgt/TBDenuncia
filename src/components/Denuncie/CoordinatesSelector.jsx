import React from "react";
import PropTypes from "prop-types";

import * as mapboxgl from 'mapbox-gl';

const bounds = [
  [-50.771408, -24.417812],
  [-50.520029, -24.233835]
];

class PlaceSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [-50.633902431581646, -24.32467833468013]
    };

    this.onChangeLngLat = props.onChange;

    this.handleMap = this.handleMap.bind(this);
    this.handleClickMap = this.handleClickMap.bind(this);
    this.handleMoveMap = this.handleMoveMap.bind(this);
  }

  componentDidMount() {
    const { container, style, zoom, accessToken } = this.props
    const { center } = this.state
    this.handleMap(container, style, center, zoom, accessToken)
  }

  handleMap(container, style, center, zoom, accessToken) {
    mapboxgl.accessToken = accessToken
    const map = new mapboxgl.Map({
      container: container,
      center: center,
      maxBounds: bounds,
      style: style,
      zoom: zoom,
    })

    this.onChangeLngLat({target: {value: center}}); // set initial lngtlat in the Denuncie view

    this.marker = new mapboxgl.Marker({
      anchor: 'bottom',
      color: '#f44336',
    }).setLngLat(center).addTo(map);

    map.on('click', this.handleClickMap);
    map.on('touchstart', this.handleClickMap);
    map.on('move', this.handleMoveMap);
    map.on('moveend', () => {this.state.map.on('move', this.handleMoveMap)});
    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl());

    this.setState({
      map: map
    })
  }

  handleMoveMap (e) {
    const {map} = this.state;
    const center = map.getCenter();

    this.onChangeLngLat({target: {value: [center.lng, center.lat]}});
    this.marker.setLngLat(center);
  }

  handleClickMap (e) {
    const {map} = this.state;
    this.onChangeLngLat({target: {value: [e.lngLat.lng, e.lngLat.lat]}});
    this.marker.setLngLat(e.lngLat);
    map.off('move', this.handleMoveMap);
    map.flyTo({
      center: e.lngLat,
      speed: 0.2
    })
  }

  outlineStyle={
    margin: "0px",
    borderRadius: "4px",
    border: "1px solid rgba(0,0,0,0.23)",
    padding: "10px",
    height: "calc(100vh - 130px)",
    width: "100%",
  }

  labelStyle={
    padding: "0 5px",
    margin: 0,
    lineHeight: 1,
    fontSize: "0.80rem",
    fontWeight: 400,
    color: "rgba(0,0,0,0.54)",
  }

  containerStyle={
    height: "calc(100vh - 140px)",
    width: "100%",
  };

  render(){
    const { container, classNameStyle } = this.props
    return(
      <fieldset style={this.outlineStyle}>
        <legend style={this.labelStyle}>Local do Crime</legend>
        <div id={container} style={this.containerStyle} className={classNameStyle}>
        </div>
      </fieldset>
    )
  }
}

const { string, number } = PropTypes
Map.propTypes = {
  container: string.isRequired,
  style: string.isRequired,
  classNameStyle: string.isRequired,
  zoom: number.isRequired,
  accessToken: string.isRequired
}

export default PlaceSelector;