'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '../../Firebase' // Initialize Firebase auth and Firestore instances
import { collection } from '@firebase/firestore';
import { addDoc, doc, getDoc, setDoc } from 'firebase/firestore';

interface User {
    uid: string;
    nome: string;
    email: string;
    subscriptionStatus: boolean;
    imageUrl: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: any) => {
        if (firebaseUser) {
            const userData: User = {
                uid: firebaseUser.uid,
                nome: firebaseUser.displayName || '',
                email: firebaseUser.email || '',
                subscriptionStatus: false,
                imageUrl: firebaseUser.photoURL || 'https://lh3.googleusercontent.com/a/AAcHTtdvDzsonOKvdYrssf-CEy-GGGQU-zGQlt4KT-3t=s96-c'
            };
        
            try {
                console.log('Adding user to Firestore database...');
                const usersCollectionRef = collection(db, 'users');

                // Check if the user exists in the Firestore database
                const q = await getDoc(doc(usersCollectionRef, firebaseUser.uid));
                if (!q.exists()) {
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    await setDoc(userDocRef, userData); // add the user to the Firestore database if they don't exist
                }

                // Get the user document from the Firestore database
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                
                // Get the subscriptionStatus from the Firestore database
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const userDataFromFirestore = docSnap.data() as User;
                    userData.subscriptionStatus = userDataFromFirestore.subscriptionStatus;
                } else {
                    console.log('No such document!');
                }
            } catch (e) {
            console.error('Error adding document:', e);
            }    

            setUser(userData);
        } else {
            setUser(null);
        }
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}