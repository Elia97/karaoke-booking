import axios from "axios";

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export interface YouTubeVideo {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    title: string;
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export const youtubeService = {
  searchVideos: async (
    query: string,
    maxResults: number = 10,
    addLyrics: boolean = false,
    pageToken?: string
  ): Promise<YouTubeSearchResponse> => {
    if (!API_KEY) {
      throw new Error(
        "YouTube API key non configurata. Aggiungi VITE_YOUTUBE_API_KEY nel file .env.local"
      );
    }

    try {
      const searchQuery = addLyrics ? `${query} lyrics` : query;
      const params: Record<string, string | number> = {
        part: "snippet",
        q: searchQuery,
        type: "video",
        maxResults,
        key: API_KEY,
        safeSearch: "moderate",
        videoEmbeddable: "true",
      };

      // Aggiungi il token di pagina se presente
      if (pageToken) {
        params.pageToken = pageToken;
      }

      const response = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, {
        params,
      });

      return response.data;
    } catch (error) {
      console.error("Errore nella ricerca YouTube:", error);

      // Gestione specifica per errori di quota
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        throw new Error(
          "Quota API YouTube esaurita. Riprova domani o controlla la configurazione della tua API key nella Google Cloud Console."
        );
      }

      throw new Error("Errore durante la ricerca dei video su YouTube");
    }
  },

  getVideoUrl: (videoId: string): string => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  },

  getEmbedUrl: (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}`;
  },

  getThumbnailUrl: (
    videoId: string,
    quality: "default" | "medium" | "high" | "maxres" = "medium"
  ): string => {
    return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
  },
};
