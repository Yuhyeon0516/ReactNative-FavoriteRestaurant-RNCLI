import database from '@react-native-firebase/database';
export async function saveNewRestraunt(params: {
  title: string;
  address: string;
  latitude: number;
  longitude: number;
}) {
  const db = database().ref('/restraunt');
  const saveItem = {
    title: params.title,
    address: params.address,
    latitude: params.latitude,
    longitude: params.longitude,
  };

  await db.push().set({...saveItem});
}
