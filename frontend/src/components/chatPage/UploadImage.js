import { storage } from '../../firebase'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Upload the image and return the URL function
export const uploadImage = async (file) => {
    if (!file) return null;
    // Create a file reference, named here with the file name and the current timestamp, making sure the file name is unique
    const fileRef = ref(storage, `images/${file.name}_${Date.now()}`);
    try {
        // upload files
        const snapshot = await uploadBytes(fileRef, file);
        // Gets and returns the URL of the file
        const url = await getDownloadURL(snapshot.ref);
        return url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}

export default uploadImage;