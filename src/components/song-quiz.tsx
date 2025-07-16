import { useState } from "react";
import { Heart, ArrowRight, RotateCcw, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SongQuizProps {
  onSuggestionSelect: (suggestion: string) => void;
}

const quizQuestions = [
  {
    id: 1,
    question: "Qual è il tuo livello di esperienza?",
    options: [
      { text: "Principiante", value: "beginner" },
      { text: "Intermedio", value: "intermediate" },
      { text: "Esperto", value: "expert" },
    ],
  },
  {
    id: 2,
    question: "Che atmosfera vuoi creare?",
    options: [
      { text: "Romantica", value: "romantic" },
      { text: "Energica", value: "party" },
      { text: "Emozionante", value: "emotional" },
      { text: "Rilassata", value: "chill" },
    ],
  },
  {
    id: 3,
    question: "Preferisci cantare...",
    options: [
      { text: "Da solo/a", value: "solo" },
      { text: "In duetto", value: "duet" },
      { text: "In gruppo", value: "group" },
    ],
  },
  {
    id: 4,
    question: "Quale genere preferisci?",
    options: [
      { text: "Pop", value: "pop" },
      { text: "Rock", value: "rock" },
      { text: "Italiano", value: "italian" },
      { text: "R&B/Soul", value: "rnb" },
      { text: "Indie", value: "indie" },
    ],
  },
];

const songRecommendations: Record<string, string[]> = {
  "beginner-romantic-solo-pop": [
    "Ed Sheeran - Perfect",
    "John Legend - All of Me",
    "Adele - Someone Like You",
  ],
  "beginner-party-group-pop": [
    "ABBA - Dancing Queen",
    "Queen - Don't Stop Me Now",
    "Pharrell Williams - Happy",
  ],
  "intermediate-emotional-solo-rock": [
    "Queen - Bohemian Rhapsody",
    "Bon Jovi - Livin' on a Prayer",
    "Journey - Don't Stop Believin'",
  ],
  "expert-party-duet-pop": [
    "Lady Gaga - Shallow",
    "Grease - Summer Nights",
    "Kenny Rogers - Islands in the Stream",
  ],
  "beginner-chill-solo-italian": [
    "Lucio Battisti - Emozioni",
    "Vasco Rossi - Albachiara",
    "Claudio Baglioni - Questo Piccolo Grande Amore",
  ],
  "intermediate-romantic-duet-rnb": [
    "Alicia Keys - Empire State of Mind",
    "John Legend - Ordinary People",
    "Beyoncé - Crazy in Love",
  ],
  "expert-emotional-solo-indie": [
    "Radiohead - Creep",
    "Coldplay - Fix You",
    "Oasis - Wonderwall",
  ],
  // Fallback recommendations
  default: [
    "Neil Diamond - Sweet Caroline",
    "Journey - Don't Stop Believin'",
    "ABBA - Dancing Queen",
    "Oasis - Wonderwall",
    "Frank Sinatra - My Way",
  ],
};

export function SongQuiz({ onSuggestionSelect }: SongQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate recommendations
      generateRecommendations(newAnswers);
    }
  };

  const generateRecommendations = (allAnswers: Record<number, string>) => {
    const key = Object.values(allAnswers).join("-");
    const recs = songRecommendations[key] || songRecommendations["default"];
    setRecommendations(recs);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setRecommendations([]);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (showResults) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4 sm:p-6 text-center">
            <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-green-600 mx-auto mb-3 sm:mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Le tue canzoni perfette!
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Consigli personalizzati per te
            </p>
          </CardContent>
        </Card>

        <div className="space-y-2 sm:space-y-3">
          {recommendations.map((song, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-xs sm:text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                        {song}
                      </p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        Consigliata per te
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => onSuggestionSelect(song)}
                    size="sm"
                    className="text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-auto ml-2"
                  >
                    <Music className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">Cerca</span>
                    <span className="xs:hidden">🔍</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={resetQuiz} variant="outline" className="text-sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Rifai il Quiz
          </Button>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Progress */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-sm sm:text-base">
              Domanda {currentQuestion + 1} di {quizQuestions.length}
            </span>
            {currentQuestion > 0 && (
              <Button
                onClick={goBack}
                variant="outline"
                size="sm"
                className="self-start sm:self-auto"
              >
                Indietro
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6">
            {question.question}
          </h3>

          <div className="space-y-2 sm:space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.value)}
                variant="outline"
                className="w-full justify-start text-left h-auto p-3 sm:p-4 hover:bg-blue-50 hover:border-blue-300"
              >
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                  <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 rounded-full text-xs sm:text-sm font-medium flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-sm sm:text-base text-left">
                    {option.text}
                  </span>
                </div>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-auto flex-shrink-0" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intro card for first question */}
      {currentQuestion === 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> Rispondi sinceramente per consigli
              migliori!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
