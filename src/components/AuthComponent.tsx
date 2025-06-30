
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogIn, UserPlus, Book } from 'lucide-react';

const AuthComponent = () => {
  return (
    <>
      <SignedOut>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to EduPlatform
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Access your courses and learning materials
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <SignInButton mode="modal" fallbackRedirectUrl="/">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="lg">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <SignUpButton mode="modal" fallbackRedirectUrl="/">
                <Button variant="outline" className="w-full" size="lg">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              </SignUpButton>
            </CardContent>
          </Card>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Book className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    EduPlatform
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10"
                      }
                    }}
                    showName
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Main Content - This will be replaced with the actual LMS content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome to Your Learning Dashboard</h2>
              <p className="text-muted-foreground">You are now signed in and can access all features.</p>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default AuthComponent;
