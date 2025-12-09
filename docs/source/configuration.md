# ⚙️ Configuration Guide

This document explains how to configure the environment variables for **RookieRoute**. Proper configuration is essential for the database connection, security features, and frontend customization.

---

## 🐍 Backend Configuration

Create a file named `.env` in the `app/backend/` directory.

### Required Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| **`DATABASE_URL`** | MySQL connection string (SQLAlchemy format). | `mysql+pymysql://root:password@localhost:3306/rookiedb` |
| **`SECRET_KEY`** | Secret key used for signing JWT tokens. **Must be unique.** | `your_super_secret_key_change_this` |
| **`OPENAI_API_KEY`** | API Key from OpenAI Platform. | `sk-proj-xxxxxxxxxxxxxxxx` |

### Example `.env` File
```ini
# OpenAI API Key
OPENAI_API_KEY=sk-proj-your-open-ai-api-secret-key
# Database URL
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/rookie_route

# JWT Secret Key
SECRET_KEY=your_super_secret_key
```
## ✅ Verification
After configuring the .env file, you can verify the OpenAI connection using the utility script:
```
# Inside app/backend/ (with venv activated)
python check.py
```

## ⚛️ Frontend Configuration

Create a file named .env in the app/frontend/ directory.

### Configuration Variables
| Variable | Description | Default / Example | 
| :--- | :--- | :--- |
| **`VITE_API_URL`** | The base URL of the FastAPI Backend. | `http://localhost:8000` |
| **`VITE_APP_NAME`** | The display name of the application. | `Rookie Route` |
| **`VITE_APP_DESCRIPTION`** | Short description text used in the UI. | `AI-Powered Code Analyzer` |
| **`VITE_API_TIMEOUTAPI`** | request timeout in milliseconds. | `30000` (30s) |
| **`VITE_ENABLE_HISTORY`** | Toggle submission history feature (true/false). | `true` |
| **`VITE_ENABLE_DARK_MODE`** | Enable dark mode toggle support. | `true` |

### Example .env File
```
# Backend API URL
VITE_API_URL=http://localhost:8000

# App Configuration
VITE_APP_NAME=Rookie Route
VITE_APP_DESCRIPTION=AI-Powered Code Analyzer for Beginner Developers

# API Settings
VITE_API_TIMEOUT=30000

# Feature Flags
VITE_ENABLE_HISTORY=true
VITE_ENABLE_DARK_MODE=true
VITE_MAX_HISTORY_ITEMS=20

# Development
VITE_DEV_MODE=true
VITE_DEBUG_MODE=false
```

Note: In Vite, only variables prefixed with VITE_ are exposed to the client-side code.
