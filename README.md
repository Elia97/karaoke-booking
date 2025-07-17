# 🎤 Karaoke Booking App

Un'applicazione web moderna per la ricerca e gestione di canzoni karaoke, ottimizzata per consumo minimo delle API di YouTube.

## ✨ Caratteristiche

- 🔍 **Ricerca Intelligente**: Cerca canzoni con testi integrati, escludendo automaticamente versioni karaoke, cover e live
- ⚡ **Ottimizzazione API**: Gestione efficiente delle quote YouTube (100 unità per ricerca)
- 🎵 **Qualità Audio**: Focus su versioni originali delle canzoni per la migliore esperienza karaoke
- 🚫 **Protezione Anti-Spam**: Debounce e prevenzione chiamate duplicate
- 📱 **Interfaccia Moderna**: Design responsivo con componenti UI eleganti

## 🚀 Avvio Rapido

### Prerequisiti

- Node.js (versione 18 o superiore)
- Chiave API YouTube Data v3

### Installazione

1. **Clona il repository**

   ```bash
   git clone <url-repository>
   cd karaoke-booking
   ```

2. **Installa le dipendenze**

   ```bash
   npm install
   ```

3. **Configura la chiave API**

   Crea un file `.env` nella directory root:

   ```env
   VITE_YOUTUBE_API_KEY=la_tua_chiave_api_youtube
   ```

4. **Avvia l'applicazione**

   ```bash
   npm run dev
   ```

   L'app sarà disponibile su `http://localhost:5173`

## 🔑 Configurazione YouTube API

### Ottenere la Chiave API

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuovo progetto o seleziona uno esistente
3. Abilita l'API "YouTube Data API v3"
4. Crea credenziali (Chiave API)
5. Copia la chiave nel file `.env`

### Limiti di Quota

- **Quota giornaliera gratuita**: 10.000 unità
- **Costo per ricerca**: 100 unità
- **Ricerche massime giornaliere**: 100 (con l'ottimizzazione attuale)

## 📖 Utilizzo

### Ricerca Canzoni

1. Inserisci il titolo della canzone nella barra di ricerca
2. Premi "Cerca" o Invio
3. Visualizza i risultati con video originali e testi

### Strategia di Ricerca

L'app utilizza una query ottimizzata:

```bash
"[termine ricerca] lyrics -instrumental -cover -live"
```

Questo garantisce:

- ✅ Video con testi e karaoke
- ❌ Versioni strumentali
- ❌ Cover
- ❌ Versioni live

## 🛠️ Tecnologie

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, componenti UI custom
- **API**: YouTube Data API v3
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 📁 Struttura del Progetto

```bash
src/
├── components/
│   ├── search-bar.tsx      # Barra di ricerca
│   ├── youtube-results.tsx # Visualizzazione risultati
│   └── ui/                 # Componenti UI riutilizzabili
├── lib/
│   ├── youtube-service.ts  # Servizio API YouTube
│   └── utils.ts           # Utilità generiche
└── App.tsx                # Componente principale
```

## ⚙️ Scripts Disponibili

```bash
npm run dev          # Avvia server di sviluppo
npm run build        # Build per produzione
npm run preview      # Anteprima build di produzione
npm run lint         # Controllo codice con ESLint
```

## 🔧 Personalizzazione

### Modificare Numero Risultati

Nel file `src/lib/youtube-service.ts`, modifica il parametro `maxResults`:

```typescript
const response = await axios.get(
  "https://www.googleapis.com/youtube/v3/search",
  {
    params: {
      // ...
      maxResults: 10, // Cambia questo valore (max 50)
    },
  }
);
```

### Personalizzare Filtri di Ricerca

Modifica la query nel file `src/lib/youtube-service.ts`:

```typescript
const searchQuery = `${query} lyrics -karaoke -instrumental -cover -live`;
// Aggiungi o rimuovi filtri secondo necessità
```

## 📊 Monitoraggio Quota

Per monitorare l'utilizzo della quota YouTube:

1. Vai su [Google Cloud Console](https://console.cloud.google.com/)
2. Seleziona il tuo progetto
3. Naviga su "API e servizi" > "Quota"
4. Cerca "YouTube Data API v3"

## 🤝 Contribuire

1. Fai un fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/nuova-feature`)
3. Commit delle modifiche (`git commit -m 'Aggiungi nuova feature'`)
4. Push del branch (`git push origin feature/nuova-feature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## 🆘 Supporto

Per problemi o domande:

1. Controlla i [problemi esistenti](../../issues)
2. Apri un nuovo issue con:
   - Descrizione del problema
   - Passi per riprodurre
   - Versione Node.js e browser utilizzati
   - Screenshot se applicabile

---

🎵 Buon karaoke! 🎵
