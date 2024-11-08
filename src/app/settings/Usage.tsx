"use client";

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Use the correct import path

type PlanName = 'Free' | 'Pro' | 'Pay-As-You-Go';

interface UserData {
  usage: number;
  plan: PlanName;
  credits: number;
}

export const Usage = () => {
  const [, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData>({
    usage: 0,
    plan: 'Free',
    credits: 10,
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            usage: data.usage || 0,
            plan: data.plan || 'Free',
            credits: data.credits || 10,
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const planDetails: Record<PlanName, { description: string; credits: number }> = {
    Free: {
      description: "Basic PDF processing up to 10 credits",
      credits: 10,
    },
    Pro: {
      description: "Full PDF processing with 100 credits",
      credits: 100,
    },
    "Pay-As-You-Go": {
      description: "Flexible credits with no fixed limit",
      credits: Infinity,
    },
  };

  const usagePercentage = (userData.usage / userData.credits) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Usage Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Current Plan</label>
            <p className="text-lg">{userData.plan}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Credits Available</label>
            <p className="text-lg">{userData.credits}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Plan Details</label>
            <p className="text-lg">{planDetails[userData.plan].description}</p>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Usage</label>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{userData.usage} of {userData.credits} credits used</p>
          </div>
        </div>
      </div>
    </div>
  );
};