# RookieRoute API Reference

**RookieRoute** is a comprehensive backend service powered by **FastAPI**, **MySQL**, and **OpenAI**. It provides automated code reviews, vulnerability analysis, and user statistics dashboards.

---

## 📌 Base Information

| Item | Description |
| :--- | :--- |
| **Base URL** | `http://localhost:8000` |
| **Documentation** | [Swagger UI](http://localhost:8000/docs) / [ReDoc](http://localhost:8000/redoc) |
| **Authentication** | OAuth2 Password Bearer (JWT) |
| **Data Format** | JSON |

> **Note:** Endpoints marked with 🔒 require an `Authorization` header:  
> `Authorization: Bearer <your_access_token>`

---

## 🔐 Authentication

To access protected endpoints, you must authorize first.

1. Click the **Authorize** button (Lock icon) at the **top right** of the page.
2. Enter your credentials in the login form.

<p align="left">
  <img src="images/authorize_button.png" width="200" alt="Authorize Button">
</p>


### `POST` /auth/signup
**Register a new user.**

* **Request Body** (`UserCreate`)
    ```json
    {
      "email": "dev@rookieroute.com",
      "password": "StrongPassword123!",
      "username": "rookie_dev"
    }
    ```

* **Response** `200 OK` (`UserResponse`)
    ```json
    {
      "email": "dev@rookieroute.com",
      "username": "rookie_dev"
    }
    ```

### `POST` /auth/login
**Authenticate user and retrieve an access token.**

* **Note**: This endpoint follows the **OAuth2 standard** and requires data to be sent as **Form Data**, not JSON.
* **Content-Type**: `application/x-www-form-urlencoded`

* **Request Body** (Required Fields)
    * `username`: **rookie_dev**
    * `password`: **StrongPassword123!**
    * *(Ignore other fields like `grant_type`, `client_id` shown in Swagger UI)*

* **Response** `200 OK` (`Token`)
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Et9...",
      "token_type": "bearer"
    }
    ```

---

## 💻 Code Review

AI-powered analysis to identify logic errors and syntax issues.

### `POST` /review/analyze 🔒
**Submit code for analysis and receive feedback.**

* **Request Body** (`CodeRequest`)
    ```json
    {
      "code": "def calculate_area(radius):\n    # 원주율을 3으로 계산하는 실수\n    return 3 * radius * radius",
      "language": "python"
    }
    ```

* **Response** `200 OK` (`AnalysisResponse`)
    ```json
    {
      "submission_id": 105,
      "summary": "제출하신 코드는 원의 넓이를 계산하려고 하지만, 원주율(pi) 값을 정확한 값 대신 정수 3을 사용하여 오차가 발생할 수 있습니다.",
      "weaknesses": [
        {
          "explanation": "정확도를 위해 math 모듈의 math.pi를 사용하거나 3.14159와 같은 더 정밀한 값을 사용하는 것이 좋습니다.",
          "line": 3,
          "type": "PrecisionLoss"
        }
      ]
    }
    ```

---

## 📊 Dashboard

Retrieve statistics regarding user submissions and weakness patterns.

### `GET` /dashboard/stats/{user_id}
**Get aggregated statistics for a specific user.**

* **Parameters**
    * `user_id` (path, required): The ID of the target user.

* **Response** `200 OK` (`DashboardResponse`)
    ```json
    {
      "stats": [
        {
          "count": 15,
          "weakness_type": "LogicError"
        },
        {
          "count": 8,
          "weakness_type": "SyntaxError"
        },
        {
          "count": 5,
          "weakness_type": "SecurityVulnerability"
        }
      ],
      "total_submissions": 42
    }
    ```

---

## ⚙️ System

### `GET` /
**Health Check Endpoint.**

* **Response** `200 OK`
    ```json
    {
      "message": "RookieRoute 서버가 정상적으로 실행 중입니다."
    }
    ```

---

## 📦 Data Models (Schemas)

### User & Auth
| Model | Fields | Description |
| :--- | :--- | :--- |
| **UserCreate** | `email`, `password`, `username` | Payload for user registration. |
| **UserResponse** | `email`, `username` | Public user profile information. |
| **Token** | `access_token`, `token_type` | JWT Token response format. |

### Analysis
| Model | Fields | Description |
| :--- | :--- | :--- |
| **CodeRequest** | `code`, `language` | Source code payload for review. |
| **WeaknessDetail** | `explanation`, `line`, `type` | Specific details of a found issue. |
| **AnalysisResponse** | `submission_id`, `summary`, `weaknesses` | Comprehensive analysis result. |

### Dashboard
| Model | Fields | Description |
| :--- | :--- | :--- |
| **StatItem** | `count`, `weakness_type` | Count per weakness category. |
| **DashboardResponse**| `stats`, `total_submissions` | Aggregated dashboard data. |

---
