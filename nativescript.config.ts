import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.travelplanner',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  ios: {
    discardUncaughtJsExceptions: true
  },
  useLibs: true,
  webpackConfigPath: 'webpack.config.js'
} as NativeScriptConfig;