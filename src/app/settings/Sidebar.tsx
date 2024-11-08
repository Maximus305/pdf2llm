import { Settings, CreditCard, BarChart2, Shield, User, HelpCircle } from 'lucide-react';

// Define a type for the active items
type ActiveItemType = 'Account' | 'Plan' | 'Usage' | 'Billing' | 'Limits' | 'Questions';

type MenuItem = {
  label: ActiveItemType;
  icon: React.ElementType;
};

type SidebarProps = {
  activeItem: ActiveItemType;
  setActiveItem: (item: ActiveItemType) => void;
};

const sidebarItems: MenuItem[] = [
  { label: 'Account', icon: User },
  { label: 'Plan', icon: Shield },
  { label: 'Usage', icon: BarChart2 },
  { label: 'Billing', icon: CreditCard },
  { label: 'Limits', icon: Settings },
  { label: 'Questions', icon: HelpCircle },
];

export const Sidebar = ({ activeItem, setActiveItem }: SidebarProps) => {
  return (
    <div className="w-64 min-h-screen">
      <div className="px-3 py-6">
        <nav>
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setActiveItem(item.label)}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors
                    ${activeItem === item.label 
                      ? 'bg-[#D7524A] text-white' 
                      : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <item.icon className={`h-5 w-5 mr-3
                    ${activeItem === item.label ? 'text-white' : 'text-gray-400'}`} 
                  />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};