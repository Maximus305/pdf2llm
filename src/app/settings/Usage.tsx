export const Usage = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">API Usage</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">API Calls</span>
                <span className="font-medium">8,542 / 10,000</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-[#D7524A] rounded-full w-4/5"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Storage</span>
                <span className="font-medium">432MB / 1GB</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-[#D7524A] rounded-full w-2/5"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Usage History</h2>
          <div className="space-y-3">
            {[
              { date: 'Today', calls: '856 calls' },
              { date: 'Yesterday', calls: '1,204 calls' },
              { date: 'Last 7 days', calls: '5,324 calls' },
            ].map((item) => (
              <div key={item.date} className="flex justify-between py-2 border-b">
                <span className="text-gray-600">{item.date}</span>
                <span className="font-medium">{item.calls}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };