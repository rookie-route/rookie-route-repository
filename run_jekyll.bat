@echo off
echo Starting Jekyll local server...
echo.
echo Press Ctrl+C to stop the server
echo.

chcp 65001 > nul
bundle exec jekyll serve

pause
