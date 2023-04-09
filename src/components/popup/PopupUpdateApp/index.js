/** @format */

import { icons } from '@assets';
import { Block, Image, Pressable, Text } from '@components';
import { INSTALL_APP_URL } from '@constants';
import remoteConfig from '@react-native-firebase/remote-config';
import { COLORS } from '@theme';
import { isNewerVersion } from '@utils/helper';
import React, { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { getVersion } from 'react-native-device-info';

const ModalUpdateApp = () => {
  /*
        0: latest
        1: have new version
        2: require update
    */
  const [status, setStatus] = useState(0);

  const openStore = () => {
    Linking.openURL(INSTALL_APP_URL);
  };

  useEffect(() => {
    const current_version_store = remoteConfig().getString('current_version_store');
    if (current_version_store) {
      const { android, ios } = JSON.parse(current_version_store);
      const remoteVersion = Platform.select({ android, ios });
      const currentVersion = getVersion();
      const haveNewVersion = isNewerVersion(currentVersion, remoteVersion.version);
      if (haveNewVersion) {
        if (remoteVersion.mandatory) {
          setStatus(2);
        } else {
          setStatus(1);
        }
      }
    }
  }, []);

  return (
    !!status && (
      <Block zIndex={9} absoluteFillObject backgroundColor={'rgba(0,0,0,0.5)'} justifyCenter>
        <Block backgroundColor={COLORS.white} marginHorizontal={15} radius={10}>
          <Text center bold color={COLORS.darkCharcoal} fontSize={16} marginTop={20}>
            {'Đã có phiên bản mới'}
          </Text>
          {status === 2 ? (
            <Block>
              <Text center marginTop={10} color={COLORS.gray2}>
                {'Vui lòng cập nhật app để tiếp tục sử dụng'}
              </Text>
              <Image source={icons.ic_update_app} marginTop={15} alignSelf="center" square={140} resizeMode="contain" />
              <Block alignCenter marginTop={20} paddingHorizontal={15} marginBottom={15}>
                <Pressable
                  onPress={openStore}
                  alignCenter
                  justifyCenter
                  width={'45%'}
                  radius={5}
                  height={45}
                  backgroundColor={COLORS.primary}>
                  <Text medium color={COLORS.white} fontSize={16}>
                    {'Cập nhật ngay'}
                  </Text>
                </Pressable>
              </Block>
            </Block>
          ) : (
            <Block>
              <Text center marginTop={10} color={COLORS.gray2}>
                {'Hãy cập nhật app để có những trải nghiệm tốt nhất'}
              </Text>
              <Image source={icons.ic_update_app} marginTop={15} alignSelf="center" square={140} resizeMode="contain" />
              <Block row spaceBetween marginTop={20} paddingHorizontal={15} marginBottom={15}>
                <Pressable
                  backgroundColor={COLORS.background2}
                  alignCenter
                  justifyCenter
                  width={'45%'}
                  radius={5}
                  height={45}
                  onPress={() => setStatus(0)}>
                  <Text medium color={COLORS.darkCharcoal} fontSize={16}>
                    {'Để sau'}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={openStore}
                  alignCenter
                  justifyCenter
                  width={'45%'}
                  radius={5}
                  height={45}
                  backgroundColor={COLORS.primary}>
                  <Text medium color={COLORS.white} fontSize={16}>
                    {'Cập nhật ngay'}
                  </Text>
                </Pressable>
              </Block>
            </Block>
          )}
        </Block>
      </Block>
    )
  );
};

export default ModalUpdateApp;
