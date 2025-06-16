'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import TaskInput from '@/app/Components/TaskInput';
import TaskList from '@/app/Components/TaskList';
import { toast, Bounce } from 'react-toastify';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status]);

  if (status === 'loading') {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  if (!session) return null;

  const handleAddTask = (title: string) => {
    setTasks([{ title, id: crypto.randomUUID(), completed: false }, ...tasks]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));

    toast.error('🗑️ Task deleted!', {
      theme: 'colored',
      transition: Bounce,
      position: 'top-center',
    });
  };

  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const toggledTask = updatedTasks.find((task) => task.id === id);
    if (toggledTask?.completed) {
      toast.success('✅ Task marked as completed!', {
        theme: 'colored',
        transition: Bounce,
        position: 'top-center',
      });
    } else {
      toast.info('↩️ Task marked as incomplete.', {
        theme: 'colored',
        transition: Bounce,
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <main className="p-6 sm:p-10 max-w-2xl mx-auto text-white bg-[#111827] min-h-screen shadow-2xl rounded-xl relative">
        <button
          onClick={() => signOut()}
          className="absolute top-5 right-5 bg-red-500 hover:bg-red-400 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>

        <h1 className="text-4xl font-bold mb-6 text-yellow-400 text-center">
  Welcome  👋 let’s manage your tasks! 📝
</h1>


        <TaskInput onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleComplete}
        />

      </main>
    </>
  );
}
