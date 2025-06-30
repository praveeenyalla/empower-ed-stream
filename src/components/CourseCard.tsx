
import { Clock, Users, Star, Play, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  progress: number;
  thumbnail: string;
  level: string;
}

interface CourseCardProps {
  course: Course;
  detailed?: boolean;
}

const CourseCard = ({ course, detailed = false }: CourseCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button size="sm" className="bg-white/90 text-black hover:bg-white">
            <Play className="w-4 h-4 mr-2" />
            Continue
          </Button>
        </div>
        <Badge className={`absolute top-3 right-3 ${getLevelColor(course.level)}`}>
          {course.level}
        </Badge>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-medium">{course.instructor}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
        </div>

        {course.progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        {detailed && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              <BookOpen className="w-4 h-4 mr-2" />
              Details
            </Button>
            <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
              <Play className="w-4 h-4 mr-2" />
              Continue
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;
