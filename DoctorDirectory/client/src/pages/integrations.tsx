import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Calendar, 
  MessageSquare, 
  ChevronRight, 
  ArrowRight, 
  Check, 
  X,
  Shield
} from "lucide-react";

export default function IntegrationsPage() {
  const { toast } = useToast();
  const [gmailConnected, setGmailConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [discordConnected, setDiscordConnected] = useState(false);
  
  // Set to true when any oauth flow is in progress
  const [connecting, setConnecting] = useState(false);
  
  const connectGmail = () => {
    setConnecting(true);
    // Simulate OAuth process
    setTimeout(() => {
      setGmailConnected(true);
      setConnecting(false);
      toast({
        title: "Gmail Connected Successfully",
        description: "Your Gmail account has been linked to Doctor Finder.",
      });
    }, 1500);
  };
  
  const connectCalendar = () => {
    setConnecting(true);
    // Simulate OAuth process
    setTimeout(() => {
      setCalendarConnected(true);
      setConnecting(false);
      toast({
        title: "Google Calendar Connected Successfully",
        description: "Your Google Calendar has been linked to Doctor Finder.",
      });
    }, 1500);
  };
  
  const connectDiscord = () => {
    setConnecting(true);
    // Simulate OAuth process
    setTimeout(() => {
      setDiscordConnected(true);
      setConnecting(false);
      toast({
        title: "Discord Connected Successfully",
        description: "Your Discord account has been linked to Doctor Finder.",
      });
    }, 1500);
  };
  
  const disconnectService = (service: string) => {
    switch (service) {
      case 'gmail':
        setGmailConnected(false);
        toast({
          title: "Gmail Disconnected",
          description: "Your Gmail account has been unlinked from Doctor Finder.",
        });
        break;
      case 'calendar':
        setCalendarConnected(false);
        toast({
          title: "Google Calendar Disconnected",
          description: "Your Google Calendar has been unlinked from Doctor Finder.",
        });
        break;
      case 'discord':
        setDiscordConnected(false);
        toast({
          title: "Discord Disconnected",
          description: "Your Discord account has been unlinked from Doctor Finder.",
        });
        break;
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">Integrations</h1>
        <p className="text-neutral-600 mt-2">
          Connect your accounts to enhance your Doctor Finder experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gmail Integration */}
        <Card className="overflow-hidden border-primary/10 transition-all hover:shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/70 to-secondary/70"></div>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>Gmail</CardTitle>
              </div>
              <div>
                {gmailConnected ? (
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    Connected
                  </div>
                ) : (
                  <div className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full flex items-center">
                    <X className="w-3 h-3 mr-1" />
                    Not Connected
                  </div>
                )}
              </div>
            </div>
            <CardDescription className="mt-2">
              Connect your Gmail account to receive appointment confirmations, reminders, and doctor communication.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-2">
            {gmailConnected && (
              <div className="bg-green-50 rounded-lg p-3 mb-4 flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-3">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Account Linked</h4>
                  <p className="text-xs text-green-700 mt-1">
                    Your Gmail account has been successfully connected. You will receive email notifications for appointments and updates.
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="gmail-notifications" className="text-sm flex items-center">
                  <span className="mr-2">Email Notifications</span>
                </Label>
                <Switch 
                  id="gmail-notifications" 
                  checked={gmailConnected} 
                  disabled={!gmailConnected || connecting}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="gmail-doctor-comms" className="text-sm flex items-center">
                  <span className="mr-2">Doctor Communications</span>
                </Label>
                <Switch 
                  id="gmail-doctor-comms" 
                  checked={gmailConnected} 
                  disabled={!gmailConnected || connecting} 
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-2 flex justify-end">
            {gmailConnected ? (
              <Button 
                variant="outline"
                onClick={() => disconnectService('gmail')}
                disabled={connecting}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                onClick={connectGmail}
                disabled={connecting}
                className="bg-gradient-to-r from-primary to-secondary text-white"
              >
                {connecting ? 'Connecting...' : 'Connect Gmail'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Google Calendar Integration */}
        <Card className="overflow-hidden border-primary/10 transition-all hover:shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/70 to-secondary/70"></div>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>Google Calendar</CardTitle>
              </div>
              <div>
                {calendarConnected ? (
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    Connected
                  </div>
                ) : (
                  <div className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full flex items-center">
                    <X className="w-3 h-3 mr-1" />
                    Not Connected
                  </div>
                )}
              </div>
            </div>
            <CardDescription className="mt-2">
              Sync doctor appointments with your Google Calendar. Get reminders and manage your schedule efficiently.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-2">
            {calendarConnected && (
              <div className="bg-green-50 rounded-lg p-3 mb-4 flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-3">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Calendar Synced</h4>
                  <p className="text-xs text-green-700 mt-1">
                    Your appointments will be synced with Google Calendar automatically. You'll receive reminders based on your calendar settings.
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="calendar-sync" className="text-sm flex items-center">
                  <span className="mr-2">Appointment Sync</span>
                </Label>
                <Switch 
                  id="calendar-sync" 
                  checked={calendarConnected} 
                  disabled={!calendarConnected || connecting}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="calendar-reminders" className="text-sm flex items-center">
                  <span className="mr-2">Calendar Reminders</span>
                </Label>
                <Switch 
                  id="calendar-reminders" 
                  checked={calendarConnected} 
                  disabled={!calendarConnected || connecting} 
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-2 flex justify-end">
            {calendarConnected ? (
              <Button 
                variant="outline"
                onClick={() => disconnectService('calendar')}
                disabled={connecting}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                onClick={connectCalendar}
                disabled={connecting}
                className="bg-gradient-to-r from-primary to-secondary text-white"
              >
                {connecting ? 'Connecting...' : 'Connect Calendar'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {/* Discord Integration */}
        <Card className="overflow-hidden border-primary/10 transition-all hover:shadow-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/70 to-secondary/70"></div>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <CardTitle>Discord</CardTitle>
              </div>
              <div>
                {discordConnected ? (
                  <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                    <Check className="w-3 h-3 mr-1" />
                    Connected
                  </div>
                ) : (
                  <div className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full flex items-center">
                    <X className="w-3 h-3 mr-1" />
                    Not Connected
                  </div>
                )}
              </div>
            </div>
            <CardDescription className="mt-2">
              Receive appointment notifications and quick updates via Discord. Join healthcare communities.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-2">
            {discordConnected && (
              <div className="bg-green-50 rounded-lg p-3 mb-4 flex items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-3">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">Discord Connected</h4>
                  <p className="text-xs text-green-700 mt-1">
                    You'll receive Discord notifications for appointment updates and doctor messages.
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="discord-notifications" className="text-sm flex items-center">
                  <span className="mr-2">Discord Notifications</span>
                </Label>
                <Switch 
                  id="discord-notifications" 
                  checked={discordConnected} 
                  disabled={!discordConnected || connecting}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="discord-reminders" className="text-sm flex items-center">
                  <span className="mr-2">Appointment Reminders</span>
                </Label>
                <Switch 
                  id="discord-reminders" 
                  checked={discordConnected} 
                  disabled={!discordConnected || connecting} 
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="pt-2 flex justify-end">
            {discordConnected ? (
              <Button 
                variant="outline"
                onClick={() => disconnectService('discord')}
                disabled={connecting}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Disconnect
              </Button>
            ) : (
              <Button 
                onClick={connectDiscord}
                disabled={connecting}
                className="bg-gradient-to-r from-primary to-secondary text-white"
              >
                {connecting ? 'Connecting...' : 'Connect Discord'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Integration Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-primary/10">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold">Email Integration</h3>
            </div>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-primary mr-1 flex-shrink-0 mt-0.5" />
                <span>Receive appointment confirmations</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-primary mr-1 flex-shrink-0 mt-0.5" />
                <span>Get doctor messages and updates</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-primary mr-1 flex-shrink-0 mt-0.5" />
                <span>Medical reports delivered securely</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-primary/10">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold">Calendar Benefits</h3>
            </div>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-primary mr-1 flex-shrink-0 mt-0.5" />
                <span>Automated appointment scheduling</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-primary mr-1 flex-shrink-0 mt-0.5" />
                <span>Smart reminders before appointments</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-primary mr-1 flex-shrink-0 mt-0.5" />
                <span>Manage all medical visits in one place</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-primary/10">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-semibold">Discord Advantages</h3>
            </div>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-primary mr-1 flex-shrink-0 mt-0.5" />
                <span>Real-time appointment notifications</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-primary mr-1 flex-shrink-0 mt-0.5" />
                <span>Join health & wellness communities</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="w-4 h-4 text-primary mr-1 flex-shrink-0 mt-0.5" />
                <span>Quick access to support channels</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}