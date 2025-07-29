import express  from "express"
import {jobs,getJobsById,creatJobs } from "./jobsContoller.js"


const router = express.Router()

router.get("/jobs" , jobs)
router.get('/jobs/:id', getJobsById);
router.post('/jobs', creatJobs);
export default router