import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ErrorTypeChart = ({ data }) => {
    // 1. 색상 매핑표
    const ERROR_COLOR_MAP = {
        // 🔴 1그룹: 실행 불가 (Red & Rose & Pink) -> 확연한 명도 차이
        SyntaxError:      '#7F1D1D', // 아주 진한 피색 (Red-900) - 가장 무거운 에러
        TypeError:        '#EF4444', // 표준 빨강 (Red-500)
        ImportError:      '#F472B6', // 꽃분홍색 (Pink-400) - 확 튐
        IndentationError: '#FDA4AF', // 연한 살구색 (Rose-300) - 밝음
        NameError:        '#9F1239', // 진한 자주색 (Rose-800)

        // 🟡 2그룹: 논리 오류 (Orange & Amber & Yellow) -> 색조 차이
        InfiniteLoop:     '#7C2D12', // 아주 진한 갈색 (Orange-900) - 위험해 보임
        LogicError:       '#F59E0B', // 표준 노랑 (Amber-500)
        BoundaryError:    '#FDBA74', // 연한 귤색 (Orange-300)
        NullSafety:       '#CA8A04', // 어두운 황금색 (Yellow-600)
        DataStructureMisuse: '#FEF08A', // 아주 밝은 레몬색 (Yellow-200)

        // 🔵 3그룹: 품질 (Blue & Indigo & Teal) -> 차가운 색 조합
        Efficiency:       '#1E3A8A', // 아주 진한 남색 (Blue-900)
        RedundantCode:    '#3B82F6', // 표준 파랑 (Blue-500)
        NamingConvention: '#14B8A6', // 청록색 (Teal-500) - 초록 느낌 섞음
        Security:         '#8B5CF6', // 보라색 (Violet-500) - 보안 느낌
        Documentation:    '#94A3B8', // 쿨그레이 (Slate-400)
        Other:            '#CBD5E1', // 연한 회색 (Slate-300)
    };

    const DEFAULT_COLORS = ['#6366F1', '#EC4899', '#14B8A6', '#8B5CF6'];

    // 총합 계산 (비율 표시용)
    const totalErrors = data.reduce((sum, item) => sum + item.value, 0);

    // 툴팁 디자인
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const dataItem = payload[0];
            return (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90">
                    <p className="font-bold text-gray-900 dark:text-white flex items-center mb-2">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: dataItem.payload.fill }}></span>
                        {dataItem.name}
                    </p>
                    <div className="flex justify-between gap-4 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">발생 횟수</span>
                        <span className="font-mono font-bold text-gray-900 dark:text-white">{dataItem.value}회</span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm mt-1">
                        <span className="text-gray-500 dark:text-gray-400">비율</span>
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                            {((dataItem.value / totalErrors) * 100).toFixed(1)}%
                        </span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                </div>
                오류 유형 분석
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* 1. 도넛 차트 영역 */}
                <div className="w-full md:w-1/2 h-[300px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60} // 도넛 모양의 핵심 (안쪽 구멍)
                                outerRadius={100}
                                paddingAngle={5} // 조각 사이 간격
                                cornerRadius={5} // 둥근 모서리
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={ERROR_COLOR_MAP[entry.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]} 
                                        strokeWidth={0} // 테두리 제거 (깔끔하게)
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* 도넛 가운데 총계 표시 */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalErrors}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">Total</p>
                    </div>
                </div>

                {/* 2. 커스텀 범례 영역 (우측 리스트) */}
                <div className="w-full md:w-1/2 space-y-3">
                    {data.map((entry, index) => {
                        const color = ERROR_COLOR_MAP[entry.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
                        const percentage = ((entry.value / totalErrors) * 100).toFixed(1);
                        
                        return (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color }} />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        {entry.name}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                                            {entry.value}회
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {percentage}%
                                        </span>
                                    </div>
                                    {/* 미니 프로그레스 바 */}
                                    <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full rounded-full" 
                                            style={{ width: `${percentage}%`, backgroundColor: color }} 
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ErrorTypeChart;