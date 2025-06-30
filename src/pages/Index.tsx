
import { useState } from 'react';
import { Book, Users, Award, TrendingUp, Play, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseCard from '@/components/CourseCard';
import VideoPlayer from '@/components/VideoPlayer';
import Quiz from '@/components/Quiz';
import CreateCourse from '@/components/CreateCourse';
import StudentProgress from '@/components/StudentProgress';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  // Mock data for demonstration
  const courses = [
    {
      id: 1,
      title: "React Development Fundamentals",
      description: "Learn React from scratch with hands-on projects",
      instructor: "Sarah Johnson",
      duration: "12 hours",
      students: 1250,
      rating: 4.8,
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns",
      description: "Master advanced JavaScript concepts and design patterns",
      instructor: "Mike Chen",
      duration: "8 hours",
      students: 890,
      rating: 4.9,
      progress: 30,
      thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop",
      level: "Advanced"
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Create beautiful and user-friendly interfaces",
      instructor: "Emma Davis",
      duration: "10 hours",
      students: 2100,
      rating: 4.7,
      progress: 0,
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=200&fit=crop",
      level: "Intermediate"
    }
  ];

  const stats = [
    { label: "Total Courses", value: "24", icon: Book, color: "text-blue-600" },
    { label: "Active Students", value: "1,247", icon: Users, color: "text-green-600" },
    { label: "Certificates Earned", value: "892", icon: Award, color: "text-purple-600" },
    { label: "Course Completion", value: "78%", icon: TrendingUp, color: "text-orange-600" }
  ];

  return (
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
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="create">Create Course</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Courses */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-blue-600" />
                  Continue Learning
                </CardTitle>
                <CardDescription>
                  Pick up where you left off in your courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">My Courses</h2>
              <Button onClick={() => setIsCreatingCourse(true)} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Book className="w-4 h-4 mr-2" />
                Enroll in Course
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} detailed />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <CreateCourse />
          </TabsContent>

          <TabsContent value="progress">
            <StudentProgress courses={courses} />
          </TabsContent>

          <TabsContent value="quiz">
            <Quiz />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
