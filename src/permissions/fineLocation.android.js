import { PermissionsAndroid } from 'react-native';

export default async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Pane Seca Permissão Localização',
        message: `
        Pane Seca precisa acessar sua localização para 
        descobrir onde estão os postos de gasolina
        mais próximos de você
      `,
        buttonNeutral: 'Depois eu vejo',
        buttonNegative: 'Cancel',
        buttonPositive: 'Ok',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
