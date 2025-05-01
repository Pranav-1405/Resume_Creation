import express from 'express';
import {getAllResumesController,getResumeById,createResume} from '../controllers/resumeController.js';

const router = express.Router();

router.get('/resumes',getAllResumesController);
router.get('/resumes/:id', getResumeById);
router.post('/resumes', createResume);

export default router;
