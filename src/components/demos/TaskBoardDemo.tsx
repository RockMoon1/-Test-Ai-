import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Calendar, Clock, Tag, GripVertical } from 'lucide-react';
import { Task, sampleTasks, getPriorityColor, getCategoryColor, formatTimeUntilDue } from '@/lib/demoData';

const TaskBoardDemo = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'academic' as Task['category'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    tags: ''
  });
  const [isAddingTask, setIsAddingTask] = useState(false);

  const categories: { id: Task['category']; name: string; color: string }[] = [
    { id: 'academic', name: 'Academic', color: 'bg-blue-500' },
    { id: 'personal', name: 'Personal', color: 'bg-green-500' },
    { id: 'spiritual', name: 'Spiritual', color: 'bg-purple-500' }
  ];

  const getTasksByCategory = (category: Task['category']) => {
    return tasks.filter(task => task.category === category && !task.completed);
  };

  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed);
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetCategory: Task['category'] | 'completed') => {
    e.preventDefault();
    if (!draggedTask) return;

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === draggedTask.id
          ? {
              ...task,
              category: targetCategory === 'completed' ? task.category : targetCategory,
              completed: targetCategory === 'completed'
            }
          : task
      )
    );
    setDraggedTask(null);
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      priority: newTask.priority,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      completed: false,
      tags: newTask.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      estimatedTime: 60
    };

    setTasks(prevTasks => [...prevTasks, task]);
    setNewTask({
      title: '',
      description: '',
      category: 'academic',
      priority: 'medium',
      dueDate: '',
      tags: ''
    });
    setIsAddingTask(false);
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <div
      draggable
      onDragStart={() => handleDragStart(task)}
      className="bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:shadow-md transition-shadow duration-200 group"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
          {task.title}
        </h4>
        <GripVertical className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
          {task.priority.toUpperCase()}
        </Badge>
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          {formatTimeUntilDue(task.dueDate)}
        </div>
      </div>
      
      {task.estimatedTime && (
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <Clock className="w-3 h-3 mr-1" />
          {task.estimatedTime} minutes
        </div>
      )}
      
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              <Tag className="w-2 h-2 mr-1" />
              {tag}
            </Badge>
          ))}
          {task.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{task.tags.length - 3}
            </Badge>
          )}
        </div>
      )}
      
      <Button
        size="sm"
        variant="outline"
        onClick={() => toggleTaskComplete(task.id)}
        className="w-full"
      >
        Mark Complete
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Task Organization Board</h2>
          <p className="text-gray-600">Drag and drop tasks between categories</p>
        </div>
        
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Textarea
                placeholder="Task description (optional)"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select value={newTask.category} onValueChange={(value: Task['category']) => setNewTask({ ...newTask, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="spiritual">Spiritual</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={newTask.priority} onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
              <Input
                placeholder="Tags (comma-separated)"
                value={newTask.tags}
                onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
              />
              <Button onClick={handleAddTask} className="w-full">
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Task Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Category Columns */}
        {categories.map((category) => (
          <Card
            key={category.id}
            className="min-h-[400px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span>{category.name}</span>
                <Badge variant="secondary" className="ml-auto">
                  {getTasksByCategory(category.id).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {getTasksByCategory(category.id).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {getTasksByCategory(category.id).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <p>No tasks in this category</p>
                  <p className="text-sm">Drag tasks here or create new ones</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Completed Tasks Column */}
        <Card
          className="min-h-[400px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'completed')}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span>Completed</span>
              <Badge variant="secondary" className="ml-auto">
                {getCompletedTasks().length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {getCompletedTasks().map((task) => (
              <div
                key={task.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 opacity-75"
              >
                <h4 className="font-medium text-gray-700 line-through">{task.title}</h4>
                <div className="flex items-center justify-between mt-2">
                  <Badge className={`text-xs ${getCategoryColor(task.category)} text-white`}>
                    {task.category}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleTaskComplete(task.id)}
                    className="text-xs"
                  >
                    Undo
                  </Button>
                </div>
              </div>
            ))}
            {getCompletedTasks().length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <p>No completed tasks yet</p>
                <p className="text-sm">Complete tasks to see them here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{tasks.filter(t => !t.completed).length}</div>
            <div className="text-sm text-gray-600">Active Tasks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{getCompletedTasks().length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {tasks.filter(t => !t.completed && t.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(tasks.filter(t => t.completed).length / tasks.length * 100) || 0}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskBoardDemo;