const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Expo Routerの設定
config.resolver.assetExts.push('db');

// 環境変数の設定
process.env.EXPO_ROUTER_APP_ROOT = 'app';

module.exports = config; 