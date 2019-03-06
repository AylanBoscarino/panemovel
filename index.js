/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// // import {AppRegistry} from 'react-native';
// import { Navigation } from 'react-native-navigation';

// import App from './App';
// // import {name as appName} from './app.json';

// // AppRegistry.registerComponent(appName, () => App);


// Navigation.registerComponent('AppScreen', () => App);

// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       component: {
//         name: 'AppScreen'
//       }
//     }
//   });
// });

import registerNavigationStack from './src/navigation';

registerNavigationStack();
