const ErrorPatternCard = ({ pattern, count, percentage, severity }) => {
    const severityStyles = {
        high: "bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:border-red-700 dark:text-red-300",
        medium: "bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:border-yellow-700 dark:text-yellow-300",
        low: "bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:border-green-700 dark:text-green-300"
    };

    const severityBadgeStyles = {
        high: "bg-red-500 text-white",
        medium: "bg-yellow-500 text-white",
        low: "bg-green-500 text-white"
    };

    return (
        <div className={`rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-lg ${severityStyles[severity]}`}>
            <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{pattern}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${severityBadgeStyles[severity]}`}>
                    {severity}
                </span>
            </div>

            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold">{count}회</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="font-semibold">{percentage.toFixed(1)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPatternCard;
