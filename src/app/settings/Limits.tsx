export const Limits = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">API Limits</h2>
          <div className="space-y-4">
            {[
              { name: 'Requests per minute', limit: '60', used: '23' },
              { name: 'Concurrent connections', limit: '10', used: '4' },
              { name: 'Max file size', limit: '100MB', used: '32MB' },
            ].map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium">{item.used} / {item.limit}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-[#D7524A] rounded-full"
                    style={{ width: `${(parseInt(item.used) / parseInt(item.limit)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Rate Limiting</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">Auto-blocking</span>
              <div className="w-11 h-6 bg-[#D7524A] rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-600">IP Whitelist</span>
              <button className="text-[#D7524A] hover:text-[#E2673F]">Configure</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  