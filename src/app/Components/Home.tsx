'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/login');
    }
  }, [router]); // 👈 fix warning by adding router

  return (
    <div>
      {/* Task manager content */}
    </div>
  );
}
