import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Bell, Smartphone, MessageCircle, Camera, Volume2, Vibrate } from 'lucide-react';
import { 
  NotificationStyle, 
  NotificationTemplate, 
  notificationStyles, 
  notificationTemplates 
} from '@/lib/demoData';

const NotificationCustomizer = () => {
  const [selectedStyle, setSelectedStyle] = useState<NotificationStyle>(notificationStyles[0]);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate>(notificationTemplates[0]);
  const [frequency, setFrequency] = useState([3]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [quietHours, setQuietHours] = useState(false);

  const renderNotificationPreview = () => {
    const message = selectedTemplate.message.replace(
      /\{\{(\w+)\}\}/g,
      (match, key) => selectedTemplate.variables[key] || match
    );

    const getStyleClasses = () => {
      switch (selectedStyle.name) {
        case 'standard':
          return 'bg-white border border-gray-200 shadow-lg';
        case 'messaging':
          return 'bg-blue-500 text-white shadow-lg';
        case 'snapchat':
          return 'bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-xl transform rotate-1';
        default:
          return 'bg-white border border-gray-200 shadow-lg';
      }
    };

    const getMessageFormat = () => {
      if (selectedStyle.name === 'messaging') {
        return `${selectedStyle.emoji ? '📚 ' : ''}Hey! ${message}`;
      }
      if (selectedStyle.name === 'snapchat') {
        return `${selectedStyle.emoji ? '🔥 ' : ''}${message} ${selectedStyle.emoji ? '✨' : ''}`;
      }
      return message;
    };

    return (
      <div className={`p-4 rounded-lg max-w-sm mx-auto ${getStyleClasses()} ${selectedStyle.animation ? 'animate-bounce' : ''}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {selectedStyle.name === 'standard' && <Bell className="w-5 h-5 text-blue-500" />}
            {selectedStyle.name === 'messaging' && <MessageCircle className="w-5 h-5 text-white" />}
            {selectedStyle.name === 'snapchat' && <Camera className="w-5 h-5 text-white" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${selectedStyle.name === 'standard' ? 'text-gray-900' : 'text-white'}`}>
              {selectedTemplate.title}
            </p>
            <p className={`text-sm ${selectedStyle.name === 'standard' ? 'text-gray-600' : 'text-white/90'} mt-1`}>
              {getMessageFormat()}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant={selectedStyle.name === 'standard' ? 'secondary' : 'outline'} className="text-xs">
                {selectedTemplate.type}
              </Badge>
              <span className={`text-xs ${selectedStyle.name === 'standard' ? 'text-gray-500' : 'text-white/70'}`}>
                now
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StyleCard = ({ style }: { style: NotificationStyle }) => (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${
        selectedStyle.id === style.id 
          ? 'ring-2 ring-blue-500 bg-blue-50' 
          : 'hover:shadow-md'
      }`}
      onClick={() => setSelectedStyle(style)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          {style.name === 'standard' && <Smartphone className="w-5 h-5 text-gray-600" />}
          {style.name === 'messaging' && <MessageCircle className="w-5 h-5 text-blue-500" />}
          {style.name === 'snapchat' && <Camera className="w-5 h-5 text-pink-500" />}
          <span className="font-medium">{style.displayName}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Tone:</span>
            <Badge variant="outline" className="text-xs">
              {style.tone}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Emoji:</span>
            <span className="text-xs">{style.emoji ? '✅' : '❌'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Animation:</span>
            <span className="text-xs">{style.animation ? '✅' : '❌'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Notification Customizer</h2>
        <p className="text-gray-600">Personalize how you receive notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customization Panel */}
        <div className="space-y-6">
          <Tabs defaultValue="style" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="style" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Notification Style</h3>
                <div className="grid grid-cols-1 gap-3">
                  {notificationStyles.map((style) => (
                    <StyleCard key={style.id} style={style} />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Message Template</h3>
                <Select 
                  value={selectedTemplate.id} 
                  onValueChange={(value) => {
                    const template = notificationTemplates.find(t => t.id === value);
                    if (template) setSelectedTemplate(template);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Template Variables</h4>
                <div className="space-y-2">
                  {Object.entries(selectedTemplate.variables).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">{key}:</span>
                      <span className="text-sm text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Notification Frequency</label>
                      <Badge variant="outline">{frequency[0]}/10</Badge>
                    </div>
                    <Slider
                      value={frequency}
                      onValueChange={setFrequency}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Minimal</span>
                      <span>Frequent</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Sound</span>
                    </div>
                    <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Vibrate className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Vibration</span>
                    </div>
                    <Switch checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium">Quiet Hours (10 PM - 7 AM)</span>
                    </div>
                    <Switch checked={quietHours} onCheckedChange={setQuietHours} />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="w-5 h-5" />
                <span>Live Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                {renderNotificationPreview()}
              </div>
            </CardContent>
          </Card>

          {/* Sample Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notificationTemplates.slice(0, 3).map((template) => (
                <div 
                  key={template.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTemplate.id === template.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{template.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {template.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">
                    {template.message.replace(/\{\{(\w+)\}\}/g, (match, key) => template.variables[key] || match)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Export Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Export Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-3">
                Save Configuration
              </Button>
              <Button variant="outline" className="w-full">
                Export as JSON
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationCustomizer;