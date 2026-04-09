![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Resume/CV Job Match Score API for Node.js

## 🎯 Calculate resume-to-job match scores — powered by SharpAPI AI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-resume-job-match-score.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-resume-job-match-score)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-resume-job-match-score.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Resume Job Match Score** analyzes how well a resume matches a job description, providing a compatibility score. Helps recruiters quickly identify the best candidates.

Supported resume files - **11 file formats**: **DOC, DOCX, TXT, RTF, PDF, JPG, JPEG, JPE, PNG, TIFF, TIF**

And yes - it handles those **flattened PDFs** where the entire resume is just images instead of text.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Examples](#examples)
6. [Use Cases](#use-cases)
7. [API Endpoint](#api-endpoint)
8. [Related Packages](#related-packages)
9. [License](#license)

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

const apiKey = process.env.SHARP_API_KEY; // Store your API key in environment variables
const service = new SharpApiResumeJobMatchScoreService(apiKey);

const fs = require('fs');

const resumePath = './resume.pdf';
const jobDescription = 'Senior Software Engineer position...';

// Optional scoring directives (max 5000 chars). See "Context directives" below.
const context = `
EMPHASIZE: backend scalability
DEEMPHASIZE: frontend frameworks
CREDIT: AWS
`.trim();

async function calculateMatchScore() {
  try {
    // Submit matching job — language and context are optional
    const statusUrl = await service.resumeJobMatchScore(resumePath, jobDescription, 'English', context);
    console.log('Job submitted. Status URL:', statusUrl);

    // Fetch results (polls automatically until complete)
    const result = await service.fetchResults(statusUrl);
    console.log('Match score:', result.getResultJson());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

calculateMatchScore();
```

---

## API Documentation

### Methods

This service accepts file uploads. Please refer to the [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsaF) for detailed parameter specifications.

### Response Format

The API returns structured data extracted from the uploaded file. See the product page for example responses.

---

## Examples

### Basic Example

```javascript
const { SharpApiResumeJobMatchScoreService } = require('@sharpapi/sharpapi-node-resume-job-match-score');

const service = new SharpApiResumeJobMatchScoreService(process.env.SHARP_API_KEY);

// Customize polling behavior if needed
service.setApiJobStatusPollingInterval(10);  // Poll every 10 seconds
service.setApiJobStatusPollingWait(180);     // Wait up to 3 minutes

// Use the service
// ... (implementation depends on specific service)
```

For more examples, visit the [Product Page](https://sharpapi.com/en/catalog/ai/hr-tech/resume-cv-job-match-score).

---

## Use Cases

- **Candidate Screening**: Quickly identify top candidates
- **Resume Ranking**: Sort applicants by match score
- **ATS Optimization**: Improve candidate-job matching accuracy
- **Recruitment Efficiency**: Reduce time spent on unqualified candidates
- **Job Seeker Tools**: Help candidates understand fit for positions
- **Talent Analytics**: Analyze hiring patterns and candidate quality

---

## Context directives

The optional `context` parameter lets you steer the scoring engine using a formal directive contract. The engine recognises three directive shapes, which can be mixed freely in a single string:

| Directive | Effect |
|-----------|--------|
| `EMPHASIZE: <topic>` | Increases the matching metric weight by one step |
| `DEEMPHASIZE: <topic>` | Decreases the matching metric weight by one step |
| `CREDIT: <skill \| tool \| certification>` | Treats the named item as a plausible role requirement even if it is absent from the job description |

Directives influence the `overall_match` score and the individual metric scores before the weighted average is computed.

**Limit:** the context string may be up to **5000 characters**. Requests exceeding the limit fail with HTTP 422.

Example:

```text
EMPHASIZE: backend scalability
DEEMPHASIZE: frontend frameworks
CREDIT: AWS
CREDIT: Kubernetes
```

---

## API Endpoint

**POST** `/hr/resume_job_match_score`

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsaF)
- [Product Page](https://sharpapi.com/en/catalog/ai/hr-tech/resume-cv-job-match-score)

---

## Related Packages

- [@sharpapi/sharpapi-node-parse-resume](https://www.npmjs.com/package/@sharpapi/sharpapi-node-parse-resume)
- [@sharpapi/sharpapi-node-job-description](https://www.npmjs.com/package/@sharpapi/sharpapi-node-job-description)
- [@sharpapi/sharpapi-node-related-skills](https://www.npmjs.com/package/@sharpapi/sharpapi-node-related-skills)

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
