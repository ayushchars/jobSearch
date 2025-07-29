import jobsModel from "../../models/jobsModel.js";
import {
  ErrorResponse,
  successResponse,
  notFoundResponse,
  successResponseWithData
} from "../../helpers/apiResponse.js";

export const jobs = async (req, res) => {
  try {
    const jobs = await jobsModel.find().sort({ createdAt: -1 });
    return successResponseWithData(res, "Jobs fetched successfully", jobs);
  } catch (err) {
    return ErrorResponse(res, "Server error");
  }
};

export const getJobsById = async (req, res) => {
  try {
    const job = await jobsModel.findById(req?.params?.id);
    if (!job) return notFoundResponse(res, "Job not found");
    return successResponseWithData(res, "Job fetched successfully", job);
  } catch (err) {
    return ErrorResponse(res, "Job not found");
  }
};

export const creatJobs = async (req, res) => {
  const { title, company, type, location, description } = req.body;

  if (![title, company, type, location, description].every(Boolean)) {
    return ErrorResponse(res, "All fields are required");
  }

  if (!["Full-time", "Part-time"].includes(type)) {
    return ErrorResponse(res, "Invalid job type");
  }

  try {
    const newJob = new jobsModel({ title, company, type, location, description });
    await newJob.save();
    return successResponseWithData(res, "Job created successfully", newJob);
  } catch (err) {
    return ErrorResponse(res, "Server error");
  }
};
