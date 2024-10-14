'use server';
import { createAdminClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

export default async function createSession(previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      error: 'Please fill out all fields!',
    };
  }

  // get account instatnce
  const { account } = await createAdminClient();

  try {
    //generate session
    const session = await account.createEmailPasswordSession(email, password);
    //Create cookie
    cookies().set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(session.expire),
      path: '/',
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log('Authentication Error:', error);
    return {
      error: `invalid credentials`,
    };
  }
}
