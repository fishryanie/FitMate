/** @format */

import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { useLocationPermission } from '@hooks';

export default function useCurrentPosition(value) {
  const [currentPosition, setPosition] = useState(null);
  const locationPermission = useLocationPermission();

  useEffect(() => {
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const {
            coords: { latitude, longitude, heading },
          } = position;
          setPosition({ latitude, longitude, heading });
        },
        error => {},
        { enableHighAccuracy: true }
      );
      const watchId = Geolocation.watchPosition(
        position => {
          const {
            coords: { latitude, longitude, heading },
          } = position;
          setPosition({ latitude, longitude, heading });
        },
        error => {},
        { enableHighAccuracy: true, distanceFilter: 10 }
      );
      return () => {
        Geolocation.clearWatch(watchId);
      };
    }
  }, [locationPermission]);

  return currentPosition;
}
