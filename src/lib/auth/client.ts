 
 
 
 
 
 
/* eslint-disable @typescript-eslint/no-explicit-any -- asda*/
/* eslint-disable no-console -- asdas*/
import type { User } from '@/types/user';
import { auth } from '../firebase/firebase-config';
import { type UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import userFirebase from '@/data/user';
import { type FirebaseError } from 'firebase/app';

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

  async signUp(_: SignUpParams): Promise<{ error?: FirebaseError }> {

    try {
      const newUser: UserCredential = await createUserWithEmailAndPassword(auth, _.email, _.password)
      await userFirebase.addNewUser({ id: newUser.user.uid, ..._ })
    } catch (error: any) {
      return { error };
    }

    return {};
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: FirebaseError }> {
    const { email, password } = params;
    try {

      await signInWithEmailAndPassword(auth, email, password)

      return {};
    } catch (error: any) {
      return { error };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {

    await auth.authStateReady();
    if (auth.currentUser) {
      const user = await userFirebase.getUser(auth.currentUser?.uid || '');
      console.log('auth.currentUser: ',auth.currentUser)
      console.log('user: ',user)
      return { data: user.data() };
    }
    return { data: null };
  }

  onUserState(callback: (user: any) => Promise<void>) {
    return onAuthStateChanged(auth, callback);
  }

  async signOut(): Promise<{ error?: string }> {
    await signOut(auth);
    //localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
