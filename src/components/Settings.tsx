
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, User, Bell, Database, Key, Shield } from "lucide-react";

export const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    updates: true
  });

  const [apiKeys, setApiKeys] = useState({
    spotify: "sk_test_••••••••••••••••",
    agency: "ag_live_••••••••••••••••",
    crypto: "cr_prod_••••••••••••••••"
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Settings & Admin</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
          <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-600">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-purple-600">
            Integrations
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-purple-600">
            Security
          </TabsTrigger>
          <TabsTrigger value="admin" className="data-[state=active]:bg-purple-600">
            Admin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue="Record"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Manager"
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="manager@cargesrecords.com"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-300">Company</Label>
                <Input
                  id="company"
                  defaultValue="Carges Records"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-slate-300">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                    <SelectItem value="cet">Central European Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Email Notifications</h3>
                  <p className="text-slate-400 text-sm">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Push Notifications</h3>
                  <p className="text-slate-400 text-sm">Receive browser push notifications</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Marketing Updates</h3>
                  <p className="text-slate-400 text-sm">Receive marketing and promotional content</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Product Updates</h3>
                  <p className="text-slate-400 text-sm">Receive updates about new features</p>
                </div>
                <Switch
                  checked={notifications.updates}
                  onCheckedChange={(checked) => setNotifications({...notifications, updates: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="spotifyKey" className="text-slate-300">Spotify API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="spotifyKey"
                    value={apiKeys.spotify}
                    className="bg-slate-700 border-slate-600 text-white flex-1"
                    readOnly
                  />
                  <Button variant="outline">Update</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="agencyKey" className="text-slate-300">Agency API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="agencyKey"
                    value={apiKeys.agency}
                    className="bg-slate-700 border-slate-600 text-white flex-1"
                    readOnly
                  />
                  <Button variant="outline">Update</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cryptoKey" className="text-slate-300">Crypto API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="cryptoKey"
                    value={apiKeys.crypto}
                    className="bg-slate-700 border-slate-600 text-white flex-1"
                    readOnly
                  />
                  <Button variant="outline">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-slate-300">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-300">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              
              <Button className="bg-purple-600 hover:bg-purple-700">
                Update Password
              </Button>
              
              <hr className="border-slate-600" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                  <p className="text-slate-400 text-sm">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5" />
                System Administration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Database Status</h3>
                  <p className="text-green-400 text-sm">✓ Connected</p>
                  <p className="text-slate-400 text-sm">Last backup: 2 hours ago</p>
                </div>
                
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <h3 className="text-white font-medium mb-2">API Status</h3>
                  <p className="text-green-400 text-sm">✓ All services operational</p>
                  <p className="text-slate-400 text-sm">Uptime: 99.9%</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">System Actions</h3>
                <div className="flex gap-2">
                  <Button variant="outline">Backup Database</Button>
                  <Button variant="outline">Clear Cache</Button>
                  <Button variant="outline">Export Data</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-white font-medium">User Management</h3>
                <div className="flex gap-2">
                  <Button variant="outline">Manage Users</Button>
                  <Button variant="outline">View Audit Log</Button>
                  <Button variant="outline">Access Reports</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
