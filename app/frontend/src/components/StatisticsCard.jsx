const StatisticsCard = ({ icon, title, value, subtitle, color = "blue" }) => {
    const colorStyles = {
        blue: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-400",
        green: "bg-green-100 text-green-600 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400",
        purple: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:bg-opacity-30 dark:text-purple-400",
        red: "bg-red-100 text-red-600 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400",
        yellow: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-400"
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-xl">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className={`w-12 h-12 rounded-lg ${colorStyles[color]} flex items-center justify-center mb-3`}>
                        {icon}
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatisticsCard;
