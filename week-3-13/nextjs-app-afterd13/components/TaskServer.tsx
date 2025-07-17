import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const TaskServer = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="text-center py-8">
        <h1 className="text-xl font-semibold text-red-600">You are not logged in</h1>
      </div>
    );
  }

  try {
    const response = await fetch("https://server.aptech.io/workspaces/tasks", {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      // Optional: nếu bạn muốn tránh cache ở server
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks: {
      id: string;
      title: string;
      description: string;
      status: string;
    }[] = await response.json();

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 border border-gray-200 rounded shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return (
      <div className="text-center py-8">
        <h1 className="text-xl font-semibold text-red-600">Failed to load tasks.</h1>
      </div>
    );
  }
};

export default TaskServer;
