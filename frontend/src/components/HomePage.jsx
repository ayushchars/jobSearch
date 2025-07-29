import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { filterJobs, getInitials } from "../utils/utils";
import IsLoadingHOC from "../utils/IsLoadingHOC";
import { toast } from "react-toastify";
function HomePage({setLoading}) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();


const fetchData = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`${baseUrl}/api/jobs`);
    
    setJobs(res?.data?.data);
  } catch (err) {
    toast.error(
      err.response?.data?.error || "Could not fetch jobs from server."
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);

  const filteredJobs = filterJobs(jobs, search);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <nav className="bg-white px-6 py-3 shadow-sm flex items-center justify-between">
        <span className="font-bold text-xl text-blue-700">JobBoard</span>
        <div>
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium mr-4"
          >
            Home
          </Link>
          <Link

            to="/add-job"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Job
          </Link>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Jobs</h1>
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search jobs by title or location"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredJobs?.length === 0 ? (
          <div className="text-center text-gray-500">No jobs found.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs?.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 flex flex-col cursor-pointer"
              onClick={()=> navigate(`/job/${job._id}`)}
              >
                <div className="w-12 h-12 mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {getInitials(job.company)}
                </div>
                <Link
                  to={`/job/${job._id}`}
                  className="text-lg font-semibold text-blue-700 "
                >
                  {job.title}
                </Link>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span>{job.company}</span>
                  <span className="mx-2">•</span>
                  <span>{job.location}</span>
                </div>
                <span
                  className={`inline-block w-max mt-2 px-2 py-1 rounded ${job.type === "Full-time"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                    } text-xs font-medium`}
                >
                  {job.type}
                </span>
                <p className="text-gray-700 mt-2 line-clamp-2">
                  {job.description}
                </p>
                <Link
                  to={`/job/${job._id}`}
                  className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>


    </div>
  );
}

export default IsLoadingHOC(HomePage);
