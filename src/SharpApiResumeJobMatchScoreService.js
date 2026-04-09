const { SharpApiCoreService } = require('@sharpapi/sharpapi-node-core');

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
    super(apiKey, apiBaseUrl, '@sharpapi/sharpapi-node-resume-job-match-score/1.1.0');
  }

  /**
   * Compares a resume to a job description and provides match scores and explanations.
   * This endpoint helps evaluate how well a candidate's resume matches a specific job description.
   *
   * @param {string} resumeFilePath - The path to the resume file (PDF/DOC/DOCX/TXT/RTF).
   * @param {string} jobDescription - The job description text to match against.
   * @param {string|null} language - The language of the resume and job description. Defaults to 'English'.
   * @param {string|null} context - Optional scoring directives (EMPHASIZE: / DEEMPHASIZE: / CREDIT:).
   *                                Max 5000 characters. See README for the directive contract.
   * @returns {Promise<string>} - The status URL.
   */
  async resumeJobMatchScore(resumeFilePath, jobDescription, language = null, context = null) {
    const data = {
      job_description: jobDescription,
      content: jobDescription
    };
    if (language) {
      data.language = language;
    }
    if (context) {
      data.context = context;
    }
    const response = await this.makeRequest('POST', '/hr/resume_job_match_score', data, resumeFilePath);
    return this.parseStatusUrl(response);
  }
}

module.exports = { SharpApiResumeJobMatchScoreService };
