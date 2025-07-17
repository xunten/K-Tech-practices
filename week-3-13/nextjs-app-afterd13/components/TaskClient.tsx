'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface TasksData {
  id: string;
  title: string;
  description: string;
  status: string;
}

const TasksClient = () => {
  const { data: session, status } = useSession();

  const [data, setData] = useState<TasksData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'authenticated') return;

    const fetchTask = async () => {
      try {
        const res = await fetch('/api/tasks');

        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu task');

        const task = await res.json();
        setData(task.data);
      } catch (err: any) {
        setError(err.message || 'Lỗi không xác định');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [status]);

  if (status === 'loading') return <div className="text-center py-10">Đang xác thực người dùng...</div>;
  if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!data || data.length === 0) return <div className="text-center py-10">Không có dữ liệu.</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Danh sách Task</h1>
      <ul className="space-y-4">
        {data.map((task) => (
          <li key={task.id} className="p-4 border border-gray-200 rounded shadow-sm bg-white">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm text-gray-500">Trạng thái: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksClient;
