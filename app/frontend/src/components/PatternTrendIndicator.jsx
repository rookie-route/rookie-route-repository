const PatternTrendIndicator = ({ trend }) => {
    const trendConfig = {
        improving: {
            icon: "📈",
            text: "개선 중",
            textColor: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-50 dark:bg-green-900 dark:bg-opacity-20",
            borderColor: "border-green-300 dark:border-green-700"
        },
        stable: {
            icon: "➡️",
            text: "유지 중",
            textColor: "text-gray-600 dark:text-gray-400",
            bgColor: "bg-gray-50 dark:bg-gray-800",
            borderColor: "border-gray-300 dark:border-gray-700"
        },
        declining: {
            icon: "📉",
            text: "악화 중",
            textColor: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-50 dark:bg-red-900 dark:bg-opacity-20",
            borderColor: "border-red-300 dark:border-red-700"
        }
    };

    const config = trendConfig[trend] || trendConfig.stable;

    return (
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 ${config.bgColor} ${config.borderColor}`}>
            <span className="text-2xl">{config.icon}</span>
            <span className={`font-semibold text-sm ${config.textColor}`}>
                {config.text}
            </span>
        </div>
    );
};

export default PatternTrendIndicator;
