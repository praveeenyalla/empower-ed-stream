
import { useState } from 'react';
import { CheckCircle, XCircle, Award, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the virtual DOM in React?",
      options: [
        "A real representation of the browser DOM",
        "A JavaScript representation of the real DOM kept in memory",
        "A styling framework for React",
        "A database for React applications"
      ],
      correctAnswer: 1,
      explanation: "The virtual DOM is a JavaScript representation of the real DOM that React keeps in memory to optimize rendering performance."
    },
    {
      id: 2,
      question: "Which hook is used to manage state in functional components?",
      options: [
        "useEffect",
        "useContext",
        "useState",
        "useReducer"
      ],
      correctAnswer: 2,
      explanation: "useState is the primary hook for managing local state in functional React components."
    },
    {
      id: 3,
      question: "What is JSX?",
      options: [
        "A JavaScript library",
        "A syntax extension for JavaScript",
        "A CSS framework",
        "A database query language"
      ],
      correctAnswer: 1,
      explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like syntax in your JavaScript code."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPassed = percentage >= 70;

    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${isPassed ? 'bg-green-100' : 'bg-red-100'}`}>
            {isPassed ? (
              <Award className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isPassed ? 'Congratulations!' : 'Quiz Complete'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-blue-600">{percentage}%</div>
            <p className="text-muted-foreground">
              You scored {score} out of {questions.length} questions correctly
            </p>
          </div>

          <Badge variant={isPassed ? "default" : "secondary"} className="text-sm px-4 py-2">
            {isPassed ? 'Passed' : 'Failed'} - {isPassed ? 'Well done!' : 'Try again'}
          </Badge>

          <div className="space-y-3">
            <h3 className="font-semibold">Question Review:</h3>
            {questions.map((q, index) => (
              <div key={q.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  userAnswers[index] === q.correctAnswer ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {userAnswers[index] === q.correctAnswer ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <span className="text-sm">Question {index + 1}</span>
              </div>
            ))}
          </div>

          <Button onClick={resetQuiz} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
            <RefreshCw className="w-4 h-4 mr-2" />
            Take Quiz Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>React Fundamentals Quiz</CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Progress: {Math.round(progress)}%
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? showResult
                      ? index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                    : showResult && index === currentQ.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-red-500 bg-red-500'
                        : 'border-blue-500 bg-blue-500'
                      : showResult && index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  }`}>
                    {showResult && (
                      <>
                        {index === currentQ.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                        {selectedAnswer === index && index !== currentQ.correctAnswer && (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                      </>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
            <p className="text-blue-800">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Score: {score}/{questions.length}
          </div>
          {!showResult ? (
            <Button 
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Quiz;
