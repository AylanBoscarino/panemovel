import { Navigation } from 'react-native-navigation';

import HomeScreen from './HomeScreen';
import ListStationsScreen from './ListStationsScreen';
import provideRedux from '../redux/provideRedux';

export default function registerNavigationStack() {
  Navigation.registerComponent('HomeScreen', () => provideRedux(HomeScreen));
  Navigation.registerComponent('ListStationsScreen', () => provideRedux(ListStationsScreen));

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
