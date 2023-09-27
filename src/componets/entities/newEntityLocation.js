import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { FiLoader } from 'react-icons/fi';
import LocationMarker from './my-location/LocationMarker';
import storeIcon from '../../images/location/store-icon.png';

const LocationClicked = () => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      localStorage.setItem('clickedLocation', JSON.stringify({ location: position }));
    },
  });

  const customIcon = L.icon({
    iconUrl: storeIcon,
    iconSize: [30, 30],
    iconAnchor: [10, 20],
    className: 'leaflet-location-icon',
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>Choosen Location</Popup>
    </Marker>
  );
};

const NewEnityLocation = (props) => {

  const { getCoordinates } = props;

  const [message, setMessage] = useState(
    'Choose the location by clicking on the Map or use your current Location',
  );

  const [showLoader, setLoader] = useState(false);
  const [showLoader2, setLoader2] = useState(false);

  const currentLocation = JSON.parse(localStorage.getItem('currentLocation'));
  const clickedCoordinates = JSON.parse(localStorage.getItem('clickedLocation'));
  const savePlaces = (myLocation) => {
    if (myLocation) {
      if (currentLocation) {
        getCoordinates(currentLocation.location);
        setMessage(null);
        setLoader(true);
      } else {
        setMessage(
          'Cooldnt find your location! Refresh the page or click on the Map',
        );
      }
    } else if (clickedCoordinates) {
      getCoordinates(clickedCoordinates.location);
      setMessage(null);
      setLoader2(true);
    } else {
      setMessage(
        'Choose a location by clicking on the map before the next step!',
      );
    }
  };

  return (
    <div className="create-store-places">
      <div
        style={{
          width: '70vw',
          height: 'calc(60vh )',
          border: '1px solid gray',
        }}
      >
        <MapContainer
          center={[-2.8774, 23.6569]}
          zoom={8}
          scrollWheelZoom={false}
          style={{
            width: '100%',
            position: 'relative',
            height: '100%',
            outline: 'none',
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker />
          <LocationClicked />
        </MapContainer>
      </div>
      <p>{message}</p>


      <div className="row">
        <button
          type="button"
          onClick={() => savePlaces(false)}
          className="create-store-submit"
        >
          {showLoader2 ? (
            <FiLoader className="button-loader" color="#fff" />
          ) : (
            'Set Location'
          )}
        </button>
        or
        <button
          type="button"
          className="create-store-submit"
          onClick={() => savePlaces(true)}
        >
          {showLoader ? (
            <FiLoader className="button-loader" color="#fff" />
          ) : (
            'Use your current Location'
          )}
        </button>
      </div>
    </div>
  );
};

export default NewEnityLocation;
