// app/settings/Sidebar.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, CreditCard, BarChart2, Shield, User, HelpCircle } from 'lucide-react';

type ActiveItemType = 'Account' | 'Plan' | 'Usage' | 'Billing' | 'Limits' | 'Questions';

type MenuItem = {
  label: ActiveItemType;
  icon: React.ElementType;
  href: string;
};

const sidebarItems: MenuItem[] = [
  { label: 'Account', icon: User, href: '/settings/account' },
  { label: 'Plan', icon: Shield, href: '/settings/plan' },
  { label: 'Usage', icon: BarChart2, href: '/settings/usage' },
  { label: 'Billing', icon: CreditCard, href: '/settings/billing' },
  { label: 'Limits', icon: Settings, href: '/settings/limits' },
  { label: 'Questions', icon: HelpCircle, href: '/settings/questions' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const currentPath = pathname.split('/').pop();
  const activeItem = currentPath ? 
    (currentPath.charAt(0).toUpperCase() + currentPath.slice(1)) as ActiveItemType : 
    'Account';

  return (
    <div className="w-64 min-h-screen">
      <div className="px-3 py-6">
        <nav>
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-colors
                    ${activeItem === item.label 
                      ? 'bg-[#D7524A] text-white' 
                      : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <item.icon className={`h-5 w-5 mr-3
                    ${activeItem === item.label ? 'text-white' : 'text-gray-400'}`} 
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};