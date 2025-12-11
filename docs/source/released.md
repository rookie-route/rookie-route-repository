# 📝 Release Notes

## 🎉 v1.0.0: Official Release (2025-12-09)
**Final Stability Patch**
The official production release. We focused purely on resolving critical rendering issues discovered in the v0.9.0 pre-release to ensure a seamless experience.

### 🚀 Final Polish & Bug Fixes
* **Web Stability:** Fixed critical Jekyll rendering errors and image path issues ensuring the landing page loads correctly.
    * *Related: PR #91 (Fix Image Error)*
    * *Related: PR #90 (Fix Image URL)*
    * *Related: PR #87, #88 (Fix Jekyll Connection & Errors)*

---

## 🌏 v0.9.0: Global Expansion & Overhaul
**Multilingual Support, Documentation Restructure & Asset Optimization**
A massive pre-release update introducing global language support, a completely overhauled documentation structure, and optimized assets.

### ✨ New Features
* **Multilingual Support (Global Reach):** Integrated `jekyll-polyglot` to support both English and Korean languages.
    * *Related: PR #85, #86 (Add Jekyll Polyglot & Support)*

### 📝 Documentation Overhaul
* **Comprehensive README Rewrite:** Refined the System Architecture details and project structure breakdowns.
    * *Related: PR #83 (Overhaul README)*
* **Simplified Setup Guide:** Separated installation/running steps and introduced `run_server.bat`.
    * *Related: PR #81 (Refine Setup Guide)*

### 🏗️ Asset Management
* **Documentation Asset Optimization:** Removed redundant assets (e.g., authorize button) to streamline the repository structure.
    * *Related: PR #76 (Remove Authorize Button & Simplify Assets)*
    * *Related: PR #71 (Fix Broken Images)*

---

## 🌐 v0.5.0: Documentation & Web Presence

**Project Landing Page & Visualization**

This version focuses on expanding the project's online presence and enhancing technical documentation with visualization tools.

### ✨ New Features

- **Project Landing Page (Jekyll):** Launched a dedicated project website using Jekyll. This serves as the main entry point for users, providing an overview and easy access to resources.
    - *Related: PR #51, #52 (Setup Jekyll Website)*

- **Mermaid.js Integration:** Enabled Mermaid diagram rendering on ReadTheDocs. Now, technical architectures and flows are visualized directly within the documentation.
    - *Related: PR #70 (Fix RTD Mermaid Rendering)*

- **API Documentation Update:** Refined API endpoints documentation and Swagger UI configuration for better developer accessibility.
    - *Related: PR #65 (Improve API Documentation)*

---

## ⚙️ v0.4.0: Documentation System Setup

**Sphinx & ReadTheDocs Adoption**

Transformed the project documentation from simple Markdown files to a professional documentation system.

### 🛠 Improvements

- **Sphinx Setup:** Established the initial Sphinx structure for scalable documentation management.
    - *Related: PR #45 (Setup Sphinx)*

- **ReadTheDocs Configuration:** Added configuration files (`.readthedocs.yaml`) to automate documentation builds and deployment.
    - *Related: PR #46 (Update ReadTheDocs Config)*

---

## 🧠 v0.3.0: Core Analysis Engine

**C Language Support & Enhanced Stability**

A major update that expanded the analysis capabilities of the core engine and improved system robustness against data errors.

### ✨ New Features & Improvements

- **C Language Compiler Dependency Support:** Added automatic detection and inclusion of necessary C language compiler dependencies to support a wider range of development environments.
    - *Related: PR #41 (Add C Language Support)*

- **Granular Data Error Segmentation:** Previously, issues were often generically reported. We have now segmented these into specific error types (including language-specific analysis) for faster root cause identification.
    - *Related: PR #40 (Granular Error Categorization)*
    - *Related: PR #39 (Language Support & Error Handling)*

---

## 🎨 v0.2.0: Frontend & Foundation

**UI Implementation, Authentication & Local DX**

Focused on establishing the user interface, authentication system, and improving the Developer Experience (DX).

### ✨ New Features

- **Frontend UI & Auth Integration:** Completed the frontend User Interface including Login/Signup pages and integrated the JWT authentication system.
    - *Related: PR #38 (Fix Frontend Log & Add Pages)*

- **Backend Foundation:** Established the initial backend structure and models.
    - *Related: PR #34 (Fix Frontend & Local Settings)*

### 🛠 Improvements

- **Per-User MySQL Integration:** Improved configuration to allow individual users to independently connect the database based on their local MySQL environment.
    - *Related: PR #26 (Update Backend with MySQL)*

---

## 🌱 v0.0.1: Initial Release

- Initial project structure and basic setup.