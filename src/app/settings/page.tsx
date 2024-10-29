"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

const SAMPLE_DATA = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com"
};

const gradientButtonStyle = "bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-48 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/images/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-semibold">PDF2LLM.AI</span>
          </div>
          <div className="space-y-2">
            <Link 
              href="/home" 
              className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95"
            >
              Dashboard
            </Link>
            <Link 
              href="/api" 
              className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95"
            >
              API
            </Link>
            <Link 
              href="/api-key" 
              className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95"
            >
              API Key
            </Link>
            <Link 
              href="/settings" 
              className={`${gradientButtonStyle} rounded px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95`}
            >
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto p-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Account Settings</h1>
            <Button variant="default" className="bg-black text-white hover:bg-gray-800">
              Save Changes
            </Button>
          </div>

          <div className="space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="firstName">
                  First Name
                </label>
                <Input 
                  id="firstName" 
                  defaultValue={SAMPLE_DATA.firstName}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="lastName">
                  Last Name
                </label>
                <Input 
                  id="lastName" 
                  defaultValue={SAMPLE_DATA.lastName}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email Settings */}
            <div className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-semibold">Email Settings</h2>
              <div className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    defaultValue={SAMPLE_DATA.email}
                    placeholder="Enter your email"
                  />
                </div>
                <Button variant="outline" className="mb-0.5">
                  Change
                </Button>
              </div>
            </div>

            {/* Chat Model Settings */}
            <div className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-semibold">Default Chat Model</h2>
              <Select defaultValue="gpt-3.5">
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Credits Section */}
            <div className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-semibold">Credits</h2>
              <div className="flex gap-4 items-center">
                <div className="flex-1 bg-gray-100 p-3 rounded-md">
                  <span className="text-sm text-gray-600">Credits left:</span>{" "}
                  <span className="font-medium">50 credits</span>
                </div>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Acquire more
                </Button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 border border-red-200 rounded-lg p-6 space-y-4">
              <div className="space-y-2">
                <h2 className="text-red-500 font-semibold">DANGER ZONE</h2>
                <p className="text-sm text-gray-600">Irreversible and destructive actions</p>
              </div>
              <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}