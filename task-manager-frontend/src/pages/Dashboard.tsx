import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';
import { getTasks } from '@/api/task';
import type { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { showErrorToast } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
import TaskList from '@/components/TaskList';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks.tasks);
      } catch (error) {
        const err = error as Error;
        showErrorToast(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Welcome back, {user?.email?.split('@')[0] || 'User'} 👋
              </h1>
              <p className="text-gray-400 mt-1">Here's an overview of your tasks</p>
            </div>
            <Button
              onClick={() => navigate('/add-task')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Plus size={20} />
              <span>New Task</span>
            </Button>
          </div>
        </header>

        <main className="pb-12">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : tasks.length > 0 ? (
           <TaskList tasks={tasks} />
          ) : (
            <div className="text-center py-12 bg-gray-800/50 rounded-2xl border border-gray-700">
              <p className="text-gray-400 text-lg">No tasks found</p>
              <p className="text-gray-500 mt-2">Create your first task to get started</p>
              <Button
                onClick={() => navigate('/add-task')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Task
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;