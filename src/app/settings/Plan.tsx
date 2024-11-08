import { Check } from 'lucide-react';

export const Plan = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan Card */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium">Free Plan</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">$0</span>
              <span className="ml-1 text-sm text-gray-500">10 credits</span>
            </div>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Basic PDF processing up to 10 credits</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Limited API access</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Standard support</span>
              </li>
            </ul>
            <button className="mt-6 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Current Plan
            </button>
          </div>

          {/* Pro Plan Card */}
          <div className="border rounded-lg p-6 border-[#D7524A] relative">
            <div className="absolute -top-3 left-6 bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
              Recommended
            </div>
            <h3 className="text-lg font-medium">Pro Plan</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">$5</span>
              <span className="ml-1 text-sm text-gray-500">100 credits</span>
            </div>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Full PDF processing</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Unlimited API access</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Credit rollover up to 50</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Advanced features</span>
              </li>
            </ul>
            <button className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white rounded-md hover:opacity-90">
              Upgrade to Pro
            </button>
          </div>

          {/* Pay As You Go Card */}
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-medium">Pay-As-You-Go</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">From $2</span>
              <span className="ml-1 text-sm text-gray-500">Flexible credits</span>
            </div>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Full PDF processing</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Flexible API usage</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Priority support</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Credits valid for 6 months</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-[#D7524A] mr-2" />
                <span className="text-gray-600">Volume discounts</span>
              </li>
            </ul>
            <button className="mt-6 w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
              Buy Credits
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Need help choosing?</h2>
            <p className="text-gray-600 mt-1">Compare our plans or contact our team for a custom solution.</p>
          </div>
          <button className="px-4 py-2 text-[#D7524A] hover:bg-red-50 rounded-md transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plan;