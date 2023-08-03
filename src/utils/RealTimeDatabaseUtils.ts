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

export async function getRestrauntList(): Promise<
  {title: string; address: string; latitude: number; longitude: number}[] | null
> {
  const db = database().ref('/restraunt');

  const snapshotValue = await db.once('value').then(snapshot => snapshot.val());

  if (snapshotValue) {
    return Object.keys(snapshotValue).map(key => snapshotValue[key]);
  } else {
    return null;
  }
}
