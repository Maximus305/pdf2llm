"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { auth, db } from '@/lib/firebase';
import { updateProfile, User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserIcon, MailIcon, Bell, Loader2, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CustomToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      } text-white`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4">
          &times;
        </button>
      </div>
    </div>
  );
};

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  credits: number;
};

type ToastState = {
  open: boolean;
  message: string;
  type: 'success' | 'error';
};

const gradientButtonStyle = "bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90";

export default function SettingsPage() {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    credits: 0,
  });
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    type: 'success'
  });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        await loadUserData(user);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ open: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, open: false }));
    }, 3000);
  };

  const loadUserData = async (user: User) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        setUserData({
          firstName: data.firstName || user.displayName?.split(" ")[0] || '',
          lastName: data.lastName || user.displayName?.split(" ")[1] || '',
          email: user.email || '',
          credits: data.credits || 10, // Default to 10 if not set
        });
      } else {
        const newUserData = {
          firstName: user.displayName?.split(" ")[0] || '',
          lastName: user.displayName?.split(" ")[1] || '',
          email: user.email || '',
          credits: 10, // Initialize with 10 credits
        };
        await setDoc(userDocRef, newUserData);
        setUserData(newUserData);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      showToast("Failed to load user data", "error");
    }
  };

  const handleSaveChanges = async () => {
    if (!authUser) return;

    setIsSaving(true);
    try {
      await updateProfile(authUser, {
        displayName: `${userData.firstName} ${userData.lastName}`
      });

      const userDocRef = doc(db, 'users', authUser.uid);
      await setDoc(userDocRef, {
        ...userData,
        updatedAt: new Date(),
      }, { merge: true });

      showToast("Settings saved successfully", "success");
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast("Failed to save changes", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-48 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
        <div className="p-4 flex-grow">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/images/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-semibold">PDF2LLM.AI</span>
          </div>
          <div className="space-y-2">
            <Link href="/dashboard" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              Dashboard
            </Link>
            <Link href="/api" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              API
            </Link>
            <Link href="/api-key" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              API Key
            </Link>
            <Link href="/credits" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              Credits
            </Link>
          </div>
        </div>
        {/* Settings at bottom */}
        <div className="p-4 border-t border-gray-200">
          <Link href="/settings" className={`${gradientButtonStyle} rounded px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95 flex items-center gap-2`}>
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-gray-600 mt-2">Manage your account preferences and settings</p>
              </div>
              <Button
                onClick={handleSaveChanges}
                className={`${gradientButtonStyle} px-6`}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5 text-gray-500" />
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="firstName">
                    First Name
                  </label>
                  <Input 
                    id="firstName" 
                    value={userData.firstName}
                    onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="border-gray-200 focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="lastName">
                    Last Name
                  </label>
                  <Input 
                    id="lastName" 
                    value={userData.lastName}
                    onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="border-gray-200 focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Email Settings */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <MailIcon className="w-5 h-5 text-gray-500" />
                  <h2 className="text-xl font-semibold">Email Settings</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="email">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    value={userData.email}
                    readOnly
                    className="bg-gray-50 border-gray-200"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Email changes are managed through your authentication provider
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Credits Management */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <h2 className="text-xl font-semibold">Credits Management</h2>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Available Credits
                  </label>
                  <Input 
                    value={userData.credits.toString()}
                    readOnly
                    className="bg-gray-50 border-gray-200"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Credits are used for processing and API access.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <h2 className="text-xl font-semibold">Notification Preferences</h2>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Notification settings coming soon. Stay tuned for updates!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Custom Toast */}
      {toast.open && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      )}
    </div>
  );
}