import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import type { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react"; // Removed unused Clock and Flag imports

const ITEMS_PER_PAGE = 6;

// Define sorting order objects outside the component
const priorityOrder = { High: 1, Medium: 2, Low: 3 };
const reversePriorityOrder = { High: 3, Medium: 2, Low: 1 };
const statusOrder = { Done: 1, "In Progress": 2, Pending: 3 };

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string>("newest");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    search: "",
  });

  // Apply filters and sorting whenever tasks, filters, or sortOption changes
  useEffect(() => {
    let result = [...tasks];

    // Apply filters
    if (filters.status && filters.status !== "all") {
      result = result.filter((task) => task.status === filters.status);
    }
    if (filters.priority && filters.priority !== "all") {
      result = result.filter((task) => task.priorityLevel === filters.priority);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (task) =>
          task.name.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "priority-high":
        result.sort((a, b) => priorityOrder[a.priorityLevel] - priorityOrder[b.priorityLevel]);
        break;
      case "priority-low":
        result.sort((a, b) => reversePriorityOrder[a.priorityLevel] - reversePriorityOrder[b.priorityLevel]);
        break;
      case "status":
        result.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
        break;
      default:
        break;
    }

    setFilteredTasks(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [tasks, filters, sortOption]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      priority: "all",
      search: "",
    });
    setSortOption("newest");
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
    <div className="space-y-6">
      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Status</label>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-700/70">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="hover:bg-gray-700/50">All Statuses</SelectItem>
                <SelectItem value="Pending" className="hover:bg-gray-700/50">Pending</SelectItem>
                <SelectItem value="In Progress" className="hover:bg-gray-700/50">In Progress</SelectItem>
                <SelectItem value="Done" className="hover:bg-gray-700/50">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Priority</label>
            <Select
              value={filters.priority}
              onValueChange={(value) => handleFilterChange("priority", value)}
            >
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-700/70">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="hover:bg-gray-700/50">All Priorities</SelectItem>
                <SelectItem value="High" className="hover:bg-gray-700/50">High</SelectItem>
                <SelectItem value="Medium" className="hover:bg-gray-700/50">Medium</SelectItem>
                <SelectItem value="Low" className="hover:bg-gray-700/50">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-400">Search</label>
            <Input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sort Options */}
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium mb-2 text-gray-400">Sort By</label>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-full md:w-[200px] bg-gray-700 border-gray-600 text-white hover:bg-gray-700/70">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="newest" className="hover:bg-gray-700/50">Newest First</SelectItem>
              <SelectItem value="oldest" className="hover:bg-gray-700/50">Oldest First</SelectItem>
              <SelectItem value="priority-high" className="hover:bg-gray-700/50">Priority (High to Low)</SelectItem>
              <SelectItem value="priority-low" className="hover:bg-gray-700/50">Priority (Low to High)</SelectItem>
              <SelectItem value="status" className="hover:bg-gray-700/50">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {(filters.status !== "all" || filters.priority !== "all" || filters.search || sortOption !== "newest") && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-sm text-gray-400 hover:text-white hover:bg-gray-700/50"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Task Count and Summary */}
      <div className="flex items-center gap-4 text-gray-400 text-sm">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4" />
          <span>Total: {filteredTasks.length} tasks</span>
        </div>
        {filters.status !== "all" && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(filters.status)}`}>
            {filters.status}
          </div>
        )}
        {filters.priority !== "all" && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getPriorityColor(filters.priority)}`}>
            {filters.priority} Priority
          </div>
        )}
      </div>

      {/* Task Grid */}
      {paginatedTasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
          <p className="text-gray-400">No tasks found matching your filters.</p>
          {(filters.status !== "all" || filters.priority !== "all" || filters.search) && (
            <Button variant="link" onClick={clearFilters} className="text-gray-400 hover:text-white">
              Clear filters
            </Button>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:text-white"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:text-white"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskList;