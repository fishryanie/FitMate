/** @format */

import { Block, Button, Modal, Text } from '@components';
import { COLORS } from '@theme';
import React from 'react';

export default function PopupAccept({
  title,
  description,
  isShow,
  onShow,
  onAccept,
  onClose,
}) {
  return (
    <Modal position="center" isVisible={isShow} onBackdropPress={() => onShow(false)}>
      <Block margin={15} padding={15} radius={20} backgroundColor={COLORS.light}>
        <Text bold center fontSize={18}>
          {title}
        </Text>
        {description && (
          <Text regular center fontSize={16} marginTop={15}>
            {description}
          </Text>
        )}
        <Block rowCenter marginTop={25}>
          <Button flex outline title="Close" onPress={onClose} />
          <Button flex title="Accept" marginLeft={15} onPress={onAccept} />
        </Block>
      </Block>
    </Modal>
  );
}
