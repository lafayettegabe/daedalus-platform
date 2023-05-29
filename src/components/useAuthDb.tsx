import { db } from '../../FirebaseAdmin';

interface User {
    uid: string;
    nome: string;
    email: string;
    subscriptionStatus: boolean;
    imageUrl: string;
}

async function authenticate(userData: User) {
  try {
    const userId = userData.uid;
    const userRef = db.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
        const userData = userSnapshot.data() as User;
        console.log("User data retrieved:", userData);
        return userData;
    } else {
        console.log("User data not found");
        // create the user in the database
        await userRef.set(userData);
        console.log("User data created:", userData);
        return userData;
    }
  } catch (error) {
        console.error("Error retrieving user data:", error);
        return null;
  }
}

export async function useAuthDb(authenticatedUser: User) {
    let userdb = null;
    let loading = true;
  
    if (authenticatedUser) {
        const userData: User = {
            uid: authenticatedUser.uid,
            nome: authenticatedUser.nome || '',
            email: authenticatedUser.email || '',
            subscriptionStatus: false,
            imageUrl: authenticatedUser.imageUrl || 'https://lh3.googleusercontent.com/a/AAcHTtdvDzsonOKvdYrssf-CEy-GGGQU-zGQlt4KT-3t=s96-c'
        };

        const userFromFirestore = await authenticate(userData);

        if (userFromFirestore) {
            console.log("User from Firestore:", userFromFirestore);
            userData.subscriptionStatus = userFromFirestore.subscriptionStatus;
        } else {
            console.log("Error retrieving user from Firestore");
        }
        
        userdb = userData;
    }
  
    loading = false;
  
    return { userdb };
  }