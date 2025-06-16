'use client';

import { useRef } from 'react';
import { Bounce, toast } from 'react-toastify';

type TaskInputProps = {
  onAddTask: (title: string) => void;
};

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    const inputValue = inputRef.current?.value.trim();

    if (!inputValue) {
      toast.warn('⚠️ Please enter a task!', {
        theme: 'colored',
        transition: Bounce,
        position: 'top-center',
      });
      return;
    }

    onAddTask(inputValue);

    toast.success('✅ Task added successfully!', {
      theme: 'colored',
      transition: Bounce,
      position: 'top-center',
    });

    if (inputRef.current) inputRef.current.value = '';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Enter a new task..."
        className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <button
        onClick={handleAdd}
        className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
      >
        Add
      </button>
    </div>
  );
}
