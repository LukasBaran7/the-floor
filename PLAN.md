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
- **Kategorie**: rejestr w `src/data/categories.ts` — start MVP z 1 kategorią (flagi Europy, docelowo ~70 po Etapie 5b), UI wyboru gotowe pod dokładanie kolejnych
- **4 (lub 5) ekranów**: Start → Categories → *(opcjonalnie SessionSetup)* → Gra → Wynik *(Categories wciągnięty z roadmapy #8 do MVP — patrz Etap 5)*
- **Mechanika**: pokaż flagę → tap ✅/❌ → reveal odpowiedzi inline pod flagą (1.5s, kolorowy panel zamiast przycisków) + dźwięk → następna → po wszystkich: wynik
- **Wybór długości sesji** (Etap 5b): 10 / 20 / 50 / wszystkie przed startem gry
- **Wyjście z treningu** (Etap 5b): przycisk w GameScreen, wraca do listy kategorii
- **Dźwięki**: correct ding przy ✅, incorrect buzz przy ❌
- **Brak**: timera, statystyk, pojedynku, voice, localStorage

## Struktura plików (docelowa po MVP)

```
the-floor/
├── src/
│   ├── App.tsx                    # routing między ekranami + stan gry
│   ├── main.tsx                   # entry (auto z Vite)
│   ├── types.ts                   # Flag, Category, Screen
│   ├── index.css                  # tailwind import
│   ├── data/
│   │   ├── flagi.ts               # 20 flag europy
│   │   └── categories.ts          # rejestr kategorii (na razie 1)
│   └── screens/
│       ├── StartScreen.tsx
│       ├── CategoriesScreen.tsx   # wybór kategorii
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

export type Category = {
  id: string;       // np. "flagi-europy"
  name: string;     // wyświetlane na liście, np. "Flagi Europy"
  items: Flag[];    // generycznie — w przyszłości może być Marka[] itd.
};

export type Screen = 'start' | 'categories' | 'game' | 'result';
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

## Etap 1 — Statyczne ekrany + nawigacja (~30 min) ✅ DONE

**Cel**: trzy ekrany jako komponenty, przełączanie między nimi przyciskami. Bez logiki gry.

**Todosy**:
- [x] Utwórz `src/types.ts` z `Screen` i `Flag` (jak wyżej)
- [x] Utwórz `src/screens/StartScreen.tsx`: tytuł "The Floor Trener" + przycisk "Start"
- [x] Utwórz `src/screens/GameScreen.tsx`: napis "Gra" + placeholder + przycisk "Zakończ"
- [x] Utwórz `src/screens/ResultScreen.tsx`: napis "Wynik" + przycisk "Restart"
- [x] W `App.tsx`: `useState<Screen>('start')` + render warunkowy
- [x] Każdy ekran dostaje prop `onNext: () => void`
- [x] Sprawdź ręcznie: Start → Gra → Wynik → Start działa

**Definicja zrobione**: klikasz przyciski, ekrany się zmieniają w pętli.

**Commit**: `feat: scaffold three screens with navigation`

---

## Etap 2 — Dane flag (~5 min) ✅ DONE

**Cel**: 20 flag europejskich w `src/data/flagi.ts`.

**Todosy**:
- [x] `mkdir -p src/data`
- [x] Utwórz `src/data/flagi.ts` z zawartością z sekcji "Dane flag" wyżej (gotowe do skopiowania)
- [x] Sprawdź że `import { flagi } from './data/flagi'` w App.tsx nie wywala TS (`tsc --noEmit -p tsconfig.app.json` clean)
- [ ] (Opcjonalnie) sprawdź losowe 2-3 URL-e w przeglądarce — czy ładują się obrazki

**Definicja zrobione**: `flagi` ma 20 elementów, TypeScript jest happy.

**Commit**: `feat: add 20 european flags data`

---

## Etap 3 — Audio assets (~10 min) ✅ DONE

**Cel**: pobrać 2 pliki dźwiękowe lokalnie do `public/sounds/`.

**Todosy**:
- [x] Pobierz oba pliki:
  ```bash
  mkdir -p public/sounds
  curl -L -o public/sounds/correct.m4a \
    "https://raw.githubusercontent.com/campavao/the-floor/main/public/sounds/Correct%20ding.m4a"
  curl -L -o public/sounds/incorrect.m4a \
    "https://raw.githubusercontent.com/campavao/the-floor/main/public/sounds/incorrect-buzz.m4a"
  ```
- [x] Z `npm run dev` aktywnym, otwórz w przeglądarce:
  - `http://localhost:5173/sounds/correct.m4a` — powinien odtworzyć ding *(HTTP 200, 80KB — serwer OK; odsłuch potwierdzisz po Etapie 4)*
  - `http://localhost:5173/sounds/incorrect.m4a` — powinien odtworzyć buzz *(HTTP 200, 87KB — serwer OK)*

**Definicja zrobione**: oba pliki w repo, dostępne pod `/sounds/`.

**Commit**: `feat: add correct/incorrect sound effects`

---

## Etap 4 — Logika gry + dźwięki (~45 min) ✅ DONE

**Cel**: pełna pętla — tap wiem/nie wiem, dźwięk, reveal, auto-advance, ekran wyniku.

**Todosy**:
- [x] W `App.tsx` trzymaj stan: `screen`, `currentIndex`, `score`, `shuffled` (przemieszane flagi na początku gry)
- [x] Funkcja `startGame()`:
  ```ts
  setShuffled([...flagi].sort(() => Math.random() - 0.5));
  setCurrentIndex(0);
  setScore(0);
  setScreen('game');
  ```
- [x] Przekaż do `GameScreen` propsy: `flag` (current), `index`, `total`, `onAnswer: (knew: boolean) => void`
- [x] Na górze `GameScreen.tsx` (poza komponentem):
  ```tsx
  const correctSound = new Audio('/sounds/correct.m4a');
  const incorrectSound = new Audio('/sounds/incorrect.m4a');
  ```
- [x] W `GameScreen`: stan lokalny `isRevealed: boolean`, `lastKnew: boolean | null`
- [x] Klik ✅: `correctSound.currentTime = 0; correctSound.play();` → `setIsRevealed(true)` → `setLastKnew(true)` → po 1500ms `onAnswer(true)` + reset
- [x] Klik ❌: to samo z `incorrectSound` i `false`
- [x] W `App.tsx` w `handleAnswer`: jeśli `knew` to `score++`. Jeśli `currentIndex + 1 >= shuffled.length` → `setScreen('result')`, inaczej `currentIndex++`
- [x] `ResultScreen` dostaje `score: number, total: number`, pokazuje "Wiedziałeś X/Y"
- [x] Klik "Zagraj jeszcze raz" → `startGame()`

**Uwagi z implementacji:**
- Score w trakcie gry NIE jest jeszcze widoczny w UI — pasek z `✓ X` dorzucamy w Etapie 5 (polish/layout).
- StartScreen prop został przemianowany `onNext` → `onStart`, ResultScreen ma teraz `score`, `total`, `onReplay`.
- W `answer()` w GameScreen guard `if (isRevealed) return;` zapobiega podwójnemu klikowi w trakcie reveal.

**Definicja zrobione**: przechodzisz pełną grę 20 pytań, dźwięki grają, score liczy się poprawnie, wracasz do startu.

**Commit**: `feat: core game loop with sounds and answer reveal`

---

## Etap 5 — UI mobile + feedback wizualny (~45 min) ✅ DONE

**Cel**: apka wygląda i działa dobrze na telefonie.

**Todosy**:
- [x] W `index.html`: `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`
- [x] W `index.html` zmień `<title>` na "The Floor Trener" (też `lang="pl"`)
- [x] Każdy ekran sam ustawia `h-dvh` na rooście — nie diraliśmy w `body`/`#root` (dvh = dynamic viewport height, ważne na mobile)
- [x] **StartScreen**: centered flex column, tytuł `text-4xl font-bold`, przycisk `h-16 text-2xl px-8 rounded-2xl bg-blue-600 text-white`
- [x] **GameScreen** layout:
  - Górny pasek: counter `3/20` (po lewej), score `✓ 2` (po prawej), `p-4 text-lg`
  - Środek: flaga `object-contain max-h-[50vh] w-full px-4`
  - Dół: dwa przyciski full-width, `h-24 text-2xl`, ✅ `bg-green-500` / ❌ `bg-red-500`
- [x] **Stan reveal**: pełny ekran `bg-green-500` / `bg-red-500`, na środku odpowiedź `text-5xl text-white font-bold`; layout z przyciskami w ogóle nie jest renderowany (return wcześnie)
- [x] **ResultScreen**: duża liczba `X/20` w `text-6xl`, pod tym przycisk "Zagraj jeszcze raz"
- [ ] Test w DevTools w trybie mobile (iPhone 14 Pro) — *do potwierdzenia przez Ciebie*

**Uwagi z implementacji:**
- Score jest teraz prop GameScreen (`✓ X` w prawym górnym rogu).
- `active:bg-*-600/700` dodane do przycisków dla tap feedback.
- `flex-1` + `min-h-0` na środkowej sekcji GameScreen — flaga skaluje się do dostępnej wysokości i nie wypycha przycisków.

**Doszło po feedbacku usera (poza pierwotnym planem Etapu 5):**
- **Reveal inline pod flagą** (nie fullscreen) — flaga zostaje widoczna w trakcie reveala, na dole pojawia się kolorowy panel `bg-green-500`/`bg-red-500` w miejscu przycisków, `text-3xl` z odpowiedzią. Layout shell się nie rusza.
- **Wciągnięty pre-MVP feature `#8` z roadmapy: wybór kategorii** — flow teraz: Start → Categories → Game → Result. Nowe pliki: `src/types.ts` (`Category`), `src/data/categories.ts` (rejestr), `src/screens/CategoriesScreen.tsx`. ResultScreen ma dodatkowo przycisk "Inne kategorie" (powrót do listy). Na razie 1 kategoria, struktura przygotowana pod dokładanie kolejnych jednym wpisem do `categories.ts`.

**Definicja zrobione**: apka wygląda dobrze na telefonie, tap targety duże, kolory dają feedback.

**Commit**: `feat: mobile-first layout with color feedback`

---

## Etap 5b — Exit z treningu + długość sesji + większy dataset (~45 min) ✅ DONE

**Cel**: UX szlif przed deployem — gracz może przerwać sesję, wybrać ile pytań chce i ma większą pulę flag do wyboru.

**Todosy**:
- [x] **Przycisk "Wyjdź" w `GameScreen`** — `← Wyjdź` w lewym górnym rogu (po lewej obok counter'a i score'a). Klik → `window.confirm("Przerwać sesję? Wynik nie zostanie zapisany.")` → jeśli OK, `onExit()` → wraca do `CategoriesScreen` (porzuca postęp, NIE zapisuje wyniku). Confirm zostawiony żeby przypadkowy tap nie zabijał gry. Guard: jeśli `isRevealed`, exit ignorowany (żeby nie kolidować z 1.5s reveal flow).
- [x] **Wybór długości sesji** — wybrano **wariant B**: nowy ekran `SessionSetupScreen.tsx` między Categories a Game. Pokazuje nazwę kategorii i przyciski `10 / 20 / 50 / Wszystkie (X)`. Opcje ≥ `category.items.length` ukryte (przy małej kategorii np. 20 flag — pokażą się tylko 10 + "Wszystkie (20)"). `App.startSession(length)` bierze `shuffle(category.items).slice(0, length)`.
- [x] **Powiększyć dataset flag** — `flagi.ts` rozszerzony z 20 do **50 flag** (cała Europa łącznie z mikropaństwami: AL, AD, AM, AZ, BY, BA, BG, HR, CY, EE, FI, GE, IS, XK, LV, LI, LT, LU, MT, MD, MC, ME, MK, RU, SM, RS, SI, TR, UA, VA dodane do dotychczasowych 20). Dodatkowo: nowa kategoria **"Flagi Świata"** w `src/data/flagi-swiata.ts` z 20 popularnymi krajami spoza Europy (USA, Kanada, Meksyk, Brazylia, Argentyna, Chile, Japonia, Chiny, Korea Płd, Indie, Tajlandia, Wietnam, Iran, Izrael, Egipt, Maroko, Nigeria, RPA, Australia, Nowa Zelandia). **Łącznie +50 nowych flag w 2 kategoriach.**
- [x] Count obok nazwy kategorii już był (Etap 5) — pokazuje się automatycznie z `cat.items.length`.

**Definicja zrobione**: w GameScreen jest przycisk wyjścia z confirm; przed startem wybierasz 10/20/50/wszystkie i gra trwa dokładnie tyle pytań; są 2 kategorie (50 + 20).

**Commit**: `feat: exit button, session length picker, expanded flag set`

**Uwagi z implementacji:**
- `Screen` rozszerzony o `'session-setup'` (teraz 5 wartości).
- `App` state: dodany `category: Category | null` (do `SessionSetupScreen` i replay), `pickCategory(cat)` zamiast od razu `startGame`.
- ResultScreen "Zagraj jeszcze raz" → wraca do `session-setup` (możesz wybrać inną długość niż poprzednio), NIE od razu do gry.

---

## Etap 6 — Deploy na Vercel (~15 min) ✅ DONE

**Cel**: publiczny URL, działa na telefonie.

**Todosy**:
- [x] Sprawdź że `npm run build` nie wywala błędów (200KB → 62KB gzip)
- [x] Push wszystkich commitów na GitHub: `git push` — repo: https://github.com/LukasBaran7/the-floor (public)
- [x] Wejdź na vercel.com, "Add New Project" → wskaż repo `the-floor`
- [x] Vercel sam wykryje że to Vite, klikasz Deploy
- [x] Po ~1 min masz URL typu `the-floor-xxx.vercel.app` — *URL: wklej tu (zaktualizuję)*
- [ ] Otwórz na telefonie, dodaj do home screen
- [ ] Test pełnej rozgrywki na telefonie z partnerem

**Definicja zrobione**: ty i partner możecie odpalić apkę z telefonu i trenować.

**Uwagi z implementacji:**
- Vercel zrobiony przez webowy flow (CLI `vercel` nie był zainstalowany, klikalna ścieżka szybsza).
- Repo public — dźwięki `correct.m4a` / `incorrect.m4a` z `campavao/the-floor` (repo bez licencji); jeśli planujesz szerszy publiczny release, warto je w jakimś momencie podmienić na CC0 z freesound.org.

---

# MVP gotowe ✅ — roadmap dalszych etapów

Każdy = jeden wieczór, w kolejności priorytetu:

| # | Feature | Notatka |
|---|---------|---------|
| 7 | localStorage — zapis najlepszego wyniku | `useEffect` + `localStorage.getItem/setItem` |
| ~~8~~ | ~~Druga kategoria + ekran wyboru~~ ✅ **DONE w Etapie 5** | Ekran `CategoriesScreen.tsx` + rejestr `categories.ts` już są. Druga kategoria = jeden wpis w `categories.ts`. |
| 9 | Timer per pytanie (5s, auto-fail) | `setTimeout` + progress bar, dorzuć `Countdown.m4a` |
| 10 | Tryb pojedynku (45s, 2 graczy) | Nowy ekran, inna logika scoringu |
| 11 | Powtarzanie błędów (spaced repetition) | localStorage zapamiętuje słabe punkty |
| 12 | PWA (instalowalna apka) | `vite-plugin-pwa`, manifest, ikona |
| 13 | Więcej kategorii (10+) | Praca z danymi — UI gotowe, dosypujesz wpisy do `categories.ts` |

## Zmiany zakresu w trakcie implementacji

| Etap | Co weszło ponad pierwotny plan |
|------|--------------------------------|
| 5 | **Ekran wyboru kategorii** (`CategoriesScreen.tsx` + `data/categories.ts` + typ `Category`) — wciągnięte z roadmapy #8 do MVP. Flow zmienił się z 3 ekranów (Start → Game → Result) na 4 (Start → Categories → Game → Result). ResultScreen dostał drugi przycisk "Inne kategorie" (powrót do listy). |
| 5 | **Reveal odpowiedzi inline pod flagą** zamiast fullscreen — user explicitly chciał widzieć flagę razem z odpowiedzią. Kolorowy panel `bg-green-500`/`bg-red-500` (`h-24 rounded-2xl`) pojawia się w miejscu przycisków ✅/❌; reszta layoutu się nie rusza. |
| 5b | **Przycisk wyjścia z treningu, wybór długości sesji (10/20/50/all), powiększenie datasetu flag do ~70** — dodane na prośbę usera przed deployem. Szczegóły: patrz Etap 5b. |

---

# Źródła i atrybucja

- **Flagi**: `flagcdn.com` (darmowe, free for any use)
- **Dźwięki**: pobrane z `github.com/campavao/the-floor` (repo bez licencji — użycie prywatne/treningowe OK; jeśli kiedyś publicznie, zamienić na CC0 z freesound.org)
- **Inspiracja game design**: oryginalny program "The Floor"
