import { Input } from "@/components/ui";
import { Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function SearchBar({
  onSearch,
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    onSearch(searchTerm);
  };
  return (
    <Card className="mb-4 sm:mb-6">
      <CardContent className="p-3 sm:p-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:items-center sm:flex-row gap-2 sm:gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              name="search"
              placeholder="Cerca canzone o artista..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <Button type="submit" size={"lg"} variant="outline">
            Cerca
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
