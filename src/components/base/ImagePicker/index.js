/** @format */

import { Block, Modal, Text, Icon, Button } from '@components';
import { COLORS } from '@theme';
import Picker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

export default function ImagePicker({
  onImagePick,
  disLibrary,
  size,
  options = {},
  isShow,
  onShow,
}) {
  const OPTIONS = {
    mediaType: 'photo',
    width: size,
    height: size,
    cropping: true,
    compressImageQuality: 0.8,
  };
  const openCamera = () => {
    setTimeout(() => {
      Picker.openCamera({ ...OPTIONS, ...options }).then(image => {
        if (__DEV__) {
          console.log('CAMERA_IMAGE', image);
        }
        onShow(false);
        onImagePick?.(image);
      });
    }, 100);
    onShow(false);
  };

  const openGallery = () => {
    setTimeout(() => {
      Picker.openPicker({ ...OPTIONS, ...options }).then(image => {
        if (__DEV__) {
          console.log('PICKER_IMAGE', image);
        }
        onShow(false);
        onImagePick?.(image);
      });
    }, 100);
  };

  return (
    <Modal position="center" isVisible={isShow} onBackdropPress={() => onShow(false)}>
      <Block margin={15} padding={15} radius={20} backgroundColor={COLORS.light}>
        <Text bold center fontSize={18}>
          Chọn hình ảnh
        </Text>
        {size && (
          <Text regular center fontSize={16} marginTop={15}>
            Kích thước tối đa là {size}
          </Text>
        )}
        <Block rowCenter marginTop={25}>
          <Button
            flex
            outline
            title="Mở Máy ảnh"
            onPress={openCamera}
            iconLeft={
              <Icon IconType={MaterialIcons} iconName="photo-camera" marginRight={5} />
            }
          />
          <Button
            flex
            title="Chọn từ máy"
            disabled={disLibrary ? true : false}
            marginLeft={15}
            onPress={openGallery}
            iconLeft={
              <Icon
                marginRight={5}
                IconType={MaterialIcons}
                iconName="photo-library"
                iconColor={COLORS.light}
              />
            }
          />
        </Block>
      </Block>
    </Modal>
  );
}
