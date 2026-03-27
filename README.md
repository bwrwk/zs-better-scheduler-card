# ZS Better Scheduler Card

Koncepcja nowej karty Lovelace dla Home Assistanta do prostego tworzenia i edycji harmonogramow nad `nielsfaber/scheduler-component`.

## Cel

Karta ma ukrywac backendowy model `timeslots` i dawac zwyklemu uzytkownikowi prostszy model:

- wybierz cel
- wybierz akcje
- ustaw start
- ustaw czas trwania
- wybierz dni
- opcjonalnie dodaj tagi i proste warunki

Zamiast myslenia osia czasu, karta ma promowac myslenie eventem:

- `Wt, Sr 16:20 | Salon | Wlacz na 40 min`

## Zakres tego repo

W tej chwili repo zawiera:

- szkielet projektu custom card
- pierwszy roboczy komponent Lit z lista eventow i formularzem
- warstwe adaptera `UI event -> scheduler payload`
- testy adaptera dla podstawowych przypadkow
- dokument architektoniczny MVP i warstwy adaptera

Glowny dokument projektowy:

- [docs/architecture.md](C:\Users\User\Codex\Karty ha\zs-better-scheduler-card\docs\architecture.md)

## Zakladany kierunek implementacji

- frontend nad `scheduler-component`
- wlasny model domenowy UI oparty o `event + duration`
- adapter mapujacy UI na backendowe `timeslots`
- formularz i lista eventow zamiast glownego edytora timeline

## Potencjalny MVP

- lista harmonogramow
- tworzenie i edycja eventu
- dni tygodnia
- start time
- duration
- akcja
- target
- aktywne i nieaktywne
- podstawowe tagi

## Rozwoj

Nastepny krok po akceptacji projektu to implementacja:

1. providerow websocket i API
2. podpiecia listy do realnych harmonogramow z backendu
3. edycji i zapisu przez `scheduler/add` oraz `scheduler/edit`
4. readonly fallback dla niekompatybilnych wpisow
5. lekkiego target pickera opartego o encje HA
