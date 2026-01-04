export const getAllAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(
        "http://147.93.72.227:5000/api/jobs/applications/user/all-applied/jobs",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
  
      const data = await res.json();
  
      console.log("✅ Jobs API Response:", data);
      console.log("✅ Applied Jobs Array:", data.jobs);
  
      // 🔥 FIX IS HERE
      return data?.jobs || [];
    } catch (error) {
      console.error("❌ Error fetching applied jobs:", error);
      return [];
    }
  };
  