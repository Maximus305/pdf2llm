export const Billing = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <div className="w-10 h-6 bg-gray-200 rounded mr-3"></div>
              <div>
                <div className="font-medium">•••• 4242</div>
                <div className="text-sm text-gray-600">Expires 12/24</div>
              </div>
            </div>
            <button className="text-[#D7524A] hover:text-[#E2673F]">Update</button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Billing History</h2>
          <div className="space-y-3">
            {[
              { date: 'Oct 1, 2023', amount: '$49.00', status: 'Paid' },
              { date: 'Sep 1, 2023', amount: '$49.00', status: 'Paid' },
              { date: 'Aug 1, 2023', amount: '$49.00', status: 'Paid' },
            ].map((item) => (
              <div key={item.date} className="flex justify-between py-2 border-b">
                <span className="text-gray-600">{item.date}</span>
                <div>
                  <span className="font-medium mr-4">{item.amount}</span>
                  <span className="text-green-500">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  