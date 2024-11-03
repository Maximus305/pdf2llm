"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';
import { auth, db } from '@/lib/firebase'; // Ensure auth is correctly set up in firebaseConfig.js
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Define a type for the user data
type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  chatModel: string;
};

const gradientButtonStyle = "bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90";

export default function SettingsPage() {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    chatModel: 'gpt-3.5', // Default chat model
  });
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    // Set up Firebase Auth listener to get current user info
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
        // Load data from Firebase Auth
        setUserData({
          firstName: user.displayName?.split(" ")[0] || '',
          lastName: user.displayName?.split(" ")[1] || '',
          email: user.email || '',
          chatModel: 'gpt-3.5', // You can default this or load from Firestore if preferred
        });
        loadAdditionalSettings(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // Load additional settings (e.g., chat model) from Firestore
  const loadAdditionalSettings = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserData((prevData) => ({ ...prevData, ...userDoc.data() as UserData }));
      }
    } catch (error) {
      console.error('Error loading additional settings:', error);
    }
  };

  // Handle saving changes to Firebase Authentication profile and Firestore
  const handleSaveChanges = async () => {
    try {
      // Update Firebase Auth profile
      if (authUser) {
        await updateProfile(authUser, {
          displayName: `${userData.firstName} ${userData.lastName}`
        });
        console.log('Auth profile updated successfully');
      }

      // Save chat model or other additional data to Firestore
      await updateDoc(doc(db, 'users', authUser.uid), {
        chatModel: userData.chatModel
      });
      console.log('User data updated in Firestore');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle input changes for name fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle chat model selection change
  const handleModelChange = (value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      chatModel: value,
    }));
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-48 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/images/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-semibold">PDF2LLM.AI</span>
          </div>
          <div className="space-y-2">
            <Link href="/home" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              Dashboard
            </Link>
            <Link href="/api" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              API
            </Link>
            <Link href="/api-key" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              API Key
            </Link>
            <Link href="/settings" className={`${gradientButtonStyle} rounded px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95`}>
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Account Settings</h1>
            <Button variant="default" className="bg-black text-white hover:bg-gray-800" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>

          <div className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="firstName">
                  First Name
                </label>
                <Input 
                  id="firstName" 
                  value={userData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="lastName">
                  Last Name
                </label>
                <Input 
                  id="lastName" 
                  value={userData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email Settings */}
            <div className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-semibold">Email Settings</h2>
              <div className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    value={userData.email}
                    readOnly
                    placeholder="Your email is managed by Firebase"
                  />
                </div>
              </div>
            </div>

            {/* Chat Model Settings */}
            <div className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-semibold">Default Chat Model</h2>
              <Select value={userData.chatModel} onValueChange={handleModelChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
