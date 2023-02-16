import {icons} from '@assets';
import {Block, Icon, Image, ImagePicker, Pressable, Text} from '@components';
import {COLORS} from '@theme';
import {width} from '@utils/responsive';
import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MultiImageInput = ({
  label = '',
  name,
  control,
  maxImage = 4,
  imageOptions = {},
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    field: {value: images = [], onChange},
    fieldState: {error},
  } = useController({name, control});
  const errorMessage = error?.message;

  const onImagePick = imgs => {
    const filteredImage = Array.isArray(imgs)
      ? imgs?.filter(img => !images.some(image => image.data === img.data))
      : [imgs];
    onChange([...images, ...filteredImage].slice(0, maxImage));
  };

  const _renderPlaceHolder = () => {
    if (images.length >= maxImage) {
      return null;
    }
    return (
      <Block rowCenter>
        <Pressable marginRight={15} onPress={() => setModalVisible(true)}>
          <Image source={icons.ic_upload_image} square={57} />
        </Pressable>
        <Text
          width={width / 2}
          regular
          fontSize={14}
          color={COLORS.placeholder}>
          Tối đa 4 ảnh, mỗi ảnh có kích thước tối đa 2mb
        </Text>
      </Block>
    );
  };

  const _renderImagePreview = () => {
    return (
      <Block row>
        {images?.map((item, index) => {
          const onPress = () => {
            const newImages = images.filter((_, i) => i !== index);
            onChange(newImages);
          };
          return (
            <Block
              backgroundColor="placeholder2"
              key={index}
              radius={5}
              marginRight={15}
              marginVertical={10}>
              <Image
                source={{uri: item.path || item}}
                resizeMode="cover"
                square={57}
                radius={5}
              />
              <Pressable
                absolute
                right={-5}
                bottom={-5}
                onPress={onPress}
                backgroundColor={COLORS.white}>
                <Icon
                  IconType={AntDesign}
                  iconName="closecircle"
                  iconSize={15}
                  iconColor="primary"
                />
              </Pressable>
            </Block>
          );
        })}
      </Block>
    );
  };

  return (
    <Block {...props}>
      {label?.length > 0 && (
        <Text regular fontSize={14} marginBottom={10}>
          {label}
        </Text>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {_renderImagePreview()}
        {_renderPlaceHolder()}
      </ScrollView>
      {errorMessage?.length > 0 && (
        <Text
          color="red"
          fontSize={11}
          marginTop={2}
          marginLeft={15}
          marginBottom={10}>
          {errorMessage}
        </Text>
      )}
      {modalVisible && (
        <ImagePicker
          hidePicker={() => setModalVisible(false)}
          onImagePick={onImagePick}
          options={{
            multiple: true,
            maxFiles: maxImage,
            includeBase64: true,
            ...imageOptions,
          }}
        />
      )}
    </Block>
  );
};

export default MultiImageInput;
