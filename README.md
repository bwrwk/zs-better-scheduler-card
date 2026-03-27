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

- custom card gotowa do zaladowania w HACS
- pierwszy roboczy komponent Lit z lista eventow, filtrami i formularzem
- warstwe adaptera `UI event <-> scheduler payload`
- integracje websocket/API do `scheduler-component`
- readonly fallback dla niekompatybilnych wpisow
- target picker oparty o encje z `hass.states`
- testy adaptera dla podstawowych przypadkow
- dokument architektoniczny MVP i warstwy adaptera

Glowny dokument projektowy:

- [docs/architecture.md](C:\Users\User\Codex\Karty ha\zs-better-scheduler-card\docs\architecture.md)
- [docs/next-steps.md](C:\Users\User\Codex\Karty ha\zs-better-scheduler-card\docs\next-steps.md)
- [docs/backend-limitations.md](C:\Users\User\Codex\Karty ha\zs-better-scheduler-card\docs\backend-limitations.md)

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

1. sprawdzenia payloadow na zywej instancji HA i dopracowania roznic backendowych
2. obslugi bardziej zlozonych harmonogramow readonly z lepszym opisem
3. lekkiego target pickera z wyszukiwaniem, nie tylko selectem
4. rozszerzenia warunku i service data w trybie zaawansowanym
5. dopracowania detali UX po pierwszych testach w HACS
