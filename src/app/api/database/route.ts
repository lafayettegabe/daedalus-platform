import { db } from '../../../../FirebaseAdmin';

import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    console.log('Request:', request);

    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');

    const userRef = db.collection('users').doc(uid as string);
    const userDoc = await userRef.get();
 
    if (userDoc.exists) {
        const userData = userDoc.data();
        console.log('User data:', userData);
        
        if (userData?.subscriptionStatus === true) {
            // User has subscriptionStatus equal to true, perform additional checks or actions
            console.log('User has subscription');
            return NextResponse.json({ hasSubscription: true }, { status: 200 }); // status: 200 means OK
        } else {
            // User does not have subscriptionStatus equal to true
            console.log('User does not have subscription');
            return NextResponse.json({ hasSubscription: false }, { status: 200 }); // status: 200 means OK
        }
    } else {
        console.log(uid, userRef, userDoc)
        console.log('User not found');
        return NextResponse.json({ error: 'User not found' }, { status: 404 }); // status: 404 means Not Found
    }
}

