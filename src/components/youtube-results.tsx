import { useState, useEffect, useCallback, useRef } from "react";
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
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [totalResults, setTotalResults] = useState<number>(0);
  const [currentSearchType, setCurrentSearchType] = useState<boolean>(false); // false = tutti i video, true = solo testi
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const searchVideos = useCallback(
    async (
      addLyrics: boolean = false,
      pageToken?: string,
      appendResults: boolean = false
    ) => {
      if (!searchQuery.trim()) return;

      if (appendResults) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setHasSearched(true);
      }

      setError(null);
      setCurrentSearchType(addLyrics);

      try {
        const results = await youtubeService.searchVideos(
          searchQuery,
          8,
          addLyrics,
          pageToken
        );

        if (appendResults) {
          setVideos((prev) => {
            // Filtra i video duplicati basandosi sui videoId
            const existingIds = new Set(prev.map((video) => video.id.videoId));
            const newVideos = results.items.filter(
              (video) => !existingIds.has(video.id.videoId)
            );
            return [...prev, ...newVideos];
          });
        } else {
          setVideos(results.items);
        }

        setNextPageToken(results.nextPageToken);
        setTotalResults(results.pageInfo.totalResults);
        setHasMore(!!results.nextPageToken);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Errore durante la ricerca"
        );
        if (!appendResults) {
          setVideos([]);
        }
      } finally {
        if (appendResults) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [searchQuery]
  );

  const loadMoreVideos = useCallback(() => {
    if (nextPageToken && hasMore && !loadingMore && !loading) {
      searchVideos(currentSearchType, nextPageToken, true);
    }
  }, [
    nextPageToken,
    hasMore,
    loadingMore,
    loading,
    currentSearchType,
    searchVideos,
  ]);

  // Ricerca automatica quando cambia searchQuery (cerca tutti i video per default)
  useEffect(() => {
    if (searchQuery.trim()) {
      // Reset della paginazione quando cambia la query
      setNextPageToken(undefined);
      setHasMore(true);
      searchVideos(false);
    } else {
      setVideos([]);
      setHasSearched(false);
      setNextPageToken(undefined);
      setHasMore(true);
    }
  }, [searchQuery, searchVideos]);

  // Configura l'IntersectionObserver per lo scroll infinito
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMoreVideos();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px", // Inizia a caricare quando mancano 100px alla fine
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMore, loadingMore, loading, loadMoreVideos]);

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
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-center sm:text-left">
          Video YouTube per "{searchQuery}"
        </h3>
        <div className="flex gap-1 sm:gap-2 justify-center sm:justify-end">
          <Button
            onClick={() => {
              setNextPageToken(undefined);
              setHasMore(true);
              searchVideos(false);
            }}
            disabled={loading || !searchQuery.trim()}
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-3"
          >
            {loading ? (
              <>
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                <span className="hidden xs:inline">Cercando...</span>
                <span className="xs:hidden">...</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Tutti i video</span>
                <span className="xs:hidden">Tutti</span>
              </>
            )}
          </Button>
          <Button
            onClick={() => {
              setNextPageToken(undefined);
              setHasMore(true);
              searchVideos(true);
            }}
            disabled={loading || !searchQuery.trim()}
            size="sm"
            className="flex-1 sm:flex-none text-xs sm:text-sm px-2 sm:px-3"
          >
            {loading ? (
              <>
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                <span className="hidden xs:inline">Cercando...</span>
                <span className="xs:hidden">...</span>
              </>
            ) : (
              <>
                <Music2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Solo Testi</span>
                <span className="xs:hidden">Testi</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-3 sm:p-4">
                <div className="aspect-video bg-gray-200 rounded mb-2 sm:mb-3"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 sm:h-3 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && videos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {videos.map((video) => (
              <Card
                key={video.id.videoId}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="aspect-video bg-gray-100 rounded mb-2 sm:mb-3 overflow-hidden">
                    <img
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-xs sm:text-sm line-clamp-2 mb-2">
                    {video.snippet.title}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2 sm:mb-3">
                    {video.snippet.channelTitle}
                  </p>
                  <Button
                    onClick={() => openVideo(video.id.videoId)}
                    size="sm"
                    className="w-full h-8 sm:h-auto text-xs sm:text-sm"
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden xs:inline">Guarda su YouTube</span>
                    <span className="xs:hidden">YouTube</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Elemento observer per lo scroll infinito */}
          <div ref={observerRef} className="h-4" />

          {/* Indicatore di caricamento per scroll infinito */}
          {loadingMore && hasMore && (
            <div className="flex justify-center py-3 sm:py-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                <span className="text-xs sm:text-sm">
                  Caricando altri video...
                </span>
              </div>
            </div>
          )}

          {/* Messaggio fine risultati */}
          {!hasMore && videos.length > 0 && (
            <div className="flex justify-center py-3 sm:py-4">
              <div className="text-xs sm:text-sm text-gray-500 text-center">
                Hai visto tutti i {totalResults.toLocaleString()} risultati
                disponibili
              </div>
            </div>
          )}
        </>
      )}

      {!loading && hasSearched && videos.length === 0 && !error && (
        <Card>
          <CardContent className="p-6 sm:p-8 text-center">
            <Play className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-sm sm:text-base">
              Nessun video trovato per "{searchQuery}"
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Prova con una ricerca diversa
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
