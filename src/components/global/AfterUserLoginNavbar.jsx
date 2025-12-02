import React from 'react'
import { Button } from '../ui/button'

export const AfterUserLoginNavbar = () => {
  return (
    <div>
            <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">i</div>
              <span className="font-semibold text-xl text-blue-600">naukri</span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <a className="hover:text-gray-900">
                Jobs <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-2">1</span>
              </a>
              <a>Companies</a>
              <a>Services</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                className="w-80 rounded-full border p-2 pl-4 text-sm shadow-sm"
                placeholder="Search jobs here"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                🔍
              </button>
            </div>

            <Button variant="outline">naukri 360</Button>
            <button className="p-2 rounded-full hover:bg-gray-100">🔔</button>
            <button className="p-2 rounded-full hover:bg-gray-100">☰</button>
            <div className="hidden md:block text-sm">
              Welcome, <span className="font-semibold">Rishab</span>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
