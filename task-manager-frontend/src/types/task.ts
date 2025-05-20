export interface Task {
  _id: string;
  name: string;
  description: string;
  status: "Pending" | "In Progress" | "Done";
  priorityLevel: "Low" | "Medium" | "High";
  createdAt: string;
  updatedAt: string;
}
