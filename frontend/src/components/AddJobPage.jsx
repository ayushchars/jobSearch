import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import IsLoadingHOC from "../utils/IsLoadingHOC";
import { toast } from "react-toastify";

const jobTypes = ["Full-time", "Part-time"];

function AddJobPage({setLoading}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    company: "",
    type: "Full-time",
    location: "",
    description: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});
const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const validate = () => {
    let newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.company.trim()) newErrors.company = "Company is required";
    if (!form.type.trim()) newErrors.type = "Type is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErr = validate();
    if (Object.keys(validationErr).length) {
      setErrors(validationErr);
      return;
    }
    setLoading(true)

   try {
    const res = await axios.post(`${baseUrl}/api/jobs`, form);

    if (res.data?.status === 1) {
      toast.success(res?.data?.message);
      navigate("/");
    } else {
      toast.error(res.data?.message || "Something went wrong.");
    }
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Failed to submit job, please try again."
    );
  } finally {
    setLoading(false);
  }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <nav className="bg-white px-6 py-3 shadow-sm flex items-center justify-between">
        <span className="font-bold text-xl text-blue-700">JobBoard</span>
        <div>
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium mr-4">Home</Link>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 border border-blue-100 mt-10 mb-8">
          <h2 className="text-xl font-bold text-center text-blue-700 mb-4">
            Add a New Job
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Job Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border ${errors.title ? "border-red-400" : "border-gray-200"} focus:ring-1 focus:ring-blue-300 bg-blue-50/60 shadow-sm outline-none text-sm`}
                placeholder="Frontend Developer"
                autoComplete="off"
              />
              {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Company Name
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border ${errors.company ? "border-red-400" : "border-gray-200"} focus:ring-1 focus:ring-blue-300 bg-blue-50/60 shadow-sm outline-none text-sm`}
                placeholder="Knovator"
              />
              {errors.company && <span className="text-red-500 text-xs">{errors.company}</span>}
            </div>
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-1 text-sm">Job Type</label>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full px-3 py-2 text-left rounded-lg border ${errors.type ? "border-red-400" : "border-gray-200"
                  } bg-blue-50/60 shadow-sm text-sm focus:ring-1 focus:ring-blue-300 outline-none`}
              >
                {form.type || "Select job type"}
              </button>

              {dropdownOpen && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md text-sm">
                  {jobTypes.map((type) => (
                    <li
                      key={type}
                      onClick={() => {
                        setForm({ ...form, type });
                        setDropdownOpen(false);
                        setErrors({ ...errors, type: "" });
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              )}

              {errors.type && <span className="text-red-500 text-xs">{errors.type}</span>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border ${errors.location ? "border-red-400" : "border-gray-200"} focus:ring-1 focus:ring-blue-300 bg-blue-50/60 shadow-sm outline-none text-sm`}
                placeholder="Noida, Remote"
              />
              {errors.location && <span className="text-red-500 text-xs">{errors.location}</span>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border ${errors.description ? "border-red-400" : "border-gray-200"} focus:ring-1 focus:ring-blue-300 bg-blue-50/60 shadow-sm outline-none text-sm`}
                rows={3}
                placeholder="Responsibilities, skills, etc."
              />
              {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow transition disabled:opacity-60 mt-1 text-sm"
            >
              Post Job
            </button>
          </form>
        </div>
      </main>

    </div>
  );
}

export default IsLoadingHOC(AddJobPage);
