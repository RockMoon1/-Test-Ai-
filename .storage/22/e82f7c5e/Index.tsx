import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/layout/Navigation';
import TaskBoardDemo from '@/components/demos/TaskBoardDemo';
import NotificationCustomizer from '@/components/demos/NotificationCustomizer';
import StreakTracker from '@/components/demos/StreakTracker';
import StudySessionSimulator from '@/components/demos/StudySessionSimulator';
import { 
  Sparkles, 
  Target, 
  Bell, 
  TrendingUp, 
  Play, 
  Brain,
  Calendar,
  MessageCircle,
  Smartphone,
  Cloud,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Heart,
  Shield
} from 'lucide-react';

export default function Index() {
  const [activeDemo, setActiveDemo] = useState<string>('overview');

  const features = [
    {
      icon: Target,
      title: 'Smart Task Organization',
      description: 'AI-powered categorization of assignments, projects, and personal goals with intelligent priority suggestions.',
      color: 'bg-blue-500',
      demo: 'task-board'
    },
    {
      icon: Bell,
      title: 'Customizable Notifications',
      description: 'Choose from Standard, Messaging, or Snapchat-style notifications with personalized tones and timing.',
      color: 'bg-purple-500',
      demo: 'notifications'
    },
    {
      icon: TrendingUp,
      title: 'Gamified Streak Tracker',
      description: 'Build positive habits with visual progress tracking, achievements, and motivational messaging.',
      color: 'bg-green-500',
      demo: 'streak-tracker'
    },
    {
      icon: Play,
      title: 'Study Session Simulator',
      description: 'Structured focus sessions with Pomodoro, deep work, and review modes plus distraction management.',
      color: 'bg-orange-500',
      demo: 'study-sessions'
    },
    {
      icon: Cloud,
      title: 'Cloud Integration',
      description: 'Seamless sync with Google Docs, Drive, and other cloud storage platforms for unified workflow.',
      color: 'bg-cyan-500',
      demo: 'integrations'
    },
    {
      icon: Heart,
      title: 'Personal Growth Focus',
      description: 'Balanced approach encouraging Bible study, hobbies, and spiritual development alongside academics.',
      color: 'bg-pink-500',
      demo: 'personal-growth'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      avatar: '/avatars/sarah.jpg',
      quote: 'StudyMate AI completely transformed how I manage my coursework. The streak tracker keeps me motivated!',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Pre-Med Student',
      avatar: '/avatars/marcus.jpg',
      quote: 'The notification customization is perfect. I can stay focused during study sessions without being overwhelmed.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Psychology Major',
      avatar: '/avatars/emma.jpg',
      quote: 'I love how it balances academic goals with personal growth. The spiritual focus features are amazing!',
      rating: 5
    }
  ];

  const stats = [
    { label: 'Active Students', value: '50K+', icon: Users },
    { label: 'Tasks Completed', value: '2M+', icon: CheckCircle },
    { label: 'Study Hours', value: '500K+', icon: Clock },
    { label: 'Achievements Earned', value: '100K+', icon: Award }
  ];

  const integrations = [
    { name: 'Google Docs', icon: '📄', status: 'Available' },
    { name: 'Google Drive', icon: '💾', status: 'Available' },
    { name: 'Microsoft Office', icon: '📊', status: 'Coming Soon' },
    { name: 'Notion', icon: '📝', status: 'Available' },
    { name: 'Spotify', icon: '🎵', status: 'Available' },
    { name: 'Canvas LMS', icon: '🎓', status: 'Coming Soon' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-700 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Study Assistant
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                Your Personal
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Study Companion
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                StudyMate AI helps college students organize tasks, build positive habits, and maintain 
                a healthy balance between academic excellence and personal growth.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3"
                onClick={() => setActiveDemo('task-board')}
              >
                Try Interactive Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3">
                Watch Video Tour
                <Play className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover powerful features designed specifically for college students who want to excel 
              academically while maintaining personal growth and spiritual development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                onClick={() => setActiveDemo(feature.demo)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                    Try Interactive Demo
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Interactive Demos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience all features firsthand with our fully interactive demonstrations
            </p>
          </div>

          <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="task-board" id="task-board">Task Board</TabsTrigger>
              <TabsTrigger value="notifications" id="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="streak-tracker" id="streak-tracker">Streak Tracker</TabsTrigger>
              <TabsTrigger value="study-sessions" id="study-sessions">Study Sessions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Smartphone className="w-5 h-5" />
                      <span>Mobile-First Design</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm opacity-90">StudyMate AI</span>
                          <Badge className="bg-white/20 text-white">4.9★</Badge>
                        </div>
                        <h3 className="text-lg font-semibold">Today's Focus</h3>
                        <div className="space-y-2">
                          <div className="bg-white/20 rounded p-2 text-sm">
                            📚 Complete React Project - Due tomorrow
                          </div>
                          <div className="bg-white/20 rounded p-2 text-sm">
                            🙏 Morning Bible Study - 7 day streak!
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Responsive design that works perfectly on all devices, from smartphones to desktop computers.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI-Powered Intelligence</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <Zap className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-medium text-sm">Smart Priority Detection</div>
                          <div className="text-xs text-gray-600">Automatically categorizes tasks by urgency</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <Target className="w-5 h-5 text-green-500" />
                        <div>
                          <div className="font-medium text-sm">Personalized Recommendations</div>
                          <div className="text-xs text-gray-600">Suggests optimal study schedules</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                        <Heart className="w-5 h-5 text-purple-500" />
                        <div>
                          <div className="font-medium text-sm">Holistic Approach</div>
                          <div className="text-xs text-gray-600">Balances academic and personal growth</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cloud className="w-5 h-5" />
                    <span>Seamless Integrations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {integrations.map((integration, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <div className="font-medium text-sm">{integration.name}</div>
                          <Badge 
                            variant={integration.status === 'Available' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {integration.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="task-board">
              <TaskBoardDemo />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationCustomizer />
            </TabsContent>

            <TabsContent value="streak-tracker">
              <StreakTracker />
            </TabsContent>

            <TabsContent value="study-sessions">
              <StudySessionSimulator />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Loved by Students Everywhere
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what students are saying about their experience with StudyMate AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Study Experience?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of students who are already achieving more with StudyMate AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
              Schedule Demo
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm opacity-75">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">StudyMate AI</span>
              </div>
              <p className="text-gray-400">
                Empowering college students to achieve academic excellence while maintaining personal growth and spiritual development.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Integrations</div>
                <div>API</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Community</div>
                <div>Status</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StudyMate AI. All rights reserved. Built with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}