import React from 'react';
import type { Task } from '@/types/task';
import { Pen, Clock, Flag, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from './DeleteDialog';
import { deleteTask } from '@/api/task';
import { showErrorToast, showSuccessToast } from '@/utils/toast';

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();

  const onDelete = async (taskId: string) => {
    if(!taskId) return;

    try {
      await deleteTask(taskId);
      showSuccessToast("Task deleted successfully");
      navigate('/dashboard');
    } catch(err) {
      console.log('Error deleting task', err);
      showErrorToast("Something went wrong");
    }
  };

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
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h2
            className="text-xl font-semibold text-white hover:text-blue-400 cursor-pointer transition-colors"
            onClick={() => navigate(`/task/${task._id}`)}
          >
            {task.name}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/task/edit/${task._id}`)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all"
            >
              <Pen size={16} />
            </button>
            <DeleteDialog onDelete={() => onDelete(task._id)} />
          </div>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2">{task.description}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-gray-500" />
            <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(task.status)}`}>
              {task.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-gray-500" />
            <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(task.priorityLevel)}`}>
              {task.priorityLevel} Priority
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="h-4 w-4" />
            <span>
              {new Date(task.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;