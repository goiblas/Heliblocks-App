import { storage } from "../firebase";

export async function uploadUserAvatar(uid, image) {
  const ref = storage.ref(`users/${uid}.jpg`);
  await ref.put(image);
  const url = await ref.getDownloadURL();

  return url;
}
