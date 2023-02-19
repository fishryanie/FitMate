/** @format */

import React, { useState } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Block, Image, Text, Icon, Pressable, ImagePicker, Modal } from '@components';
import { height, width } from '@utils/responsive';
import { getAbbr } from './helper';
import { COLORS } from '@theme';

const UserAvatar = ({
  name = '',
  uri,
  size = 50,
  fontDecrease = 3,
  canPicker,
  imagePicker,
  setImagePicker,
  onImagePick,
  ...props
}) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const [showPopupImg, setShowPopupImg] = useState(false);
  const [viewImage, setViewImage] = useState(false);

  uri = imagePicker?.path;

  const _renderInner = () => {
    if (uri && !loadFailed) {
      return (
        <Pressable onPress={() => setViewImage(true)}>
          <Image
            round={size}
            onError={() => setLoadFailed(true)}
            source={{ uri }}
            resizeMode="cover"
          />
        </Pressable>
      );
    } else if (name) {
      return (
        <Text
          paddingHorizontal={5}
          numberOfLines={1}
          color="white"
          fontSize={size / fontDecrease}>
          {getAbbr(name)}
        </Text>
      );
    } else {
      return (
        <Icon
          solid
          IconType={FontAwesome5}
          iconName="user"
          iconColor="primary"
          ICONSize={size / fontDecrease}
        />
      );
    }
  };

  const backgroundColor =
    uri && !loadFailed ? 'transparent' : name ? 'primary' : 'primaryTints50';

  return (
    <Block
      key={`${uri}${loadFailed}`}
      round={size}
      relative
      alignCenter
      justifyCenter
      backgroundColor={backgroundColor} {...props}>
      {_renderInner()}
      {canPicker && (
        <Pressable
          absolute
          alignCenter
          justifyCenter
          round={size / 2.5}
          right={0}
          bottom={0}
          padding={1}
          onPress={() => setShowPopupImg(true)}
          backgroundColor={COLORS.grey300}>
          <Icon IconType={FontAwesome5} iconName="camera" iconSize={size / 4.5} />
        </Pressable>
      )}
      <ImagePicker
        size={5000}
        isShow={showPopupImg}
        onShow={setShowPopupImg}
        onImagePick={setImagePicker}
      />
      <Modal
        position="center"
        isVisible={viewImage}
        onBackdropPress={() => setViewImage(false)}>
        <Block alignCenter justifyCenter>
          <Image width={width} height={height / 2} source={{ uri }} />
        </Block>
      </Modal>
    </Block>
  );
};

export default UserAvatar;
