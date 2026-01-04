export const getAllSavedJobs = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(
        "http://147.93.72.227:5000/api/savejob/get/saved",
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
      return data?.jobs || data?.AllJobs || [];
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      return [];
    }
  };
  


//   export const getAllUnSavedJobs = async () => {
//     try {
//       const token = localStorage.getItem("token"); // ✅ FIXED
  
//       const res = await fetch("http://147.93.72.227:5000/api/savejob/get/saved'", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });
  
//       const data = await res.json();
//       console.log("Jobs API Response:", data);
  
//       return data?.AllJobs || [];
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       return [];
//     }
//   };
  
  