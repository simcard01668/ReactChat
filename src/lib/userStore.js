import {create} from 'zustand';
import {db} from './firebase';
import {doc, getDoc} from 'firebase/firestore';


export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
      if (!uid) return set({ currentUser: null, isLoading: false });
  
      try {
        const docRef = doc(db, "users", uid);
        console.log(docRef)
        const docSnap = await getDoc(docRef);

        console.log(docSnap)
        console.log(docSnap.exists())
        if (docSnap.exists()) {
          set({ currentUser: docSnap.data(), isLoading: false });
        } else {
          set({ currentUser: null, isLoading: false });
        }
      } catch (err) {
        console.log(err);
        return set({ currentUser: null, isLoading: false });
      }
    },
  }));