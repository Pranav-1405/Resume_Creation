import { insertResume, getResumeByIdFromDB, getAllResumes } from '../models/resumeModel.js';

export const getAllResumesController = async (req, res) => {
  try {
    const resumes = await getAllResumes();
    res.json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ message: 'Error fetching resumes' });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const id = req.params.id;
    const resume = await getResumeByIdFromDB(id);
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (error) {
    console.error("Error fetching resume by ID:", error);
    res.status(500).json({ message: 'Error fetching resume by ID' });
  }
};

export const createResume = async (req, res) => {
  try {
    const resumeData = req.body;
    const insertId = await insertResume(resumeData);
    res.status(201).json({ 
      message: 'Resume saved successfully!', 
      id: insertId,
      ...resumeData 
    });
  } catch (error) {
    console.error("Error saving resume:", error);
    res.status(500).json({ message: 'Failed to save resume' });
  }
};