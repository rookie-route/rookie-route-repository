const LoadingSpinner = ({ message = "Analyzing your code..." }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fadeIn">
            <div className="p-12">
                <div className="flex flex-col items-center justify-center space-y-6">
                    {/* Animated Spinner */}
                    <div className="relative">
                        {/* Outer Ring */}
                        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
                        {/* Spinning Ring */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
                        {/* Inner Circle */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg className="w-8 h-8 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{message}</h3>
                        <p className="text-gray-600 text-sm">This may take a few moments</p>
                    </div>

                    {/* Loading Dots Animation */}
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>

                    {/* Progress Steps */}
                    <div className="w-full max-w-md">
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span>Code received</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                                <span>AI analyzing patterns...</span>
                            </div>
                            <div className="flex items-center space-x-2 opacity-50">
                                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                                <span>Generating feedback</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
