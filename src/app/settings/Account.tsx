"use client";

import { LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, updateProfile, signOut, User } from 'firebase/auth'; // Import User type
import { useRouter } from 'next/navigation'; // Changed to Next.js router since this is a "use client" component

// Custom Toast Component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {message}
    </div>
  );
};

export const Account = () => {
  const router = useRouter(); // Using Next.js router instead
  const [user, setUser] = useState<User | null>(null); // Use User type from Firebase
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        const [first, last] = currentUser.displayName.split(' ');
        setFirstName(first || '');
        setLastName(last || '');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      setIsUpdating(true);
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`.trim()
      });
      setToast({ message: 'Profile updated successfully', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to update profile', type: 'error' });
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setToast({ message: 'Logged out successfully', type: 'success' });
      router.push('/sign-in'); // Using Next.js router push instead of navigate
    } catch (error) {
      setToast({ message: 'Failed to log out', type: 'error' });
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">First Name</label>
            <input 
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D7524A]/20 focus:border-[#D7524A]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Last Name</label>
            <input 
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D7524A]/20 focus:border-[#D7524A]"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Email</label>
            <input 
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-500"
            />
            <p className="text-sm text-gray-500 mt-1.5">
              Email changes are managed through your authentication provider
            </p>
          </div>
          <button
            onClick={handleUpdateProfile}
            disabled={isUpdating}
            className="w-full px-4 py-2 bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white rounded-md hover:opacity-90 disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Session</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
          <div className="flex items-center text-gray-600">
            <LogOut className="w-5 h-5 mr-2" />
            End your current session
          </div>
          <button 
            className="px-4 py-2 text-[#D7524A] hover:bg-red-50 rounded-md transition-colors"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};