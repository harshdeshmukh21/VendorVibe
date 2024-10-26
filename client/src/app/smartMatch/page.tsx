"use client"
import { Input } from '@/components/ui/input';
import { Mic } from 'lucide-react';
import React from 'react';

const Page = () => {
    const handleMicClick = () => {
        console.log('Microphone clicked');
    };

    return (
        <div className='w-full flex-col h-screen items-center justify-center flex'>
            <h1 className='text-xl font-bold mb-4'>Smart Match</h1>
            <div className='flex justify-center w-full '>
                <Input placeholder='I want a.....' className='flex-grow w-full rounded-full' />
                <button
                    onClick={handleMicClick}
                    className='ml-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600'
                >
                    <Mic size={20} />
                </button>
            </div>
        </div>
    );
};

export default Page;