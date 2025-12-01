import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const ImprovementTrendChart = ({ data }) => {
    // Calculate average score
    const avgScore = data.length > 0
        ? data.reduce((sum, item) => sum + item.score, 0) / data.length
        : 0;

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white">{payload[0].payload.date}</p>
                    <p className="text-blue-600 dark:text-blue-400">
                        점수: <span className="font-semibold">{payload[0].value}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    개선 추세
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    평균: <span className="font-semibold text-blue-600 dark:text-blue-400">{avgScore.toFixed(1)}</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                    <XAxis
                        dataKey="date"
                        className="text-gray-600 dark:text-gray-400"
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        domain={[0, 100]}
                        className="text-gray-600 dark:text-gray-400"
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <ReferenceLine
                        y={avgScore}
                        stroke="#9CA3AF"
                        strokeDasharray="5 5"
                        label={{ value: '평균', position: 'right', fill: '#9CA3AF' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', r: 5 }}
                        activeDot={{ r: 7 }}
                        name="코드 품질 점수"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ImprovementTrendChart;
