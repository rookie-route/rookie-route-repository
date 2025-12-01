import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode, language, setLanguage, disabled = false }) => {
    const languages = [
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "cpp", label: "C++" },
        { value: "csharp", label: "C#" },
        { value: "typescript", label: "TypeScript" },
        { value: "html", label: "HTML" },
        { value: "css", label: "CSS" },
        { value: "go", label: "Go" },
        { value: "rust", label: "Rust" },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Enter Your Code
                    </h2>
                    {/* Language Selector */}
                    <div className="flex items-center space-x-2">
                        <label className="text-white text-sm font-medium">Language:</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium focus:ring-2 focus:ring-white focus:outline-none"
                            disabled={disabled}
                        >
                            {languages.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="p-6">
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden hover:border-gray-400 transition-colors">
                    <Editor
                        height="400px"
                        language={language}
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        theme="vs-light"
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: "on",
                            roundedSelection: true,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            tabSize: 4,
                            wordWrap: "on",
                            readOnly: disabled,
                        }}
                        loading={
                            <div className="flex items-center justify-center h-[400px]">
                                <div className="text-gray-500">Loading editor...</div>
                            </div>
                        }
                    />
                </div>

                {/* Stats */}
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    {code.length > 0 && (
                        <span>{code.length} characters • {code.split('\n').length} lines</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
