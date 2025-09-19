import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Clock, 
  Coffee, 
  Brain, 
  Target,
  TrendingUp,
  BookOpen,
  Zap
} from 'lucide-react';
import { StudySession, studySessionTemplates } from '@/lib/demoData';

interface SessionStats {
  focusTime: number;
  breakTime: number;
  distractionsHandled: number;
  completionRate: number;
  sessionsCompleted: number;
}

const StudySessionSimulator = () => {
  const [currentSession, setCurrentSession] = useState<StudySession>(studySessionTemplates[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    focusTime: 0,
    breakTime: 0,
    distractionsHandled: 0,
    completionRate: 85,
    sessionsCompleted: 12
  });
  const [distractions, setDistractions] = useState<string[]>([]);
  const [currentDistraction, setCurrentDistraction] = useState<string | null>(null);

  const distractionTypes = [
    "📱 Phone notification",
    "💬 Social media urge",
    "🍕 Hunger distraction",
    "😴 Feeling tired",
    "🎵 Background noise",
    "💭 Mind wandering",
    "📧 Email notification",
    "🚪 Someone at the door"
  ];

  const breakActivities = [
    "🚶‍♀️ Take a short walk",
    "💧 Drink some water",
    "🧘‍♂️ Do breathing exercises",
    "👀 Look away from screen",
    "🤸‍♀️ Light stretching",
    "🌱 Water your plants",
    "☕ Make a healthy snack",
    "📖 Read a few pages"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeRemaining]);

  useEffect(() => {
    // Simulate random distractions during focus sessions
    if (isRunning && !isBreak && !isPaused) {
      const distractionInterval = setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 10 seconds
          const randomDistraction = distractionTypes[Math.floor(Math.random() * distractionTypes.length)];
          setCurrentDistraction(randomDistraction);
        }
      }, 10000);
      
      return () => clearInterval(distractionInterval);
    }
  }, [isRunning, isBreak, isPaused]);

  const startSession = () => {
    setTimeRemaining(currentSession.duration * 60);
    setIsRunning(true);
    setIsPaused(false);
    setIsBreak(false);
    setDistractions([]);
    setCurrentDistraction(null);
  };

  const pauseSession = () => {
    setIsPaused(!isPaused);
  };

  const stopSession = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(0);
    setIsBreak(false);
    setCurrentDistraction(null);
  };

  const resetSession = () => {
    stopSession();
    setSessionStats(prev => ({
      ...prev,
      focusTime: 0,
      breakTime: 0,
      distractionsHandled: 0
    }));
    setDistractions([]);
  };

  const handleSessionComplete = () => {
    if (isBreak) {
      // Break completed, start next focus session
      setIsBreak(false);
      setTimeRemaining(currentSession.duration * 60);
      setSessionStats(prev => ({
        ...prev,
        breakTime: prev.breakTime + currentSession.breakDuration
      }));
    } else {
      // Focus session completed, start break
      setIsBreak(true);
      setTimeRemaining(currentSession.breakDuration * 60);
      setSessionStats(prev => ({
        ...prev,
        focusTime: prev.focusTime + currentSession.duration,
        sessionsCompleted: prev.sessionsCompleted + 1
      }));
    }
  };

  const handleDistraction = (handled: boolean) => {
    if (handled) {
      setSessionStats(prev => ({
        ...prev,
        distractionsHandled: prev.distractionsHandled + 1
      }));
    }
    setDistractions(prev => [...prev, currentDistraction || 'Unknown distraction']);
    setCurrentDistraction(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionTypeIcon = (type: StudySession['type']) => {
    switch (type) {
      case 'pomodoro': return <Clock className="w-5 h-5" />;
      case 'deep-work': return <Brain className="w-5 h-5" />;
      case 'review': return <BookOpen className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getSessionTypeColor = (type: StudySession['type']) => {
    switch (type) {
      case 'pomodoro': return 'bg-red-500';
      case 'deep-work': return 'bg-blue-500';
      case 'review': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const progress = currentSession.duration > 0 ? 
    ((currentSession.duration * 60 - timeRemaining) / (currentSession.duration * 60)) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Study Session Simulator</h2>
        <p className="text-gray-600">Focus better with structured study sessions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timer */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {getSessionTypeIcon(currentSession.type)}
                  <span>{currentSession.subject}</span>
                </CardTitle>
                <Badge className={`${getSessionTypeColor(currentSession.type)} text-white`}>
                  {currentSession.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Timer Display */}
              <div className="text-center">
                <div className={`text-6xl font-bold mb-4 ${isBreak ? 'text-green-500' : 'text-blue-500'}`}>
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  {isBreak ? '☕ Break Time' : '📚 Focus Time'}
                </div>
                <Progress 
                  value={isBreak ? 
                    ((currentSession.breakDuration * 60 - timeRemaining) / (currentSession.breakDuration * 60)) * 100 :
                    progress
                  } 
                  className="h-3 mb-6" 
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                {!isRunning ? (
                  <Button onClick={startSession} size="lg" className="bg-green-500 hover:bg-green-600">
                    <Play className="w-5 h-5 mr-2" />
                    Start Session
                  </Button>
                ) : (
                  <>
                    <Button onClick={pauseSession} size="lg" variant="outline">
                      {isPaused ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
                      {isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button onClick={stopSession} size="lg" variant="outline">
                      <Square className="w-5 h-5 mr-2" />
                      Stop
                    </Button>
                  </>
                )}
                <Button onClick={resetSession} size="lg" variant="outline">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Current Activity */}
              {isRunning && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  {isBreak ? (
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Suggested Break Activities:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {breakActivities.slice(0, 4).map((activity, index) => (
                          <div key={index} className="text-sm text-gray-600 p-2 bg-white rounded">
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-medium text-blue-700 mb-2">Stay Focused!</h4>
                      <p className="text-sm text-gray-600">
                        You're working on: <span className="font-medium">{currentSession.subject}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Session Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Session Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {studySessionTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      currentSession.id === template.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => !isRunning && setCurrentSession(template)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {getSessionTypeIcon(template.type)}
                      <span className="font-medium capitalize">{template.type}</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Focus: {template.duration} min</div>
                      <div>Break: {template.breakDuration} min</div>
                      <div>Subject: {template.subject}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Session Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Focus Time</span>
                <span className="font-medium">{sessionStats.focusTime} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Break Time</span>
                <span className="font-medium">{sessionStats.breakTime} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sessions Completed</span>
                <span className="font-medium">{sessionStats.sessionsCompleted}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Distractions Handled</span>
                <span className="font-medium">{sessionStats.distractionsHandled}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Focus Score</span>
                  <Badge className="bg-green-500 text-white">
                    {sessionStats.completionRate}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distraction Management */}
          {currentDistraction && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-700">
                  <Zap className="w-5 h-5" />
                  <span>Distraction Alert!</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-orange-600 mb-4">{currentDistraction}</p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleDistraction(true)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Ignore
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDistraction(false)}
                  >
                    Give In
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Distractions */}
          {distractions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Distractions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {distractions.slice(-5).reverse().map((distraction, index) => (
                    <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                      {distraction}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Focus Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Put your phone in another room to avoid distractions</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p>Use noise-canceling headphones or white noise</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <p>Take breaks to maintain focus throughout the day</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p>Stay hydrated and maintain good posture</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudySessionSimulator;