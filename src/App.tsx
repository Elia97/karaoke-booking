import { useState, useEffect } from "react";
import { Search, Music, Sparkles, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SongSuggestions } from "@/components/song-suggestions";
import { SongQuiz } from "@/components/song-quiz";
import { YouTubeResults } from "@/components/youtube-results";

export default function App(): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tableNumber, setTableNumber] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("suggestions");

  // Estrai numero tavolo dall'URL se presente
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const table = urlParams.get("table");
    if (table) {
      setTableNumber(table);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setActiveTab("search");
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchTerm(suggestion);
    setActiveTab("search");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Music className="h-6 w-6 text-gray-900" />
              <h1 className="text-2xl font-semibold text-gray-900">Karaoke</h1>
            </div>
            <p className="text-gray-600">Trova la canzone perfetta per te</p>
            {tableNumber && (
              <Badge variant="outline" className="mt-2">
                Tavolo {tableNumber}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Cerca canzone o artista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Cerca</Button>
            </form>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="suggestions">
              <Sparkles className="h-4 w-4 mr-2" />
              Suggerimenti
            </TabsTrigger>
            <TabsTrigger value="quiz">
              <Heart className="h-4 w-4 mr-2" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="search">
              <Search className="h-4 w-4 mr-2" />
              Ricerca
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions">
            <SongSuggestions onSuggestionSelect={handleSuggestionSelect} />
          </TabsContent>

          <TabsContent value="quiz">
            <SongQuiz onSuggestionSelect={handleSuggestionSelect} />
          </TabsContent>

          <TabsContent value="search">
            <YouTubeResults searchQuery={searchTerm} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
