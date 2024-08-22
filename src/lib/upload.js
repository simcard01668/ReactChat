import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const upload = async (file) => {
  const date = new Date();
const storage = getStorage();
const storageRef = ref(storage, `image/${date + file.name}`);
const uploadTask = uploadBytesResumable(storageRef, file);

return new Promise((resolve, reject) => {

uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    
  }, 
  (error) => {
    reject('An error occurred: ', error);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve(downloadURL);

    });
  }
);
})
}

export default upload;