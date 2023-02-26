module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@i18n': './src/i18n',
          '@routes': './src/routes',
          '@store': './src/store',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@router': './src/routes/router',
          '@responsive': './src/utils/responsive',
        },
      },
    ],
  ],
};
