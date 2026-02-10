import JobDetailPage from "./JobDetailPage";


const extractIdFromSlug = (slug) => {
    const parts = slug.split("-");
    return parts[parts.length - 1];
  };
  
  export default async function JobDetailsPage({ params }) {
    const jobId = extractIdFromSlug(params.slug);
  
    const res = await fetch(
      `https://qa.api.rozgardwar.cloud/api/jobs/${jobId}`,
      { cache: "no-store" }
    );
  
    const text = await res.text(); // 👈 IMPORTANT
  
    let job = {};
    try {
      job = JSON.parse(text);
    } catch (e) {
      console.log("API returned HTML instead of JSON");
    }
  
    return (
    <div>
        <JobDetailPage />
    </div>
    );
  }
  