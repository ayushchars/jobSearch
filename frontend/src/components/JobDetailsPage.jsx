import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getInitials } from "../utils/utils";
import IsLoadingHOC from "../utils/IsLoadingHOC";

function JobDetailsPage({setLoading}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/api/jobs/${id}`);
        if (res.data?.status === 1) {
          setJob(res.data.data);
        } else {
          toast.error(res.data?.message || "Job not found.");
          setJob(null);
        }
      } catch (err) {
        console.log(
          err.response?.data?.message || "Could not fetch job from server."
        );
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    if (job === null) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [job, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <nav className="bg-white px-6 py-3 shadow-sm flex items-center justify-between">
        <span className="font-bold text-xl text-blue-700">JobBoard</span>
        <div>
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium mr-4">
            Home
          </Link>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow">
        {job && 
          <button
          className="text-blue-600 font-medium mb-3 cursor-pointer "
          onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          }
          {!job ? (
            <div className="text-center text-gray-500 text-xl">
              Job not found.
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {getInitials(job.company)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                  <div className="text-gray-500 flex items-center text-sm">
                    <span>{job.company}</span>
                    <span className="mx-2">•</span>
                    <span>{job.location}</span>
                    <span className="mx-2">•</span>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${job.type === "Full-time"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {job.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Posted on: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "Unknown"}
              </div>
              <div className="mt-6 text-gray-800">
                <h2 className="text-lg font-semibold mb-2">Job Description</h2>
                <p>{job.description}</p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default IsLoadingHOC(JobDetailsPage);
