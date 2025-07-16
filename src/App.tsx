import { useState, useEffect } from "react";
import { Search, Sparkles, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import {
  Header,
  SearchBar,
  YouTubeResults,
  SongSuggestions,
  SongQuiz,
} from "@/components";

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

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchTerm(suggestion);
    setActiveTab("search");
  };

  return (
    <main className="container mx-auto min-h-screen">
      <Header tableNumber={tableNumber} />
      <div className="max-w-screen-lg mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <SearchBar
          onSearch={(term) => {
            setSearchTerm(term);
            setActiveTab("search");
          }}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-6 h-12 sm:h-10">
            <TabsTrigger
              value="suggestions"
              className="text-xs sm:text-sm px-1 sm:px-3"
            >
              <Sparkles className="size-3 sm:size-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Suggerimenti</span>
              <span className="xs:hidden">Sugger.</span>
            </TabsTrigger>
            <TabsTrigger
              value="quiz"
              className="text-xs sm:text-sm px-1 sm:px-3"
            >
              <Heart className="size-3 sm:size-4 mr-1 sm:mr-2" />
              Quiz
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="text-xs sm:text-sm px-1 sm:px-3"
            >
              <Search className="size-3 sm:size-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Ricerca</span>
              <span className="xs:hidden">Cerca</span>
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
    </main>
  );
}
