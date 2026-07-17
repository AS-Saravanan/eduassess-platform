import React, { createContext, useEffect, useState } from "react";
import { User, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

export interface StudentProfileData {
  fullName: string;
  board: string;
  grade: string;
  schoolName: string;
  academicYear: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  studentProfile: StudentProfileData | null;
  setStudentProfile: (profile: StudentProfileData | null) => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [studentProfile, setStudentProfile] = useState<StudentProfileData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error?.code === "auth/popup-closed-by-user") {
        console.warn("Google Sign-In popup closed by user.");
      } else {
        console.error("Error signing in with Google:", error);
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, studentProfile, setStudentProfile, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
