import React from 'react';

const FixedTextArea = () => {
    return (
        <div className="fixed bottom-6 left-[55%]  -translate-x-1/2 w-[40%] px-4">
            <div className="relative flex items-center justify-center">
                <textarea
                    className="w-full h-12 px-4 py-2 bg-white rounded-full border border-gray-200 
                   resize-none text-gray-800 placeholder-gray-400 text-sm
                   focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
                   shadow-sm"
                    placeholder="Type your message here..."
                />
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-black 
                   hover:bg-black rounded-full text-white text-sm transition-colors 
                   duration-200 ease-in-out"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default FixedTextArea;