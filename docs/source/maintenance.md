# ⚙️ Maintenance and Troubleshooting

This section provides procedures for routine maintenance, identifying common issues, and outlining steps for their resolution.

## 📅 Routine Maintenance
### 1. Dependencies Update
Periodically keeping packages up-to-date is recommended for project stability and security.

#### Frontend (React/Vite)
```bash
cd app/frontend
npm update
```

#### Backend (Python/FastAPI)
```bash
cd ../backend
pip install -r requirements.txt
```

### 2. Database Backup
Perform regular backups of the MySQL database.

```bash
mysqldump -u [username] -p [database_name] > backup_file.sql
```

### 3. Environment Variable Check
It is recommended for security reasons to periodically re-issue or verify the SECRET_KEY and OpenAI API Key set in the .env file.

## 🔍 Common Issues and Solutions
### Backend Execution
Symptom: `ModuleNotFoundError`

Cause: Python dependencies are not installed.

Solution: Navigate to `cd app/backend and run pip install -r requirements.txt.`

### Backend Execution
Symptom: DB Connection Error

Cause: The MySQL server is not running, or the DB configuration is incorrect.

Solution: Verify the MySQL server's running status and check the DB URL in the `.env` file.

### Frontend Execution
Symptom: `Cannot find module`

Cause: `node_modules` folder is missing or corrupted.

Solution: Navigate to `cd app/frontend and run npm install` again.

### AI Analysis
Symptom: 500 Error on `/review/analyze`

Cause: The OpenAI API key is invalid or expired.

Solution: Check the OPENAI_API_KEY value in `app/backend/.env` and update it with a valid key.

### Authentication Error
Symptom: 401 Unauthorized

Cause: Token has expired or the header is incorrectly formatted.

Solution: Obtain a new token via `/auth/login` and send it as `Authorization: Bearer <token>.`
