import React from 'react'
import { Card } from '../ui/card'

export const ResumeHeadlines = () => {
  return (
    <div>       {/* Right column */}
    <aside className="lg:col-span-3 space-y-6">
      <Card className="p-4 rounded-xl">
        <h4 className="font-semibold">Resume headline</h4>
        <p className="text-sm text-gray-500 mt-2">
        Add a summary of your resume to introduce yourself to recruiters
        </p>
      </Card>

      <Card className="p-4 rounded-xl">
        <h4 className="font-semibold">Alerts</h4>
        <p className="text-sm text-gray-500 mt-2">
          Get notifications for new jobs
        </p>
      </Card>
    </aside></div>
  )
}
