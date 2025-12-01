import { codeExamples } from "../data/codeExamples";

const CodeExamples = ({ language, onLoadExample }) => {
    const handleLoadExample = () => {
        const example = codeExamples[language] || codeExamples.javascript;
        onLoadExample(example);
    };

    return (
        <button
            onClick={handleLoadExample}
            className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-200 flex items-center space-x-2 text-sm font-medium"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Load Example</span>
        </button>
    );
};

export default CodeExamples;
