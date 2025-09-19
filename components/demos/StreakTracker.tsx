import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Flame, Trophy, Target, Star, Award } from 'lucide-react';
import { 
  Habit, 
  Achievement, 
  sampleHabits, 
  sampleAchievements, 
  getCategoryColor,
  generateMotivationalMessage 
} from '@/lib/demoData';

const StreakTracker = () => {
  const [habits, setHabits] = useState<Habit[]>(sampleHabits);
  const [achievements, setAchievements] = useState<Achievement[]>(sampleAchievements);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [celebrationVisible, setCelebrationVisible] = useState<string | null>(null);

  const toggleHabitCompletion = (habitId: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const wasCompleted = habit.completedToday;
          const newStreak = wasCompleted ? Math.max(0, habit.currentStreak - 1) : habit.currentStreak + 1;
          const newLongestStreak = Math.max(habit.longestStreak, newStreak);
          
          // Show celebration for new streaks
          if (!wasCompleted && newStreak > 0 && newStreak % 7 === 0) {
            setCelebrationVisible(habitId);
            setTimeout(() => setCelebrationVisible(null), 3000);
          }
          
          return {
            ...habit,
            completedToday: !wasCompleted,
            currentStreak: newStreak,
            longestStreak: newLongestStreak
          };
        }
        return habit;
      })
    );
  };

  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return { level: 'Master', color: 'text-purple-600', bgColor: 'bg-purple-100' };
    if (streak >= 21) return { level: 'Expert', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (streak >= 14) return { level: 'Advanced', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (streak >= 7) return { level: 'Intermediate', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (streak >= 3) return { level: 'Beginner', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: 'Starting', color: 'text-gray-600', bgColor: 'bg-gray-100' };
  };

  const generateCalendarData = (habit: Habit) => {
    const today = new Date();
    const days = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simulate completion data
      const isCompleted = i === 0 ? habit.completedToday : Math.random() > 0.3;
      days.push({
        date,
        completed: isCompleted,
        dayOfWeek: date.getDay(),
        dayOfMonth: date.getDate()
      });
    }
    
    return days;
  };

  const HabitCard = ({ habit }: { habit: Habit }) => {
    const streakLevel = getStreakLevel(habit.currentStreak);
    const progressToNextLevel = ((habit.currentStreak % 7) / 7) * 100;
    
    return (
      <Card className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        selectedHabit?.id === habit.id ? 'ring-2 ring-blue-500' : ''
      } ${celebrationVisible === habit.id ? 'animate-pulse' : ''}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{habit.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900">{habit.name}</h3>
                <Badge className={`${getCategoryColor(habit.category)} text-white text-xs`}>
                  {habit.category}
                </Badge>
              </div>
            </div>
            <Button
              size="sm"
              variant={habit.completedToday ? "default" : "outline"}
              onClick={() => toggleHabitCompletion(habit.id)}
              className={habit.completedToday ? "bg-green-500 hover:bg-green-600" : ""}
            >
              {habit.completedToday ? "✓ Done" : "Mark Done"}
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">Current Streak</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-orange-500">{habit.currentStreak}</span>
                <span className="text-sm text-gray-500">days</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">Best Streak</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-yellow-500">{habit.longestStreak}</span>
                <span className="text-sm text-gray-500">days</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Level Progress</span>
                <Badge className={`${streakLevel.bgColor} ${streakLevel.color} text-xs`}>
                  {streakLevel.level}
                </Badge>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
              <p className="text-xs text-gray-500">
                {7 - (habit.currentStreak % 7)} days to next level
              </p>
            </div>
            
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-600 italic">
                {generateMotivationalMessage(habit.currentStreak, habit.name)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const CalendarHeatMap = ({ habit }: { habit: Habit }) => {
    const calendarData = generateCalendarData(habit);
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    return (
      <div className="space-y-4">
        <h4 className="font-medium">30-Day Activity</h4>
        <div className="grid grid-cols-7 gap-1 text-xs text-center">
          {weekDays.map((day, index) => (
            <div key={index} className="p-1 font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarData.map((day, index) => (
            <div
              key={index}
              className={`aspect-square rounded text-xs flex items-center justify-center font-medium ${
                day.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
              title={`${day.date.toDateString()}: ${day.completed ? 'Completed' : 'Missed'}`}
            >
              {day.dayOfMonth}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-100 rounded"></div>
            <div className="w-3 h-3 bg-green-200 rounded"></div>
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <div className="w-3 h-3 bg-green-500 rounded"></div>
          </div>
          <span>More</span>
        </div>
      </div>
    );
  };

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
    const rarityColors = {
      common: 'border-gray-300 bg-gray-50',
      rare: 'border-blue-300 bg-blue-50',
      epic: 'border-purple-300 bg-purple-50',
      legendary: 'border-yellow-300 bg-yellow-50'
    };
    
    return (
      <Card className={`${rarityColors[achievement.rarity]} ${achievement.earned ? 'opacity-100' : 'opacity-50'}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="text-2xl">{achievement.icon}</div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{achievement.name}</h4>
              <p className="text-xs text-gray-600">{achievement.description}</p>
            </div>
            {achievement.earned && (
              <Badge className="bg-green-500 text-white text-xs">
                <Award className="w-3 h-3 mr-1" />
                Earned
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs capitalize">
              {achievement.rarity}
            </Badge>
            <Badge className={`${getCategoryColor(achievement.category)} text-white text-xs`}>
              {achievement.category}
            </Badge>
          </div>
          {achievement.earned && achievement.earnedDate && (
            <p className="text-xs text-gray-500 mt-2">
              Earned {achievement.earnedDate.toLocaleDateString()}
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Streak Tracker</h2>
          <p className="text-gray-600">Build positive habits and track your progress</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {habits.reduce((sum, habit) => sum + habit.currentStreak, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {habits.filter(h => h.completedToday).length}
            </div>
            <div className="text-sm text-gray-600">Completed Today</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="habits" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="habits">My Habits</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="habits" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {habits.map((habit) => (
              <Card key={habit.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-xl">{habit.icon}</span>
                    <span>{habit.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarHeatMap habit={habit} />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Progress Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {achievements.filter(a => a.earned).length}
                  </div>
                  <div className="text-sm text-gray-600">Achievements Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((achievements.filter(a => a.earned).length / achievements.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {achievements.filter(a => a.earned && a.rarity === 'epic').length}
                  </div>
                  <div className="text-sm text-gray-600">Epic Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {achievements.filter(a => a.earned && a.rarity === 'legendary').length}
                  </div>
                  <div className="text-sm text-gray-600">Legendary</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Celebration Modal */}
      {celebrationVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4 animate-in zoom-in duration-300">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Streak Milestone!</h3>
              <p className="text-gray-600 mb-4">
                Congratulations on reaching a new streak milestone! Keep up the amazing work!
              </p>
              <Button onClick={() => setCelebrationVisible(null)}>
                Awesome!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StreakTracker;