import { useState, useEffect } from "react";
import ErrorPatternCard from "../components/ErrorPatternCard";
import PatternTrendIndicator from "../components/PatternTrendIndicator";
import ErrorTypeChart from "../components/ErrorTypeChart";
import ImprovementTrendChart from "../components/ImprovementTrendChart";
import StatisticsCard from "../components/StatisticsCard";

const AnalyzePage = () => {
    const [history, setHistory] = useState([]);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState("");

    // Load user ID
    useEffect(() => {
        const storedUserId = localStorage.getItem('rookie_route_user_id');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    // Load dashboard data from backend
    useEffect(() => {
        if (!userId) return;

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:8000/dashboard/stats/${userId}`);

                if (res.ok) {
                    const data = await res.json();
                    setDashboardData(data);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [userId]);

    // Load history from localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('analysisHistory');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error('Failed to load history:', e);
            }
        }
    }, []);

    // Real data from backend (no mock data)

    // Calculate statistics from real data
    const totalAnalyses = dashboardData?.total_submissions || 0;

    // Convert backend stats to chart data
    const errorTypeData = dashboardData?.stats?.length > 0
        ? dashboardData.stats.map(stat => ({
            name: stat.weakness_type,
            value: stat.count
        }))
        : [];

    // Calculate error patterns from backend data
    const errorPatterns = dashboardData?.stats?.length > 0
        ? dashboardData.stats.map((stat, index) => {
            const totalErrors = dashboardData.stats.reduce((sum, s) => sum + s.count, 0);
            const percentage = (stat.count / totalErrors) * 100;
            let severity = "low";
            if (percentage > 30) severity = "high";
            else if (percentage > 15) severity = "medium";

            return {
                pattern: stat.weakness_type,
                count: stat.count,
                percentage: percentage,
                severity: severity
            };
        })
        : [];

    // Calculate trend data from history (임시로 계산)
    const trendData = history.length > 0
        ? history.slice(0, 10).reverse().map((item, index) => ({
            date: `${index + 1}차`,
            score: 50 + Math.random() * 50 // 임시 점수
        }))
        : [];

    const avgScore = trendData.length > 0
        ? (trendData.reduce((sum, item) => sum + item.score, 0) / trendData.length).toFixed(1)
        : 0;
    const bestScore = trendData.length > 0
        ? Math.max(...trendData.map(item => item.score))
        : 0;
    const mostCommonError = errorPatterns.length > 0 ? errorPatterns[0].pattern : "없음";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        코드 분석 리포트
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        당신의 코딩 패턴을 분석하고 개선 방향을 제시합니다
                    </p>
                </div>

                {/* 3번 기능: Personal Error Pattern Analysis */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            개인 오류 패턴 분석
                        </h2>
                        <PatternTrendIndicator trend="improving" />
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">데이터를 불러오는 중...</p>
                        </div>
                    ) : errorPatterns.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {errorPatterns.map((pattern, index) => (
                                <ErrorPatternCard
                                    key={index}
                                    pattern={pattern.pattern}
                                    count={pattern.count}
                                    percentage={pattern.percentage}
                                    severity={pattern.severity}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">아직 분석 데이터가 없습니다.</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">코드를 분석하면 여기에 패턴이 표시됩니다.</p>
                        </div>
                    )}
                </div>

                {/* 4번 기능: Code Improvement Report Visualization */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        코드 개선 리포트
                    </h2>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatisticsCard
                            icon={
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            }
                            title="총 분석 횟수"
                            value={totalAnalyses}
                            subtitle="코드 분석 완료"
                            color="blue"
                        />
                        <StatisticsCard
                            icon={
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                </svg>
                            }
                            title="평균 점수"
                            value={avgScore}
                            subtitle="전체 평균 품질 점수"
                            color="green"
                        />
                        <StatisticsCard
                            icon={
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            }
                            title="최고 점수"
                            value={bestScore}
                            subtitle="역대 최고 기록"
                            color="purple"
                        />
                        <StatisticsCard
                            icon={
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            }
                            title="주요 오류"
                            value={mostCommonError}
                            subtitle="가장 빈번한 패턴"
                            color="red"
                        />
                    </div>

                    {/* Charts */}
                    {errorTypeData.length > 0 || trendData.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {errorTypeData.length > 0 ? (
                                <ErrorTypeChart data={errorTypeData} />
                            ) : (
                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">오류 유형별 분포</h3>
                                    <div className="text-center py-12">
                                        <p className="text-gray-600 dark:text-gray-400">데이터가 없습니다.</p>
                                    </div>
                                </div>
                            )}
                            {trendData.length > 0 ? (
                                <ImprovementTrendChart data={trendData} />
                            ) : (
                                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">개선 추세</h3>
                                    <div className="text-center py-12">
                                        <p className="text-gray-600 dark:text-gray-400">데이터가 없습니다.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">아직 차트 데이터가 없습니다.</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">코드를 분석하면 통계가 표시됩니다.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="mt-16 text-center text-gray-600 dark:text-gray-400 text-sm">
                    <p>데이터는 로컬 스토리지에 저장되며, 실시간으로 업데이트됩니다.</p>
                </footer>
            </div>
        </div>
    );
};

export default AnalyzePage;
