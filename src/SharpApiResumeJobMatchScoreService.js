const { SharpApiCoreService, SharpApiJobTypeEnum } = require('@sharpapi/sharpapi-node-core');

/**
 * Service for matching resumes to job descriptions using SharpAPI.com
 */
class SharpApiResumeJobMatchScoreService extends SharpApiCoreService {
  /**
   * Creates a new SharpApiResumeJobMatchScoreService instance
   * @param {string} apiKey - Your SharpAPI API key
   * @param {string} [apiBaseUrl='https://sharpapi.com/api/v1'] - API base URL
   */
  constructor(apiKey, apiBaseUrl = 'https://sharpapi.com/api/v1') {
    super(apiKey, apiBaseUrl, '@sharpapi/sharpapi-node-resume-job-match-score/1.0.1');
  }

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
