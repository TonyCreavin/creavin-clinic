import firebaseApp from '@/config/firebase';
import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';

export const uploadFileToFirebaseAndReturnUrl = async (file: File) => {
  try {
    const storageRef = ref(getStorage(firebaseApp), `files/${file.name}`);
    const uploadFile = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(uploadFile.ref);
    return url;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
