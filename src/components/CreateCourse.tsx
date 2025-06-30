
import { useState } from 'react';
import { Plus, Upload, Video, FileText, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const CreateCourse = () => {
  const { toast } = useToast();
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    price: '',
    thumbnail: null as File | null
  });

  const [modules, setModules] = useState([
    { id: 1, title: '', description: '', videoUrl: '', materials: [] }
  ]);

  const addModule = () => {
    const newModule = {
      id: modules.length + 1,
      title: '',
      description: '',
      videoUrl: '',
      materials: []
    };
    setModules([...modules, newModule]);
  };

  const updateModule = (id: number, field: string, value: string) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, [field]: value } : module
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Course Created!",
      description: "Your course has been successfully created and is ready for students.",
    });
    console.log('Course Data:', courseData);
    console.log('Modules:', modules);
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCourseData({ ...courseData, thumbnail: file });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-600" />
            Create New Course
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Course Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  placeholder="Enter course title"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={courseData.category} onValueChange={(value) => setCourseData({ ...courseData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what students will learn"
                value={courseData.description}
                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="level">Difficulty Level</Label>
                <Select value={courseData.level} onValueChange={(value) => setCourseData({ ...courseData, level: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 10 hours"
                  value={courseData.duration}
                  onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={courseData.price}
                  onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                />
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Course Thumbnail</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload course thumbnail</p>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('thumbnail')?.click()}
                >
                  Choose File
                </Button>
                {courseData.thumbnail && (
                  <p className="text-sm text-green-600 mt-2">
                    {courseData.thumbnail.name} selected
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Course Modules */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-blue-600" />
              Course Modules
            </CardTitle>
            <Button onClick={addModule} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Module
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {modules.map((module, index) => (
            <Card key={module.id} className="border-2 border-dashed">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Module {index + 1}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Module Title</Label>
                    <Input
                      placeholder="Enter module title"
                      value={module.title}
                      onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Video URL</Label>
                    <Input
                      placeholder="Enter video URL"
                      value={module.videoUrl}
                      onChange={(e) => updateModule(module.id, 'videoUrl', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Module Description</Label>
                  <Textarea
                    placeholder="Describe this module"
                    value={module.description}
                    onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="flex justify-end gap-4">
            <Button variant="outline">Save as Draft</Button>
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Save className="w-4 h-4 mr-2" />
              Publish Course
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCourse;
