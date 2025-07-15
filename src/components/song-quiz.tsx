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
    question: "Qual è il tuo livello di esperienza al karaoke?",
    options: [
      { text: "Principiante - è la mia prima volta", value: "beginner" },
      { text: "Intermedio - ho cantato qualche volta", value: "intermediate" },
      { text: "Esperto - sono un veterano del karaoke", value: "expert" },
    ],
  },
  {
    id: 2,
    question: "Che tipo di atmosfera vuoi creare?",
    options: [
      { text: "Romantica e dolce", value: "romantic" },
      { text: "Energica e divertente", value: "party" },
      { text: "Emozionante e potente", value: "emotional" },
      { text: "Rilassata e tranquilla", value: "chill" },
    ],
  },
  {
    id: 3,
    question: "Preferisci cantare...",
    options: [
      { text: "Da solo/a", value: "solo" },
      { text: "In duetto", value: "duet" },
      { text: "Con tutto il gruppo", value: "group" },
    ],
  },
  {
    id: 4,
    question: "Quale genere musicale preferisci?",
    options: [
      { text: "Pop internazionale", value: "pop" },
      { text: "Rock classico", value: "rock" },
      { text: "Musica italiana", value: "italian" },
      { text: "R&B/Soul", value: "rnb" },
      { text: "Indie/Alternative", value: "indie" },
    ],
  },
];

const songRecommendations: Record<string, string[]> = {
  "beginner-romantic-solo-pop": [
    "Ed Sheeran Perfect",
    "John Legend All of Me",
    "Adele Someone Like You",
  ],
  "beginner-party-group-pop": [
    "ABBA Dancing Queen",
    "Queen Don't Stop Me Now",
    "Pharrell Williams Happy",
  ],
  "intermediate-emotional-solo-rock": [
    "Queen Bohemian Rhapsody",
    "Bon Jovi Livin on a Prayer",
    "Journey Don't Stop Believin",
  ],
  "expert-party-duet-pop": [
    "Lady Gaga Bradley Cooper Shallow",
    "Grease Summer Nights",
    "Kenny Rogers Dolly Parton Islands in the Stream",
  ],
  "beginner-chill-solo-italian": [
    "Lucio Battisti Emozioni",
    "Vasco Rossi Albachiara",
    "Claudio Baglioni Questo Piccolo Grande Amore",
  ],
  "intermediate-romantic-duet-rnb": [
    "Alicia Keys Empire State of Mind",
    "John Legend Ordinary People",
    "Beyonce Crazy in Love",
  ],
  "expert-emotional-solo-indie": [
    "Radiohead Creep",
    "Coldplay Fix You",
    "Oasis Wonderwall",
  ],
  // Fallback recommendations
  default: [
    "Sweet Caroline Neil Diamond",
    "Don't Stop Believin Journey",
    "Dancing Queen ABBA",
    "Wonderwall Oasis",
    "My Way Frank Sinatra",
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
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Ecco le tue canzoni perfette!
            </h2>
            <p className="text-gray-600">
              Basate sulle tue preferenze, queste canzoni sono ideali per te
            </p>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {recommendations.map((song, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{song}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        Consigliata per te
                      </Badge>
                    </div>
                  </div>
                  <Button onClick={() => onSuggestionSelect(song)} size="sm">
                    <Music className="h-4 w-4 mr-2" />
                    Cerca
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={resetQuiz} variant="outline">
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
    <div className="space-y-6">
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
          <CardTitle className="flex items-center justify-between">
            <span>
              Domanda {currentQuestion + 1} di {quizQuestions.length}
            </span>
            {currentQuestion > 0 && (
              <Button onClick={goBack} variant="outline" size="sm">
                Indietro
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.value)}
                variant="outline"
                className="w-full justify-start text-left h-auto p-4 hover:bg-blue-50 hover:border-blue-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option.text}</span>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto" />
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
              💡 <strong>Suggerimento:</strong> Rispondi onestamente per
              ottenere i migliori consigli personalizzati!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
