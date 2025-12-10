# 📝 Release Notes

## 🎉 v1.0.0: Official Release (2025-12-11)

**Stable Release, Asset Management & Documentation Overhaul**

We are excited to announce the official launch of **v1.0.0**! This release marks the culmination of all previous developments, featuring a completely revamped documentation structure for a better user onboarding experience.

### 🚀 Final Polish & Documentation

- **Comprehensive Documentation Overhaul:** Refined the README structure, updated system architecture details, and polished all guide documents with consistent formatting and emojis.
    - *Related: PR #83 (Overhaul README & Project Structure)*
    - *Related: PR #81 (Refine Setup Guide & Formatting)*
    - *Related: PR #80 (Add Emoticons to Documentation Titles)*

- **Simplified Installation Process:** Restructured the setup guide and introduced `run_server.bat` for a one-click execution experience on Windows.
    - *Related: PR #81 (Refine Setup Guide)*

- **Documentation Asset Management:** Reorganized documentation image assets to ensure compatibility with ReadTheDocs and streamline project structure.
    - *Related: PR #76 (Remove Authorize Button & Simplify Assets)*
    - *Related: PR #71 (Fix Broken Images on RTD)*

### ✨ Full Stability

- Verified all features including MySQL integration, C language support, and documentation systems.

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