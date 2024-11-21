import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const Plan = () => {
  const [, setUser] = useState<User | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string>('Free');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentPlan(userData.plan || 'Free');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-semibold mb-6">Current Plan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <div className={`relative bg-white rounded-lg border ${
            currentPlan === 'Free' ? 'border-[#D7524A]' : 'border-gray-200'
<<<<<<< HEAD
          } p-6 flex flex-col`}>
            <div className="flex-grow">
              <h3 className="text-lg font-medium mb-2">Free Plan</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-sm text-gray-600">10 credits</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Basic PDF processing up to 10 credits</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Limited API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Standard support</span>
                </li>
              </ul>
            </div>
            <button 
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors mt-6
=======
          } p-6`}>
            <h3 className="text-lg font-medium mb-2">Free Plan</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-sm text-gray-600">10 credits</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Basic PDF processing up to 10 credits</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Limited API access</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Standard support</span>
              </li>
            </ul>
            <button 
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors
>>>>>>> 0c965b3 (Crazy update)
                ${currentPlan === 'Free' 
                  ? 'bg-gray-100 text-gray-700 cursor-default'
                  : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
            >
              {currentPlan === 'Free' ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>

          {/* Pro Plan */}
          <div className={`relative bg-white rounded-lg border ${
            currentPlan === 'Pro' ? 'border-[#D7524A]' : 'border-gray-200'
<<<<<<< HEAD
          } p-6 flex flex-col`}>
            <div className="flex-grow">
              <div className="absolute -top-2.5 left-6 bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                Recommended
              </div>
              <h3 className="text-lg font-medium mb-2">Pro Plan</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">$5</span>
                <span className="text-sm text-gray-600">100 credits</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Full PDF processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Unlimited API access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Credit rollover up to 50</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Advanced features</span>
                </li>
              </ul>
            </div>
            <button 
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors mt-6
=======
          } p-6`}>
            <div className="absolute -top-2.5 left-6 bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
              Recommended
            </div>
            <h3 className="text-lg font-medium mb-2">Pro Plan</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold">$5</span>
              <span className="text-sm text-gray-600">100 credits</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Full PDF processing</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Unlimited API access</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Credit rollover up to 50</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Advanced features</span>
              </li>
            </ul>
            <button 
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors
>>>>>>> 0c965b3 (Crazy update)
                ${currentPlan === 'Pro'
                  ? 'bg-gray-100 text-gray-700 cursor-default'
                  : 'bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90'
                }`}
            >
              {currentPlan === 'Pro' ? 'Current Plan' : 'Upgrade to Pro'}
            </button>
          </div>

          {/* Pay As You Go */}
          <div className={`relative bg-white rounded-lg border ${
            currentPlan === 'Pay-As-You-Go' ? 'border-[#D7524A]' : 'border-gray-200'
<<<<<<< HEAD
          } p-6 flex flex-col`}>
            <div className="flex-grow">
              <h3 className="text-lg font-medium mb-2">Pay-As-You-Go</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-gray-600">From</span>
                <span className="text-3xl font-bold">$2</span>
                <span className="text-sm text-gray-600">Flexible credits</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Full PDF processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Flexible API usage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Credits valid for 6 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Volume discounts</span>
                </li>
              </ul>
            </div>
            <button 
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors mt-6
=======
          } p-6`}>
            <h3 className="text-lg font-medium mb-2">Pay-As-You-Go</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-sm text-gray-600">From</span>
              <span className="text-3xl font-bold">$2</span>
              <span className="text-sm text-gray-600">Flexible credits</span>
            </div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Full PDF processing</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Flexible API usage</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Credits valid for 6 months</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#D7524A] mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">Volume discounts</span>
              </li>
            </ul>
            <button 
              className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors
>>>>>>> 0c965b3 (Crazy update)
                ${currentPlan === 'Pay-As-You-Go'
                  ? 'bg-gray-100 text-gray-700 cursor-default'
                  : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
            >
              {currentPlan === 'Pay-As-You-Go' ? 'Current Plan' : 'Buy Credits'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Need help choosing?</h2>
            <p className="text-sm text-gray-600 mt-1">
              Compare our plans or contact our team for a custom solution.
            </p>
          </div>
          <button className="px-4 py-2 text-sm text-[#D7524A] hover:bg-red-50 rounded-md transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plan;