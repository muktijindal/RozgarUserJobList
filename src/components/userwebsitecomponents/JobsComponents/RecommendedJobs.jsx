import React from 'react'
import { JobCard } from './JobsCard'
import { RecommendedHeader } from './RecoomendedHeader'
import { AddJobPreference } from './AddJobPreference'
import { RecommendedJobsSection } from './RecommendedJobsSection'

export const RecommendedJobs = () => {
  return (
    <div>
        {/* <RecommendedHeader /> */}
        <div className='flex'>
        {/* <JobCard />
<AddJobPreference /> */}
<RecommendedJobsSection />
        </div>
    </div>
  )
}
