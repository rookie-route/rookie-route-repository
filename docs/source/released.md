# Release Notes

### Version v1.0.0 (December 9, 2025)

We are excited to announce the launch of v1.0.0! This release focuses heavily on improving developer experience (DX) by streamlining the local setup process and enhancing data handling stability across the board.


## Improvements
### Simplified and Standardized Local Environment Setup

#### Per-User MySQL Integration Support: 

Improved the configuration structure to allow individual users to independently connect the database based on their local MySQL environment. This significantly simplifies collaboration and parallel development efforts.
* Related Commit: feat: Update backend with MySQL integration and CORS (#26)

  
#### Local Setup Normalization: 

Resolved local configuration and path issues to ensure the project runs instantly across different developers' local environments. You can now clone the project and run it immediately without complex setup procedures.
* Related Commit: fix: frontend setting and remove local settings (#34)


#### Data Visualization Module Enhancement: 

Improved the stability of the existing visualization module and refined its presentation style. This provides clearer and more intuitive data analysis results.
* Related Commit: feat: Implement granular error categorization and enhanced visualization (#40)


## Bug Fixes
### Granular Data Error Scope
Data Error Segmentation: Previously, issues were often generically reported as 'data errors.' We have now segmented these into specific error types, allowing for faster and more accurate identification of the root cause of data anomalies.
* Related Commit: feat: Add language-specific analysis and robust error handling (#39)
* Related Commit: feat: Implement granular error categorization and enhanced visualization (#40)



## New Features
### C Language Compiler Dependency Support
Added automatic detection and inclusion of necessary C language compiler dependencies to support a wider range of development environments. This enhancement simplifies building and running the project across various operating systems and development setups.
* Related Commit: feat: add-c-language-support (#41)


