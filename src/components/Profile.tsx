
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Shield } from 'lucide-react';

const Profile = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">No user information available</p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-6 h-6 text-blue-600" />
        <h2 className="text-3xl font-bold">Profile Information</h2>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-blue-200"
            />
            <div>
              <CardTitle className="text-2xl">
                {user.fullName || `${user.firstName} ${user.lastName}`.trim() || 'User'}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {user.primaryEmailAddress?.emailAddress}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">First Name</label>
                  <p className="text-base">{user.firstName || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                  <p className="text-base">{user.lastName || 'Not provided'}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Username</label>
                  <p className="text-base">{user.username || 'Not set'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Account Details
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <p className="text-base">{formatDate(user.createdAt!)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <p className="text-base">{formatDate(user.updatedAt!)}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">User ID</label>
                  <p className="text-base font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {user.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Email Addresses
            </h3>
            
            <div className="space-y-2">
              {user.emailAddresses.map((email) => (
                <div key={email.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-base">{email.emailAddress}</span>
                  <div className="flex gap-2">
                    {email.id === user.primaryEmailAddress?.id && (
                      <Badge variant="default" className="bg-blue-100 text-blue-800">
                        Primary
                      </Badge>
                    )}
                    <Badge variant={email.verification?.status === 'verified' ? 'default' : 'secondary'}>
                      {email.verification?.status === 'verified' ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
