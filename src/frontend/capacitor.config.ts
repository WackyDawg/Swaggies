import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.swaggies.app',
  appName: 'swaggies',
  webDir: 'dist/vaultly/browser',
  "plugins": {
    "StatusBar": {
      "overlaysWebView": false,
      "style": "DARK",
      "backgroundColor": "#ffffffff"
    }
  },
 
  // plugins: {
  //   SplashScreen: {
  //     launchAutoHide: true,
  //     launchShowDuration: 0,
  //     showSpinner: true
  //   },
  //   CapacitorLottieSplashScreen: {
  //     Enabled: true,
  //     LottieAnimationLocation: "assets/splash/"
  //   }
  // },
};

export default config;
