import { getCenter } from 'geolib';
import { LatLng } from 'react-native-maps';

export function getCenterPosition(start: LatLng, end: LatLng): LatLng {
  return getCenter([start, end]);
}

export function getInitials(nome: string) {
  const palavras = nome.split(' ');
  
  if (palavras.length > 1) {
    const nomeSobrenome: string[] = [palavras[0], palavras[1]];
    return `${nomeSobrenome[0][0]}${nomeSobrenome[1][0]}`.toUpperCase();
  }

  return nome[0].toUpperCase();
}