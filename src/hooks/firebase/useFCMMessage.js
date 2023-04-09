/** @format */

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function useFCMMessage() {
  const [message, setMessage] = useState(null);

  const fcmMessage = useSelector(state => state.app.fcmMessage);

  const isMount = useRef(true);

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false;
    } else {
      setMessage(fcmMessage);
    }
  }, [fcmMessage?.messageId]);

  return message;
}
