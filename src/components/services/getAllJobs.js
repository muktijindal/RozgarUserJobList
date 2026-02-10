export const getAllJobs = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ FIXED

    const res = await fetch("https://qa.api.rozgardwar.cloud/api/jobs/all-jobs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log("Jobs API Response:", data);

    return data.jobs || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
