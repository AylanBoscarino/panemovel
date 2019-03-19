import { Navigation } from 'react-native-navigation';

import HomeScreen from './HomeScreen';
import ListStationsScreen from './ListStationsScreen';
import provideRedux from '../redux/provideRedux';
import { primary, secondary, text } from '../constants/colors';

export default function registerNavigationStack() {
  Navigation.registerComponent('HomeScreen', () => provideRedux(HomeScreen));
  Navigation.registerComponent('ListStationsScreen', () =>
    provideRedux(ListStationsScreen)
  );

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          options: {
            

            bottomTabs: {
              // background: {
              //   color: primary.main,
              // },
              // title: {
              //   fontFamily: 'roboto',
              //   color: 'white',
              // }
              backgroundColor: primary.main,
            },

          },
          id: 'BottomTabs',
          children: [
            {
              component: {
                id: 'map',
                name: 'HomeScreen',
                options: {
                  statusBar: {
                    backgroundColor: primary.dark,
                  },
                  bottomTab: {
                    text: 'Página Inicial',
                    icon: require('../../asstes/map.png'),
                    iconColor: text.label,
                    selectedIconColor: secondary.light,
                    selectedTextColor: secondary.light,
                    selectedFontSize: 15,
                    fontFamily: 'roboto',
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      id: 'list',
                      name: 'ListStationsScreen',
                      options: {
                        statusBar: {
                          backgroundColor: primary.dark,
                        },
                        bottomTab: {
                          text: 'Lista de Postos',
                          icon: require('../../asstes/list.png'),
                          iconColor: text.label,
                          selectedIconColor: secondary.light,
                          selectedTextColor: secondary.light,
                          selectedFontSize: 15,
                          fontFamily: 'roboto',
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  });
}
