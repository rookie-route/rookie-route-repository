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
    'sphinxcontrib.mermaid',    #mermaid 지원
]

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

templates_path = ['_templates']
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
html_logo = '_static/logo.png'


# MyST 파서 추가 설정 (::: 문법 허용)
myst_enable_extensions = [
    "colon_fence",
]

# 마크다운의 ```mermaid 코드를 그림 지시어로 변환
myst_fence_as_directive = ["mermaid"]

# Mermaid 강제 렌더링 스크립트 (Server-side 렌더링 실패 시 대비)
def setup(app):
    # 1. Mermaid JS 라이브러리를 CDN에서 가져오기
    app.add_js_file("https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js")
    
    # 2. 페이지가 로딩되면 'mermaid'라고 표시된 코드 블록을 찾아서 그림으로 바꾸기
    app.add_js_file(None, body="""
        document.addEventListener("DOMContentLoaded", function() {
            mermaid.initialize({startOnLoad: false});
            
            // '.highlight-mermaid' 또는 'mermaid' 언어로 지정된 코드 블록 찾기
            var codes = document.querySelectorAll("div.highlight-mermaid pre, pre code.language-mermaid, div.highlight-default.notranslate div.highlight pre");
            
            codes.forEach(function(code) {
                // 내용이 mermaid 문법인지 확인 (graph, sequenceDiagram 등으로 시작하는지)
                var text = code.textContent.trim();
                if (text.startsWith("graph") || text.startsWith("sequenceDiagram") || text.startsWith("erDiagram") || text.startsWith("mermaid")) {
                    
                    var div = document.createElement("div");
                    div.className = "mermaid";
                    div.textContent = text;
                    
                    // 기존 코드 블록을 그림 넣을 div로 교체
                    var parent = code.closest("div.highlight");
                    if (!parent) { parent = code.parentNode; }
                    
                    if (parent) {
                        parent.parentNode.replaceChild(div, parent);
                    }
                }
            });
            
            // 변환된 div들을 그림으로 렌더링
            mermaid.init(undefined, document.querySelectorAll(".mermaid"));
        });
    """)