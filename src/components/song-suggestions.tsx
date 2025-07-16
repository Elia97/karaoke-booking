import { useState } from "react";
import { Music, Star, Users, Heart, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SongSuggestionsProps {
  onSuggestionSelect: (suggestion: string) => void;
}

const songCategories = {
  beginner: {
    title: "Perfette per Principianti",
    icon: Star,
    color: "text-green-600",
    songs: [
      { title: "Sweet Caroline", artist: "Neil Diamond", difficulty: "Easy" },
      { title: "Country Roads", artist: "John Denver", difficulty: "Easy" },
      { title: "Hey Jude", artist: "The Beatles", difficulty: "Easy" },
      { title: "Wonderwall", artist: "Oasis", difficulty: "Easy" },
      { title: "Stand By Me", artist: "Ben E. King", difficulty: "Easy" },
    ],
  },
  classics: {
    title: "Classici Intramontabili",
    icon: Music,
    color: "text-blue-600",
    songs: [
      { title: "Bohemian Rhapsody", artist: "Queen", difficulty: "Hard" },
      {
        title: "Don't Stop Believin'",
        artist: "Journey",
        difficulty: "Medium",
      },
      { title: "My Way", artist: "Frank Sinatra", difficulty: "Medium" },
      { title: "Hotel California", artist: "Eagles", difficulty: "Hard" },
      { title: "Imagine", artist: "John Lennon", difficulty: "Easy" },
    ],
  },
  duets: {
    title: "Duetti Romantici",
    icon: Heart,
    color: "text-pink-600",
    songs: [
      {
        title: "Islands in the Stream",
        artist: "Kenny Rogers & Dolly Parton",
        difficulty: "Medium",
      },
      {
        title: "The Boy Is Mine",
        artist: "Brandy & Monica",
        difficulty: "Medium",
      },
      {
        title: "Summer Nights",
        artist: "Grease Soundtrack",
        difficulty: "Easy",
      },
      {
        title: "Under Pressure",
        artist: "Queen & David Bowie",
        difficulty: "Hard",
      },
      {
        title: "Shallow",
        artist: "Lady Gaga & Bradley Cooper",
        difficulty: "Medium",
      },
    ],
  },
  party: {
    title: "Scatenati con il Gruppo",
    icon: Users,
    color: "text-orange-600",
    songs: [
      { title: "Dancing Queen", artist: "ABBA", difficulty: "Easy" },
      {
        title: "I Will Survive",
        artist: "Gloria Gaynor",
        difficulty: "Medium",
      },
      { title: "Livin' on a Prayer", artist: "Bon Jovi", difficulty: "Medium" },
      { title: "Mr. Brightside", artist: "The Killers", difficulty: "Medium" },
      {
        title: "Sweet Child O' Mine",
        artist: "Guns N' Roses",
        difficulty: "Hard",
      },
    ],
  },
  impressive: {
    title: "Per Impressionare",
    icon: Zap,
    color: "text-purple-600",
    songs: [
      {
        title: "I Want It That Way",
        artist: "Backstreet Boys",
        difficulty: "Medium",
      },
      { title: "Someone Like You", artist: "Adele", difficulty: "Hard" },
      { title: "Hallelujah", artist: "Leonard Cohen", difficulty: "Hard" },
      { title: "Creep", artist: "Radiohead", difficulty: "Medium" },
      { title: "Billie Jean", artist: "Michael Jackson", difficulty: "Hard" },
    ],
  },
  quick: {
    title: "Canzoni Veloci (sotto 4 min)",
    icon: Clock,
    color: "text-indigo-600",
    songs: [
      { title: "Yesterday", artist: "The Beatles", difficulty: "Easy" },
      { title: "Can't Help Myself", artist: "Four Tops", difficulty: "Easy" },
      {
        title: "Build Me Up Buttercup",
        artist: "The Foundations",
        difficulty: "Easy",
      },
      { title: "Happy", artist: "Pharrell Williams", difficulty: "Easy" },
      { title: "Respect", artist: "Aretha Franklin", difficulty: "Medium" },
    ],
  },
};

export function SongSuggestions({ onSuggestionSelect }: SongSuggestionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 border-green-200 bg-green-50";
      case "Medium":
        return "text-yellow-600 border-yellow-200 bg-yellow-50";
      case "Hard":
        return "text-red-600 border-red-200 bg-red-50";
      default:
        return "text-gray-600 border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Intro */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4 sm:p-6 text-center">
          <Music className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            Non sai cosa cantare?
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Scegli una categoria qui sotto per trovare la canzone perfetta per
            te!
          </p>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {Object.entries(songCategories).map(([key, category]) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === key;

          return (
            <Card
              key={key}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => setSelectedCategory(isSelected ? null : key)}
            >
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="flex items-center gap-2 text-xs sm:text-sm">
                  <IconComponent
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${category.color}`}
                  />
                  <span className="text-xs sm:text-sm">{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-600 mb-2 sm:mb-3">
                  {category.songs.length} canzoni disponibili
                </p>
                {isSelected && (
                  <div className="space-y-2">
                    {category.songs.map((song, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-white rounded border"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-xs sm:text-sm truncate">
                            {song.title}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {song.artist}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getDifficultyColor(
                              song.difficulty
                            )}`}
                          >
                            {song.difficulty}
                          </Badge>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSuggestionSelect(
                                `${song.title} ${song.artist}`
                              );
                            }}
                            className="text-xs px-2 py-1 h-6 sm:h-auto"
                          >
                            <span className="hidden xs:inline">Cerca</span>
                            <span className="xs:hidden">🔍</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
            Suggerimenti Rapidi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              "Canzoni italiane karaoke",
              "Rock anni 80",
              "Pop internazionale",
              "Ballate romantiche",
              "Canzoni Disney",
              "Rap italiano",
              "Musica latina",
              "Indie alternative",
            ].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => onSuggestionSelect(suggestion)}
                className="text-xs sm:text-sm justify-start h-8 sm:h-auto"
              >
                <span className="truncate">{suggestion}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
