import {height} from '@responsive';
import React, {useEffect, useRef, useState} from 'react';
import {
  Modal as ReactNativeModal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import styles from './styles';

const ModalBox = ({
  isVisible,
  setIsVisible,
  position = 'bottom',
  onBackdropPress,
  backdropStyle,
  containerStyle,
  children,
  animationType,
  animationDuration = 300,
  backdropOpacity = 0.4,
  ...rest
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setModalShow(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }).start(({finished}) => {
        if (finished) {
          setModalShow(false);
        }
      });
    }
  }, [animatedValue, isVisible, animationDuration]);

  const rOverLayStyle = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, backdropOpacity],
    }),
  };

  const rContentStyle =
    position === 'center'
      ? {
          flex: 1,
          justifyContent: 'center',
          transform: [
            {
              scale: animatedValue,
            },
          ],
        }
      : {
          flex: 1,
          justifyContent: 'flex-end',
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [height, 0],
              }),
            },
          ],
        };

  const _onCloseModal = () => {
    setIsVisible && setIsVisible(false);
    onBackdropPress?.();
  };

  return (
    <ReactNativeModal
      {...rest}
      transparent
      animationType={animationType}
      visible={modalShow}>
      <TouchableWithoutFeedback onPress={_onCloseModal}>
        <Animated.View
          style={[styles.backdrop, rOverLayStyle, backdropStyle]}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[rContentStyle, containerStyle]}
        pointerEvents="box-none">
        {children}
      </Animated.View>
    </ReactNativeModal>
  );
};

export default ModalBox;
