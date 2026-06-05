# The Floor Trener — Spec & Plan implementacji

## Cel

Webowa apka do treningu rozpoznawania kategorii przed udziałem w teleturnieju "The Floor". Mobile-first, używana z telefonu.

## Stack (decyzje finalne)

- **Vite + React + TypeScript** — build tool + framework + typowanie
- **Tailwind CSS v4** — styling mobile-first
- **Brak backendu, brak localStorage w MVP** — czysta apka client-side
- **Hosting: Vercel** — push do GitHub → auto-deploy
- **Dane: hardcoded TS w repo** — `src/data/flagi.ts`
- **Obrazki**: `flagcdn.com` (stabilne URL-e po kodzie kraju ISO)
- **Dźwięki**: lokalnie w `public/sounds/`, pobrane z github.com/campavao/the-floor

## Zakres MVP

- **1 tryb**: trening kategorii
- **1 kategoria**: flagi państw Europy (20 sztuk)
- **3 ekrany**: Start → Gra → Wynik
- **Mechanika**: pokaż flagę → tap ✅/❌ → reveal odpowiedzi (1.5s) + dźwięk → następna → po 20: wynik
- **Dźwięki**: correct ding przy ✅, incorrect buzz przy ❌
- **Brak**: timera, statystyk, multi-kategorii, pojedynku, voice, localStorage

## Struktura plików (docelowa po MVP)

```
the-floor/
├── src/
│   ├── App.tsx                    # routing między ekranami + stan gry
│   ├── main.tsx                   # entry (auto z Vite)
│   ├── types.ts                   # Flag, Screen
│   ├── index.css                  # tailwind import
│   ├── data/
│   │   └── flagi.ts               # 20 flag europy
│   └── screens/
│       ├── StartScreen.tsx
│       ├── GameScreen.tsx
│       └── ResultScreen.tsx
├── public/
│   └── sounds/
│       ├── correct.m4a
│       └── incorrect.m4a
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Typy (`src/types.ts`)

```ts
export type Flag = {
  img: string;      // URL do flagcdn.com
  answer: string;   // np. "Polska"
};

export type Screen = 'start' | 'game' | 'result';
```

## Dane flag (`src/data/flagi.ts`) — gotowe do wklejenia

```ts
import type { Flag } from '../types';

export const flagi: Flag[] = [
  { img: 'https://flagcdn.com/w640/pl.png', answer: 'Polska' },
  { img: 'https://flagcdn.com/w640/de.png', answer: 'Niemcy' },
  { img: 'https://flagcdn.com/w640/fr.png', answer: 'Francja' },
  { img: 'https://flagcdn.com/w640/it.png', answer: 'Włochy' },
  { img: 'https://flagcdn.com/w640/es.png', answer: 'Hiszpania' },
  { img: 'https://flagcdn.com/w640/gb.png', answer: 'Wielka Brytania' },
  { img: 'https://flagcdn.com/w640/ie.png', answer: 'Irlandia' },
  { img: 'https://flagcdn.com/w640/pt.png', answer: 'Portugalia' },
  { img: 'https://flagcdn.com/w640/nl.png', answer: 'Holandia' },
  { img: 'https://flagcdn.com/w640/be.png', answer: 'Belgia' },
  { img: 'https://flagcdn.com/w640/ch.png', answer: 'Szwajcaria' },
  { img: 'https://flagcdn.com/w640/at.png', answer: 'Austria' },
  { img: 'https://flagcdn.com/w640/cz.png', answer: 'Czechy' },
  { img: 'https://flagcdn.com/w640/sk.png', answer: 'Słowacja' },
  { img: 'https://flagcdn.com/w640/hu.png', answer: 'Węgry' },
  { img: 'https://flagcdn.com/w640/ro.png', answer: 'Rumunia' },
  { img: 'https://flagcdn.com/w640/gr.png', answer: 'Grecja' },
  { img: 'https://flagcdn.com/w640/se.png', answer: 'Szwecja' },
  { img: 'https://flagcdn.com/w640/no.png', answer: 'Norwegia' },
  { img: 'https://flagcdn.com/w640/dk.png', answer: 'Dania' },
];
```

---

# Plan implementacji — 7 etapów = 7 commitów

Każdy etap = jeden commit. Po każdym apka działa end-to-end (z mniejszą funkcjonalnością).

## Etap 0 — Setup projektu (~15 min) ✅ DONE

**Cel**: pusty Vite+React+TS+Tailwind, git repo, pierwsza wersja na localhoście.

**Todosy**:
- [x] W katalogu nadrzędnym (`~/Projects/`) odpal:
  ```bash
  npm create vite@latest the-floor -- --template react-ts
  cd the-floor
  npm install
  ```
  (Vite zapyta o nadpisanie pustego katalogu — zgódź się)
- [x] Zainstaluj Tailwind v4: `npm install -D tailwindcss @tailwindcss/vite`
- [x] W `vite.config.ts` dodaj plugin Tailwinda:
  ```ts
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import tailwindcss from '@tailwindcss/vite';

  export default defineConfig({
    plugins: [react(), tailwindcss()],
  });
  ```
- [x] W `src/index.css` zostaw tylko: `@import "tailwindcss";`
- [x] Wyczyść `src/App.tsx` — zostaw `<div className="p-4">The Floor Trener</div>`
- [x] Usuń `src/App.css`, `src/assets/`
- [x] `npm run dev` — sprawdź że działa na `localhost:5173`
- [x] `git init && git add . && git commit -m "chore: init vite + react + ts + tailwind"`
- [ ] Utwórz repo na GitHubie (np. `gh repo create the-floor --private --source=. --remote=origin`) i `git push -u origin main` — *do zrobienia ręcznie / w Etapie 6*

**Definicja zrobione**: `npm run dev` pokazuje napis "The Floor Trener" z Tailwindowym paddingiem.

**Commit**: `chore: init vite + react + ts + tailwind`

---

## Etap 1 — Statyczne ekrany + nawigacja (~30 min)

**Cel**: trzy ekrany jako komponenty, przełączanie między nimi przyciskami. Bez logiki gry.

**Todosy**:
- [ ] Utwórz `src/types.ts` z `Screen` i `Flag` (jak wyżej)
- [ ] Utwórz `src/screens/StartScreen.tsx`: tytuł "The Floor Trener" + przycisk "Start"
- [ ] Utwórz `src/screens/GameScreen.tsx`: napis "Gra" + placeholder + przycisk "Zakończ"
- [ ] Utwórz `src/screens/ResultScreen.tsx`: napis "Wynik" + przycisk "Restart"
- [ ] W `App.tsx`: `useState<Screen>('start')` + render warunkowy
- [ ] Każdy ekran dostaje prop `onNext: () => void`
- [ ] Sprawdź ręcznie: Start → Gra → Wynik → Start działa

**Definicja zrobione**: klikasz przyciski, ekrany się zmieniają w pętli.

**Commit**: `feat: scaffold three screens with navigation`

---

## Etap 2 — Dane flag (~5 min)

**Cel**: 20 flag europejskich w `src/data/flagi.ts`.

**Todosy**:
- [ ] `mkdir -p src/data`
- [ ] Utwórz `src/data/flagi.ts` z zawartością z sekcji "Dane flag" wyżej (gotowe do skopiowania)
- [ ] Sprawdź że `import { flagi } from './data/flagi'` w App.tsx nie wywala TS
- [ ] (Opcjonalnie) sprawdź losowe 2-3 URL-e w przeglądarce — czy ładują się obrazki

**Definicja zrobione**: `flagi` ma 20 elementów, TypeScript jest happy.

**Commit**: `feat: add 20 european flags data`

---

## Etap 3 — Audio assets (~10 min)

**Cel**: pobrać 2 pliki dźwiękowe lokalnie do `public/sounds/`.

**Todosy**:
- [ ] Pobierz oba pliki:
  ```bash
  mkdir -p public/sounds
  curl -L -o public/sounds/correct.m4a \
    "https://raw.githubusercontent.com/campavao/the-floor/main/public/sounds/Correct%20ding.m4a"
  curl -L -o public/sounds/incorrect.m4a \
    "https://raw.githubusercontent.com/campavao/the-floor/main/public/sounds/incorrect-buzz.m4a"
  ```
- [ ] Z `npm run dev` aktywnym, otwórz w przeglądarce:
  - `http://localhost:5173/sounds/correct.m4a` — powinien odtworzyć ding
  - `http://localhost:5173/sounds/incorrect.m4a` — powinien odtworzyć buzz

**Definicja zrobione**: oba pliki w repo, dostępne pod `/sounds/`.

**Commit**: `feat: add correct/incorrect sound effects`

---

## Etap 4 — Logika gry + dźwięki (~45 min)

**Cel**: pełna pętla — tap wiem/nie wiem, dźwięk, reveal, auto-advance, ekran wyniku.

**Todosy**:
- [ ] W `App.tsx` trzymaj stan: `screen`, `currentIndex`, `score`, `shuffled` (przemieszane flagi na początku gry)
- [ ] Funkcja `startGame()`:
  ```ts
  setShuffled([...flagi].sort(() => Math.random() - 0.5));
  setCurrentIndex(0);
  setScore(0);
  setScreen('game');
  ```
- [ ] Przekaż do `GameScreen` propsy: `flag` (current), `index`, `total`, `onAnswer: (knew: boolean) => void`
- [ ] Na górze `GameScreen.tsx` (poza komponentem):
  ```tsx
  const correctSound = new Audio('/sounds/correct.m4a');
  const incorrectSound = new Audio('/sounds/incorrect.m4a');
  ```
- [ ] W `GameScreen`: stan lokalny `isRevealed: boolean`, `lastKnew: boolean | null`
- [ ] Klik ✅: `correctSound.currentTime = 0; correctSound.play();` → `setIsRevealed(true)` → `setLastKnew(true)` → po 1500ms `onAnswer(true)` + reset
- [ ] Klik ❌: to samo z `incorrectSound` i `false`
- [ ] W `App.tsx` w `handleAnswer`: jeśli `knew` to `score++`. Jeśli `currentIndex + 1 >= shuffled.length` → `setScreen('result')`, inaczej `currentIndex++`
- [ ] `ResultScreen` dostaje `score: number, total: number`, pokazuje "Wiedziałeś X/Y"
- [ ] Klik "Zagraj jeszcze raz" → `startGame()`

**Definicja zrobione**: przechodzisz pełną grę 20 pytań, dźwięki grają, score liczy się poprawnie, wracasz do startu.

**Commit**: `feat: core game loop with sounds and answer reveal`

---

## Etap 5 — UI mobile + feedback wizualny (~45 min)

**Cel**: apka wygląda i działa dobrze na telefonie.

**Todosy**:
- [ ] W `index.html`: `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">`
- [ ] W `index.html` zmień `<title>` na "The Floor Trener"
- [ ] `body` lub root div: `h-dvh overflow-hidden` (dvh = dynamic viewport height, ważne na mobile)
- [ ] **StartScreen**: centered flex column, tytuł `text-4xl font-bold`, przycisk `h-16 text-2xl px-8 rounded-2xl bg-blue-600 text-white`
- [ ] **GameScreen** layout:
  - Górny pasek: counter `3/20` (po lewej), score `✓ 2` (po prawej), `p-4 text-lg`
  - Środek: flaga `object-contain max-h-[50vh] w-full px-4`
  - Dół: dwa przyciski full-width, `h-24 text-2xl`, ✅ `bg-green-500` / ❌ `bg-red-500`
- [ ] **Stan reveal**: gdy `isRevealed`, całe tło `bg-green-500` (jeśli `lastKnew`) lub `bg-red-500`; na środku odpowiedź `text-5xl text-white font-bold`; przyciski schowane (`hidden`) lub `pointer-events-none opacity-50`
- [ ] **ResultScreen**: duża liczba `X/20` w `text-6xl`, pod tym przycisk "Zagraj jeszcze raz"
- [ ] Test w DevTools w trybie mobile (iPhone 14 Pro)

**Definicja zrobione**: apka wygląda dobrze na telefonie, tap targety duże, kolory dają feedback.

**Commit**: `feat: mobile-first layout with color feedback`

---

## Etap 6 — Deploy na Vercel (~15 min)

**Cel**: publiczny URL, działa na telefonie.

**Todosy**:
- [ ] Sprawdź że `npm run build` nie wywala błędów
- [ ] Push wszystkich commitów na GitHub: `git push`
- [ ] Wejdź na vercel.com, "Add New Project" → wskaż repo `the-floor`
- [ ] Vercel sam wykryje że to Vite, klikasz Deploy
- [ ] Po ~1 min masz URL typu `the-floor-xxx.vercel.app`
- [ ] Otwórz na telefonie, dodaj do home screen
- [ ] Test pełnej rozgrywki na telefonie z partnerem

**Definicja zrobione**: ty i partner możecie odpalić apkę z telefonu i trenować.

---

# MVP gotowe ✅ — roadmap dalszych etapów

Każdy = jeden wieczór, w kolejności priorytetu:

| # | Feature | Notatka |
|---|---------|---------|
| 7 | localStorage — zapis najlepszego wyniku | `useEffect` + `localStorage.getItem/setItem` |
| 8 | Druga kategoria + ekran wyboru | Z CSV w `campavao/the-floor` można wziąć inspirację |
| 9 | Timer per pytanie (5s, auto-fail) | `setTimeout` + progress bar, dorzuć `Countdown.m4a` |
| 10 | Tryb pojedynku (45s, 2 graczy) | Nowy ekran, inna logika scoringu |
| 11 | Powtarzanie błędów (spaced repetition) | localStorage zapamiętuje słabe punkty |
| 12 | PWA (instalowalna apka) | `vite-plugin-pwa`, manifest, ikona |
| 13 | Więcej kategorii (10+) | Praca z danymi |

---

# Źródła i atrybucja

- **Flagi**: `flagcdn.com` (darmowe, free for any use)
- **Dźwięki**: pobrane z `github.com/campavao/the-floor` (repo bez licencji — użycie prywatne/treningowe OK; jeśli kiedyś publicznie, zamienić na CC0 z freesound.org)
- **Inspiracja game design**: oryginalny program "The Floor"
