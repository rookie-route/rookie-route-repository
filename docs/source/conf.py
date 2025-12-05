import os
import sys
sys.path.insert(0, os.path.abspath('../../app/backend'))

# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'RookieRoute'
copyright = '2025, RookieRouteTeam'
author = 'RookieRouteTeam'
release = '1.0.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'myst_parser',              # 마크다운(.md) 지원
    'sphinx.ext.autodoc',       # 코드에서 문서 자동 추출   
    'sphinx.ext.viewcode',      # 소스 코드 링크
    'sphinx.ext.napoleon',      # Google/Numpy 스타일 docstring 지원
]

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

templates_path = ['_templates']
exclude_patterns = []



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx-rtd-theme'
html_static_path = ['_static']
