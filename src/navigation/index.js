import { Navigation } from 'react-native-navigation';

import HomeScreen from './HomeScreen';
import ListStationsScreen from './ListStationsScreen';

export default function registerNavigationStack() {
  Navigation.registerComponent('HomeScreen', () => HomeScreen);
  Navigation.registerComponent('ListStationsScreen', () => ListStationsScreen);

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              component: {
                name: 'HomeScreen',
                options: {
                  bottomTab: {
                    text: 'Página Inicial',
                    icon: require('../../asstes/map.png'),
                  },
                },
              },
            },
            {
              component: {
                name: 'ListStationsScreen',
                options: {
                  bottomTab: {
                    text: 'Lista de Postos',
                    icon: require('../../asstes/list.png'),
                  },
                },
              },
            },
          ],
        },
      },
    });
  });
}
