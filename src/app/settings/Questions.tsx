export const Questions = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I reset my API key?', a: 'You can reset your API key from the Account settings page.' },
              { q: 'What happens if I exceed my plan limits?', a: 'You\'ll receive a notification and requests will be queued.' },
              { q: 'How do I upgrade my plan?', a: 'Visit the Plan page to see available options and upgrade.' },
            ].map((item) => (
              <div key={item.q} className="p-4 bg-gray-50 rounded-md">
                <div className="font-medium mb-2">{item.q}</div>
                <div className="text-gray-600">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white rounded-md hover:opacity-90">
              Contact Support
            </button>
            <button className="w-full px-4 py-2 border rounded-md hover:bg-gray-50">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    );
  };