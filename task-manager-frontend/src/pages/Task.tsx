import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById, deleteTask } from "@/api/task";
import type { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/DeleteDialog";
import { ArrowLeft, Clock, Flag, CheckCircle2, Loader2, Pen } from 'lucide-react';

export default function Task() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
        setLoading(false);
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Failed to load task');
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteTask(id);
      navigate("/dashboard");
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 flex items-center justify-center">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-red-300">
          {error}
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 flex items-center justify-center">
        <div className="text-gray-300">No task found.</div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done': return 'text-green-400 bg-green-900/20';
      case 'in progress': return 'text-blue-400 bg-blue-900/20';
      case 'pending': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="ghost"
          className="mb-6 text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-2xl font-bold text-white">{task.name}</h1>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => navigate(`/task/edit/${task._id}`)}
                className="text-gray-300 hover:text-white hover:bg-gray-800 bg-gray-900"
              >
                <Pen className=" h-4 w-4" />
              </Button>
              <DeleteDialog onDelete={handleDelete} />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-medium text-gray-400 mb-2">Description</h2>
              <p className="text-gray-200">{task.description || "No description provided."}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-gray-400" />
                  <h2 className="text-sm font-medium text-gray-400">Status</h2>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>

              <div className="bg-gray-700/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flag className="h-5 w-5 text-gray-400" />
                  <h2 className="text-sm font-medium text-gray-400">Priority</h2>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priorityLevel)}`}>
                  {task.priorityLevel}
                </span>
              </div>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <h2 className="text-sm font-medium text-gray-400">Created At</h2>
              </div>
              <p className="text-gray-200">
                {new Date(task.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}