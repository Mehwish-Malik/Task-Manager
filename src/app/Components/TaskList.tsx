'use client';

import { FaTrash, FaCheckCircle } from 'react-icons/fa';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export default function TaskList({ tasks, onDelete, onToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-400">No tasks available. Add one above!</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task, index) => (
        <li
          key={task.id}
          className={`flex justify-between items-center p-4 rounded-lg shadow-md transition ${
            task.completed ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'
          }`}
        >
          <span className={`text-lg font-medium ${task.completed ? 'line-through opacity-70' : ''}`}>
            {index + 1}. {task.title}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => onToggle(task.id)}
              title="Mark as Complete"
              className="text-green-300 hover:text-green-100 transition"
            >
              <FaCheckCircle size={20} />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              title="Delete Task"
              className="text-red-400 hover:text-red-200 transition"
            >
              <FaTrash size={20} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
