# Integrazione YouTube API - Istruzioni di Setup

## 1. Ottieni una API Key di YouTube

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto o seleziona uno esistente
3. Abilita la **YouTube Data API v3**:
   - Vai su "API e servizi" > "Libreria"
   - Cerca "YouTube Data API v3"
   - Clicca "Abilita"
4. Crea le credenziali:
   - Vai su "API e servizi" > "Credenziali"
   - Clicca "Crea credenziali" > "Chiave API"
   - Copia la chiave generata

## 2. Configura la chiave API

1. Apri il file `.env.local` nella root del progetto
2. Sostituisci `your_youtube_api_key_here` con la tua vera API key:

```bash
VITE_YOUTUBE_API_KEY=AIzaSyDlA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P
```

## 3. Funzionalità disponibili

### Ricerca YouTube

- Cerca canzoni direttamente su YouTube
- Visualizza miniature, titoli e canali
- Apri i video direttamente su YouTube
- Due modalità di ricerca:
  - **Tutti i video**: Versioni originali, live, cover
  - **Con Testi**: Video con testi sovraimpressi (lyrics)

### Componenti aggiunti

- `YouTubeResults`: Visualizza i risultati di ricerca
- `youtube-service`: Servizio per chiamate API
- Integrazione nell'app principale

## 4. Uso

1. Vai nella tab "Ricerca"
2. Inserisci il nome di una canzone o artista
3. Clicca "Cerca" per vedere i risultati YouTube
4. Clicca su "Guarda su YouTube" per aprire il video

## 5. Limitazioni API

- La YouTube API ha limiti di quota giornaliera
- Per uso in produzione, monitora l'uso delle API su Google Cloud Console
- Considera di implementare caching per ridurre le chiamate API

## 6. Sicurezza

- La chiave API è esposta nel frontend (è normale per questo tipo di utilizzo)
- Per maggiore sicurezza, puoi restringere la chiave API a domini specifici su Google Cloud Console
