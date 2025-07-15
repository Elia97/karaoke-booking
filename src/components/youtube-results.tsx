import { useState, useEffect, useCallback } from "react";
import { Play, ExternalLink, Loader2, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { youtubeService } from "@/lib/youtube-service";
import type { YouTubeVideo } from "@/lib/youtube-service";

interface YouTubeResultsProps {
  searchQuery: string;
}

export function YouTubeResults({ searchQuery }: YouTubeResultsProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchVideos = useCallback(
    async (addLyrics: boolean = false) => {
      if (!searchQuery.trim()) return;

      setLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const results = await youtubeService.searchVideos(
          searchQuery,
          8,
          addLyrics
        );
        setVideos(results.items);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Errore durante la ricerca"
        );
        setVideos([]);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery]
  );

  // Ricerca automatica quando cambia searchQuery (cerca tutti i video per default)
  useEffect(() => {
    if (searchQuery.trim()) {
      searchVideos(false);
    } else {
      setVideos([]);
      setHasSearched(false);
    }
  }, [searchQuery, searchVideos]);

  const openVideo = (videoId: string) => {
    window.open(youtubeService.getVideoUrl(videoId), "_blank");
  };

  if (!hasSearched && !searchQuery) {
    return (
      <div className="text-center py-8">
        <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">
          Cerca una canzone per vedere i video di YouTube
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-lg font-semibold">
          Video YouTube per "{searchQuery}"
        </h3>
        <div className="flex gap-2">
          <Button
            onClick={() => searchVideos(false)}
            disabled={loading || !searchQuery.trim()}
            variant="outline"
            size="sm"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Cercando...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Tutti i video
              </>
            )}
          </Button>
          <Button
            onClick={() => searchVideos(true)}
            disabled={loading || !searchQuery.trim()}
            size="sm"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Cercando...
              </>
            ) : (
              <>
                <Music2 className="h-4 w-4 mr-2" />
                Con Testi
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <p className="text-red-700 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="aspect-video bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && videos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <Card
              key={video.id.videoId}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="aspect-video bg-gray-100 rounded mb-3 overflow-hidden">
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium text-sm line-clamp-2 mb-2">
                  {video.snippet.title}
                </h4>
                <p className="text-xs text-gray-500 mb-3">
                  {video.snippet.channelTitle}
                </p>
                <Button
                  onClick={() => openVideo(video.id.videoId)}
                  size="sm"
                  className="w-full"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Guarda su YouTube
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && hasSearched && videos.length === 0 && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Nessun video trovato per "{searchQuery}"
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Prova con una ricerca diversa
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
