const { SharpApiCoreService, SharpApiJobTypeEnum } = require('@sharpapi/sharpapi-node-core');

/**
 * Service for matching resumes to job descriptions using SharpAPI.com
 */
class SharpApiResumeJobMatchScoreService extends SharpApiCoreService {
  /**
   * Compares a resume to a job description and provides match scores and explanations.
   * This endpoint helps evaluate how well a candidate's resume matches a specific job description.
   *
   * @param {string} resumeFilePath - The path to the resume file (PDF/DOC/DOCX/TXT/RTF).
   * @param {string} jobDescription - The job description text to match against.
   * @param {string|null} language - The language of the resume and job description. Defaults to 'English'.
   * @returns {Promise<string>} - The status URL.
   */
  async resumeJobMatchScore(resumeFilePath, jobDescription, language = null) {
    const data = { 
      job_description: jobDescription,
      content: jobDescription 
    };
    if (language) {
      data.language = language;
    }
    const response = await this.makeRequest('POST', SharpApiJobTypeEnum.HR_RESUME_JOB_MATCH_SCORE.url, data, resumeFilePath);
    return this.parseStatusUrl(response);
  }
}

module.exports = { SharpApiResumeJobMatchScoreService };
