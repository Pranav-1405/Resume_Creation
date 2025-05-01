import { pool } from '../config/db.js';

export const getAllResumes = async () => {
  try {
    const [resumes] = await pool.query('SELECT * FROM resumes');
    return resumes;
  } catch (error) {
    console.error("Error in getAllResumes:", error);
    throw error;
  }
};

export const getResumeByIdFromDB = async (id) => {
  try {
    const [result] = await pool.query('SELECT * FROM resumes WHERE id = ?', [id]);
    return result[0] || null;
  } catch (error) {
    console.error("Error in getResumeByIdFromDB:", error);
    throw error;
  }
};

export const insertResume = async (resumeData) => {
  try {
    const { fullName, email, phone, address, education, experience, skills,projects,certifications,languages,linkedin,github,achievements,interests} = resumeData;
    const [result] = await pool.query(
      'INSERT INTO resumes (fullName, email, phone, address, education, experience, skills, projects, certifications, languages, linkedin, github, achievements, interests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [fullName, email, phone, address, education, experience, skills, projects, certifications, languages, linkedin, github, achievements, interests]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error in insertResume:", error);
    throw error;
  }
};