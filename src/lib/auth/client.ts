/* eslint-disable @typescript-eslint/use-unknown-in-catch-callback-variable -- asd*/
/* eslint-disable @typescript-eslint/no-confusing-void-expression -- asd */
/* eslint-disable @typescript-eslint/no-unsafe-member-access  -- asd*/
/* eslint-disable @typescript-eslint/no-unsafe-call  -- asd*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment  -- asd*/
/* eslint-disable @typescript-eslint/no-invalid-void-type -- asd*/
/* eslint-disable @typescript-eslint/no-explicit-any -- asda*/
/* eslint-disable no-console -- asdas*/
import type { User } from '@/types/user';
import { auth } from '../firebase/firebase-config';
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import userFirebase from '@/data/user'; 


function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

//const user = {
//  id: 'USR-000',
//  avatar: '/assets/avatar.png',
//  firstName: 'Sofia',
//  lastName: 'Rivers',
//  email: 'sofia@devias.io',
//} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(_: SignUpParams): Promise<{ error?: string }> {

   

    // Make API request
    const newUser: UserCredential = await createUserWithEmailAndPassword(auth, _.email, _.password)

    const newUserData = await userFirebase.addNewUser({ id: newUser.user.uid, ..._ })

    console.log('newUsernewUser', newUserData)
    // We do not handle the API, so we'll just generate a token and store it in localStorage.
    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    // Make API request

    // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    //if (email !== 'sofia@devias.io' || password !== 'Secret1') {
    //  return { error: 'Invalid credentials' };
    //}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call -- teste

    // await setPersistence(auth, browserSessionPersistence)
    

    try {

      const userCred = await signInWithEmailAndPassword(auth, email, password)


      // eslint-disable-next-line no-console -- teste
      console.log('userCred - >', userCred);

      //const token = generateToken();

      const token = await userCred.user.getIdToken();

      localStorage.setItem('custom-auth-token', token);

      return {};
    } catch (error: any) {
      console.log('error.codeerror.code ', error.code)
      return { error: error.code };
      // console.log("error:anyerror:any ",error)
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {

    const token = localStorage.getItem('custom-auth-token');

 

    //verifySessionCookie
    console.log('auth.currentUser ', auth.currentUser)

    if(auth.currentUser){
     const user = await userFirebase.getUser(auth.currentUser?.uid || '');
      console.log('useruser ->',user.data());

      return { data: user.data() };
    }
   

    if (!token) {
      return { data: null };
    }

    return { data: {} };
    // eslint-disable-next-line no-console -- a

  }

  async signOut(): Promise<{ error?: string }> {
    await signOut(auth);
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
