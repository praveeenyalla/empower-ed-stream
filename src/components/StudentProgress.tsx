
import { TrendingUp, Calendar, Award, Clock, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Course {
  id: number;
  title: string;
  progress: number;
  instructor: string;
  level: string;
}

interface StudentProgressProps {
  courses: Course[];
}

const StudentProgress = ({ courses }: StudentProgressProps) => {
  // Mock data for charts
  const weeklyProgress = [
    { week: 'Week 1', hours: 8, completed: 2 },
    { week: 'Week 2', hours: 12, completed: 3 },
    { week: 'Week 3', hours: 10, completed: 4 },
    { week: 'Week 4', hours: 15, completed: 5 },
    { week: 'Week 5', hours: 18, completed: 7 },
    { week: 'Week 6', hours: 14, completed: 6 }
  ];

  const skillDistribution = [
    { name: 'Programming', value: 40, color: '#3B82F6' },
    { name: 'Design', value: 25, color: '#8B5CF6' },
    { name: 'Business', value: 20, color: '#10B981' },
    { name: 'Marketing', value: 15, color: '#F59E0B' }
  ];

  const completedCourses = courses.filter(course => course.progress === 100).length;
  const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100).length;
  const totalHours = 156; // Mock data
  const averageProgress = Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Completed Courses</p>
                <p className="text-3xl font-bold text-green-600">{completedCourses}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">In Progress</p>
                <p className="text-3xl font-bold text-blue-600">{inProgressCourses}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Total Hours</p>
                <p className="text-3xl font-bold text-purple-600">{totalHours}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Average Progress</p>
                <p className="text-3xl font-bold text-orange-600">{averageProgress}%</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Weekly Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skill Distribution */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Skill Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {skillDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {skillDistribution.map((skill, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: skill.color }}
                  />
                  {skill.name} ({skill.value}%)
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress List */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Course Progress Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold">{course.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    by {course.instructor} • {course.level}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex-1 max-w-xs">
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                </div>
                <div className="ml-4">
                  {course.progress === 100 ? (
                    <Badge className="bg-green-100 text-green-800">
                      <Award className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  ) : course.progress > 0 ? (
                    <Badge variant="outline">In Progress</Badge>
                  ) : (
                    <Badge variant="secondary">Not Started</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProgress;
