![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Resume/Job Match Score API for Node.js

## 🎯 Calculate resume-job matching scores with AI — powered by SharpAPI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-resume-job-match-score.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-resume-job-match-score)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-resume-job-match-score.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Resume/Job Match Score** calculates how well a candidate's resume matches a job description, providing a detailed compatibility score and analysis. Perfect for ATS systems, recruitment platforms, and automated candidate screening.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Response Format](#response-format)
6. [Examples](#examples)
7. [License](#license)

---

## Requirements

- Node.js >= 16.x
- npm or yarn

---

## Installation

### Step 1. Install the package via npm:

```bash
npm install @sharpapi/sharpapi-node-resume-job-match-score
```

### Step 2. Get your API key

Visit [SharpAPI.com](https://sharpapi.com/) to get your API key.

---

## Usage

```javascript
const { SharpApiResumeJobMatchScoreService } = require('@sharpapi/sharpapi-node-resume-job-match-score');
const fs = require('fs');

const apiKey = process.env.SHARP_API_KEY;
const service = new SharpApiResumeJobMatchScoreService(apiKey);

async function calculateMatchScore() {
  try {
    // Read resume file
    const resumeFile = fs.readFileSync('/path/to/resume.pdf');
    const jobDescription = `
      Senior Software Engineer position requiring 5+ years of experience
      with JavaScript, Node.js, React, and AWS. Strong problem-solving
      skills and experience leading development teams.
    `;

    // Submit matching job
    const statusUrl = await service.calculateMatchScore(
      resumeFile,
      'resume.pdf',
      jobDescription,
      'English'
    );
    console.log('Job submitted. Status URL:', statusUrl);

    // Fetch results
    const result = await service.fetchResults(statusUrl);
    const matchData = result.getResultJson();

    console.log('Match Score:', matchData.result.match_score + '%');
    console.log('Match Status:', matchData.result.match_status);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

calculateMatchScore();
```

---

## API Documentation

### Methods

#### `calculateMatchScore(resumeFile: Buffer, fileName: string, jobDescription: string, language?: string): Promise<string>`

Calculates the compatibility score between a resume and job description.

**Parameters:**
- `resumeFile` (Buffer, required): The resume file content as a Buffer
- `fileName` (string, required): Original filename with extension
- `jobDescription` (string, required): The job description text to match against
- `language` (string, optional): Language for analysis (default: 'English')

**Supported File Formats:**
- PDF (.pdf)
- Microsoft Word (.doc, .docx)
- Plain Text (.txt)

**Returns:**
- Promise<string>: Status URL for polling the job result

---

## Response Format

The API returns a detailed matching analysis with score and breakdown:

```json
{
  "data": {
    "type": "api_job_result",
    "id": "7bc5887a-0dfd-49b6-8edb-9280e468c210",
    "attributes": {
      "status": "success",
      "type": "hr_resume_job_match_score",
      "result": {
        "match_score": 87,
        "match_status": "High Match",
        "candidate_name": "John Doe",
        "job_position": "Senior Software Engineer",
        "analysis": {
          "skills_match": {
            "score": 90,
            "matched_skills": [
              "JavaScript",
              "Node.js",
              "React",
              "AWS",
              "Team Leadership"
            ],
            "missing_skills": [
              "Kubernetes"
            ]
          },
          "experience_match": {
            "score": 95,
            "required_experience": "5+ years",
            "candidate_experience": "8 years",
            "assessment": "Exceeds requirements"
          },
          "education_match": {
            "score": 85,
            "required_education": "Bachelor's Degree",
            "candidate_education": "Bachelor of Science in Computer Science",
            "assessment": "Meets requirements"
          }
        },
        "strengths": [
          "Strong technical skill alignment with required technologies",
          "Exceeds minimum experience requirements",
          "Proven leadership experience mentioned in resume",
          "Relevant industry experience"
        ],
        "gaps": [
          "No explicit mention of Kubernetes experience",
          "Limited details about AWS specific services"
        ],
        "recommendation": "Strong candidate - Recommend for interview. Candidate demonstrates excellent technical alignment and exceeds experience requirements. Consider discussing Kubernetes experience during interview."
      }
    }
  }
}
```

**Match Score Ranges:**
- **90-100%**: Excellent Match - Top candidate
- **75-89%**: High Match - Strong candidate
- **60-74%**: Moderate Match - Potential candidate
- **40-59%**: Low Match - May require development
- **0-39%**: Poor Match - Not recommended

---

## Examples

### Basic Match Score Calculation

```javascript
const { SharpApiResumeJobMatchScoreService } = require('@sharpapi/sharpapi-node-resume-job-match-score');
const fs = require('fs');

const service = new SharpApiResumeJobMatchScoreService(process.env.SHARP_API_KEY);

async function evaluateCandidate(resumePath, jobDesc) {
  const resumeBuffer = fs.readFileSync(resumePath);
  const fileName = resumePath.split('/').pop();

  const statusUrl = await service.calculateMatchScore(
    resumeBuffer,
    fileName,
    jobDesc
  );

  const result = await service.fetchResults(statusUrl);
  const data = result.getResultJson().result;

  console.log(`Candidate: ${data.candidate_name}`);
  console.log(`Match Score: ${data.match_score}%`);
  console.log(`Status: ${data.match_status}`);
  console.log(`\nStrengths:`);
  data.strengths.forEach(s => console.log(`  ✓ ${s}`));
  console.log(`\nGaps:`);
  data.gaps.forEach(g => console.log(`  ⚠ ${g}`));
  console.log(`\nRecommendation: ${data.recommendation}`);
}

const jobDescription = `
  Marketing Manager with 5+ years experience in digital marketing,
  SEO, content strategy, and team management. MBA preferred.
`;

evaluateCandidate('./resumes/candidate_1.pdf', jobDescription);
```

### Automated Candidate Ranking

```javascript
const service = new SharpApiResumeJobMatchScoreService(process.env.SHARP_API_KEY);
const fs = require('fs');
const path = require('path');

async function rankCandidates(resumeDirectory, jobDescription) {
  const files = fs.readdirSync(resumeDirectory);
  const candidates = [];

  for (const file of files) {
    if (file.match(/\.(pdf|docx)$/i)) {
      const filePath = path.join(resumeDirectory, file);
      const resumeBuffer = fs.readFileSync(filePath);

      try {
        const statusUrl = await service.calculateMatchScore(
          resumeBuffer,
          file,
          jobDescription
        );

        const result = await service.fetchResults(statusUrl);
        const data = result.getResultJson().result;

        candidates.push({
          fileName: file,
          name: data.candidate_name,
          score: data.match_score,
          status: data.match_status,
          recommendation: data.recommendation
        });
      } catch (error) {
        console.error(`Failed to process ${file}:`, error.message);
      }
    }
  }

  // Sort by score descending
  candidates.sort((a, b) => b.score - a.score);

  return candidates;
}

const jobDesc = 'Full Stack Developer with React, Node.js, and PostgreSQL experience...';
const rankedCandidates = await rankCandidates('./applications', jobDesc);

console.log('📊 Candidate Rankings:\n');
rankedCandidates.forEach((candidate, index) => {
  console.log(`${index + 1}. ${candidate.name} - ${candidate.score}% (${candidate.status})`);
});
```

### ATS Integration with Thresholds

```javascript
const service = new SharpApiResumeJobMatchScoreService(process.env.SHARP_API_KEY);

async function screenCandidate(resumeBuffer, fileName, jobDescription, minScore = 60) {
  const statusUrl = await service.calculateMatchScore(
    resumeBuffer,
    fileName,
    jobDescription
  );

  const result = await service.fetchResults(statusUrl);
  const matchData = result.getResultJson().result;

  const decision = {
    candidateName: matchData.candidate_name,
    score: matchData.match_score,
    status: matchData.match_status,
    passedScreening: matchData.match_score >= minScore,
    nextStep: matchData.match_score >= 90 ? 'Fast-track to final round' :
             matchData.match_score >= 75 ? 'Schedule technical interview' :
             matchData.match_score >= 60 ? 'Schedule phone screening' :
             'Reject - Does not meet minimum requirements',
    strengths: matchData.strengths,
    gaps: matchData.gaps,
    interviewFocus: matchData.gaps.length > 0 ?
      `Focus interview on: ${matchData.gaps.join(', ')}` :
      'General competency assessment'
  };

  return decision;
}

const decision = await screenCandidate(
  resumeBuffer,
  'candidate.pdf',
  jobDescription,
  70 // 70% minimum threshold
);

if (decision.passedScreening) {
  console.log(`✅ ${decision.candidateName} passed screening`);
  console.log(`Score: ${decision.score}%`);
  console.log(`Next Step: ${decision.nextStep}`);
  console.log(`Interview Focus: ${decision.interviewFocus}`);
} else {
  console.log(`❌ ${decision.candidateName} did not meet minimum threshold`);
}
```

---

## Use Cases

- **Automated Resume Screening**: Filter candidates based on match scores
- **Candidate Ranking**: Rank applicants by compatibility
- **Interview Prioritization**: Identify top candidates for immediate interviews
- **Skills Gap Analysis**: Identify training needs for near-match candidates
- **Recruitment Automation**: Streamline high-volume hiring processes
- **Talent Pool Management**: Match existing candidates to new openings
- **Diversity Hiring**: Ensure objective, skills-based evaluation

---

## Matching Factors

The algorithm evaluates:

- **Skills Match**: Technical and soft skills alignment
- **Experience Level**: Years of experience vs. requirements
- **Education**: Degree level and field of study
- **Job Titles**: Relevant position history
- **Industry Experience**: Domain knowledge match
- **Certifications**: Professional credentials
- **Keywords**: Job-specific terminology presence
- **Career Progression**: Growth trajectory alignment

---

## API Endpoint

**POST** `/hr/resume_job_match_score` (multipart/form-data)

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsVP)
- [Product Page](https://sharpapi.com/en/catalog/ai/hr-tech/resume-cv-job-match-score)

---

## Related Packages

- [@sharpapi/sharpapi-node-parse-resume](https://www.npmjs.com/package/@sharpapi/sharpapi-node-parse-resume) - Resume parsing
- [@sharpapi/sharpapi-node-job-description](https://www.npmjs.com/package/@sharpapi/sharpapi-node-job-description) - Job descriptions
- [@sharpapi/sharpapi-node-related-skills](https://www.npmjs.com/package/@sharpapi/sharpapi-node-related-skills) - Skills analysis
- [@sharpapi/sharpapi-node-client](https://www.npmjs.com/package/@sharpapi/sharpapi-node-client) - Full SharpAPI SDK

---

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

---

## Support

- **Documentation**: [SharpAPI.com Documentation](https://sharpapi.com/documentation)
- **Issues**: [GitHub Issues](https://github.com/sharpapi/sharpapi-node-client/issues)
- **Email**: contact@sharpapi.com

---

**Powered by [SharpAPI](https://sharpapi.com/) - AI-Powered API Workflow Automation**
