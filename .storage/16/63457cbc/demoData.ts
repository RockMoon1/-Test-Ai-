// Demo data and types for AI Assistant App showcase

export interface DemoUser {
  id: string;
  name: string;
  avatar: string;
  level: number;
  experience: number;
  streaks: Record<string, number>;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'personal' | 'spiritual';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  completed: boolean;
  tags: string[];
  estimatedTime?: number;
}

export interface Habit {
  id: string;
  name: string;
  category: 'academic' | 'personal' | 'spiritual';
  icon: string;
  color: string;
  targetFrequency: 'daily' | 'weekly';
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
}

export interface NotificationStyle {
  id: string;
  name: 'standard' | 'messaging' | 'snapchat';
  displayName: string;
  tone: 'professional' | 'casual' | 'encouraging' | 'playful';
  emoji: boolean;
  animation: boolean;
  format: 'minimal' | 'conversational' | 'visual';
}

export interface NotificationTemplate {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'achievement' | 'encouragement' | 'milestone';
  variables: Record<string, string>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'academic' | 'personal' | 'spiritual' | 'social';
  earned: boolean;
  earnedDate?: Date;
}

export interface StudySession {
  id: string;
  type: 'pomodoro' | 'deep-work' | 'review';
  duration: number;
  breakDuration: number;
  subject: string;
  completed: boolean;
  focusScore: number;
}

// Demo user data
export const demoUser: DemoUser = {
  id: 'user-1',
  name: 'Sarah Chen',
  avatar: '/avatars/sarah.jpg',
  level: 12,
  experience: 2840,
  streaks: {
    'daily-reading': 7,
    'exercise': 12,
    'prayer': 21,
    'study': 5
  }
};

// Sample tasks
export const sampleTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Complete React Project',
    description: 'Finish the final project for CS 301 - build a task management app',
    category: 'academic',
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    completed: false,
    tags: ['programming', 'react', 'final-project'],
    estimatedTime: 180
  },
  {
    id: 'task-2',
    title: 'Morning Bible Study',
    description: 'Read and reflect on daily devotional - Psalm 23',
    category: 'spiritual',
    priority: 'medium',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    completed: false,
    tags: ['bible', 'devotional', 'morning'],
    estimatedTime: 30
  },
  {
    id: 'task-3',
    title: 'Gym Workout',
    description: 'Upper body strength training session',
    category: 'personal',
    priority: 'medium',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    completed: true,
    tags: ['fitness', 'health', 'strength'],
    estimatedTime: 60
  },
  {
    id: 'task-4',
    title: 'History Essay Draft',
    description: 'Write first draft of World War II analysis paper',
    category: 'academic',
    priority: 'high',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    completed: false,
    tags: ['history', 'essay', 'research'],
    estimatedTime: 120
  },
  {
    id: 'task-5',
    title: 'Call Family',
    description: 'Weekly check-in call with parents and siblings',
    category: 'personal',
    priority: 'low',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    completed: false,
    tags: ['family', 'communication'],
    estimatedTime: 45
  },
  {
    id: 'task-6',
    title: 'Youth Group Planning',
    description: 'Prepare activities for next week\'s youth group meeting',
    category: 'spiritual',
    priority: 'medium',
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    completed: false,
    tags: ['youth-group', 'leadership', 'planning'],
    estimatedTime: 90
  }
];

// Sample habits
export const sampleHabits: Habit[] = [
  {
    id: 'habit-1',
    name: 'Daily Reading',
    category: 'personal',
    icon: '📚',
    color: '#3B82F6',
    targetFrequency: 'daily',
    currentStreak: 7,
    longestStreak: 23,
    completedToday: true
  },
  {
    id: 'habit-2',
    name: 'Exercise',
    category: 'personal',
    icon: '🏃‍♀️',
    color: '#10B981',
    targetFrequency: 'daily',
    currentStreak: 12,
    longestStreak: 18,
    completedToday: true
  },
  {
    id: 'habit-3',
    name: 'Prayer Time',
    category: 'spiritual',
    icon: '🙏',
    color: '#8B5CF6',
    targetFrequency: 'daily',
    currentStreak: 21,
    longestStreak: 45,
    completedToday: false
  },
  {
    id: 'habit-4',
    name: 'Study Session',
    category: 'academic',
    icon: '📖',
    color: '#F59E0B',
    targetFrequency: 'daily',
    currentStreak: 5,
    longestStreak: 14,
    completedToday: true
  },
  {
    id: 'habit-5',
    name: 'Meditation',
    category: 'personal',
    icon: '🧘‍♀️',
    color: '#EC4899',
    targetFrequency: 'daily',
    currentStreak: 3,
    longestStreak: 12,
    completedToday: false
  }
];

// Notification styles
export const notificationStyles: NotificationStyle[] = [
  {
    id: 'standard',
    name: 'standard',
    displayName: 'Standard',
    tone: 'professional',
    emoji: false,
    animation: false,
    format: 'minimal'
  },
  {
    id: 'messaging',
    name: 'messaging',
    displayName: 'Messaging',
    tone: 'casual',
    emoji: true,
    animation: false,
    format: 'conversational'
  },
  {
    id: 'snapchat',
    name: 'snapchat',
    displayName: 'Snapchat Style',
    tone: 'playful',
    emoji: true,
    animation: true,
    format: 'visual'
  }
];

// Notification templates
export const notificationTemplates: NotificationTemplate[] = [
  {
    id: 'assignment-reminder',
    title: 'Assignment Due Soon',
    message: 'Your {{subject}} assignment "{{title}}" is due {{timeUntilDue}}',
    type: 'reminder',
    variables: {
      subject: 'History',
      title: 'World War II Essay',
      timeUntilDue: 'tomorrow'
    }
  },
  {
    id: 'streak-celebration',
    title: 'Streak Achievement!',
    message: 'Amazing! You\'ve maintained your {{habitName}} streak for {{streakCount}} days!',
    type: 'achievement',
    variables: {
      habitName: 'Daily Reading',
      streakCount: '7'
    }
  },
  {
    id: 'study-encouragement',
    title: 'Study Time!',
    message: 'Ready to tackle that {{subject}} study session? You\'ve got this!',
    type: 'encouragement',
    variables: {
      subject: 'Computer Science'
    }
  },
  {
    id: 'break-reminder',
    title: 'Time for a Break',
    message: 'You\'ve been studying for {{duration}} minutes. How about some {{activity}}?',
    type: 'reminder',
    variables: {
      duration: '90',
      activity: 'fresh air or a quick walk'
    }
  }
];

// Sample achievements
export const sampleAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    name: 'First Steps',
    description: 'Complete your first task',
    icon: '🎯',
    rarity: 'common',
    category: 'academic',
    earned: true,
    earnedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'achievement-2',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    rarity: 'rare',
    category: 'personal',
    earned: true,
    earnedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'achievement-3',
    name: 'Spiritual Seeker',
    description: 'Complete 30 days of prayer',
    icon: '✨',
    rarity: 'epic',
    category: 'spiritual',
    earned: false
  },
  {
    id: 'achievement-4',
    name: 'Academic Excellence',
    description: 'Complete 50 academic tasks',
    icon: '🏆',
    rarity: 'legendary',
    category: 'academic',
    earned: false
  }
];

// Study session templates
export const studySessionTemplates: StudySession[] = [
  {
    id: 'session-1',
    type: 'pomodoro',
    duration: 25,
    breakDuration: 5,
    subject: 'Computer Science',
    completed: false,
    focusScore: 0
  },
  {
    id: 'session-2',
    type: 'deep-work',
    duration: 90,
    breakDuration: 15,
    subject: 'History Research',
    completed: false,
    focusScore: 0
  },
  {
    id: 'session-3',
    type: 'review',
    duration: 45,
    breakDuration: 10,
    subject: 'Math Problems',
    completed: false,
    focusScore: 0
  }
];

// Utility functions
export const getPriorityColor = (priority: Task['priority']) => {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-50 border-red-200';
    case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low': return 'text-green-600 bg-green-50 border-green-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getCategoryColor = (category: Task['category'] | Habit['category']) => {
  switch (category) {
    case 'academic': return 'bg-blue-500';
    case 'personal': return 'bg-green-500';
    case 'spiritual': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

export const formatTimeUntilDue = (dueDate: Date) => {
  const now = new Date();
  const diffMs = dueDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return 'Overdue';
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  return `Due in ${diffDays} days`;
};

export const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common': return 'text-gray-600 bg-gray-100';
    case 'rare': return 'text-blue-600 bg-blue-100';
    case 'epic': return 'text-purple-600 bg-purple-100';
    case 'legendary': return 'text-yellow-600 bg-yellow-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const generateMotivationalMessage = (streak: number, habitName: string) => {
  if (streak >= 30) return `Incredible! ${streak} days of ${habitName}. You're unstoppable! 🚀`;
  if (streak >= 14) return `Amazing ${streak}-day streak with ${habitName}! Keep it up! 🔥`;
  if (streak >= 7) return `One week of ${habitName} complete! You're building great habits! ⭐`;
  if (streak >= 3) return `${streak} days of ${habitName}! You're on a roll! 💪`;
  return `Great start with ${habitName}! Every day counts! 🌟`;
};