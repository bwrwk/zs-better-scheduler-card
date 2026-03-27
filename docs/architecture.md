# ZS Better Scheduler Card: architektura i UX

## 1. Cel produktu

`ZS Better Scheduler Card` ma byc frontendem nad `scheduler-component`, ale z innym mental model usera.

Zamiast:

- osi czasu
- timeslotow
- przeciagania i dzielenia zakresow
- recznego liczenia czasu konca

uzytkownik ma operowac na prostym zdarzeniu:

- co uruchomic
- kiedy zaczac
- jak dlugo ma to trwac
- w jakie dni

Docelowy zapis dla czlowieka:

- `Wt, Sr 15:00 | Zarowka w salonie | Wlacz na 30 min`

## 2. Proponowana architektura frontendowa

Proponowany podzial:

### 2.1 Warstwa widoku

- `zs-better-scheduler-card`
- `schedule-list-view`
- `schedule-summary-row`
- `schedule-editor-dialog`
- `target-picker`
- `action-picker`
- `weekday-selector`
- `duration-input`
- `tag-chip-list`

Ta warstwa zna tylko model UI i nie zna backendowych timeslotow.

### 2.2 Warstwa aplikacyjna

- `scheduler-store`
- `scheduler-service`
- `entity-capability-service`
- `validation-service`

Odpowiada za:

- ladowanie danych z websocket i REST
- normalizacje danych
- przeliczanie i walidacje formularza
- subskrypcje live updates
- filtrowanie i sortowanie listy

### 2.3 Warstwa adaptera

- `scheduler-adapter.ts`

To kluczowa warstwa tlumaczaca:

- `scheduler-component` storage -> UI event model
- UI event model -> payload `scheduler/add` lub `scheduler/edit`

To tu ukrywamy fakt, ze backend jest timeslotowy.

### 2.4 Warstwa integracji z HA

- websocket `scheduler`
- websocket `scheduler/item`
- websocket `scheduler/tags`
- websocket `scheduler_updated`
- POST `scheduler/add`
- POST `scheduler/edit`
- POST `scheduler/remove`

Wazne: frontend powinien korzystac tylko z oficjalnych punktow integracji komponentu, bez hackow na encjach wewnetrznych.

## 3. Model domenowy po stronie UI

Backend jest timeslotowy, ale UI powinno miec model eventowy.

### 3.1 Gowna encja UI

```ts
type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

type SchedulerTargetRef = {
  entityId: string;
  domain: "light" | "switch" | "script" | "automation" | "scene" | "input_boolean" | string;
  label: string;
};

type SchedulerActionKind =
  | "turn_on_for_duration"
  | "turn_off"
  | "toggle"
  | "run"
  | "activate"
  | "custom_service";

type UiScheduleEvent = {
  id?: string;
  enabled: boolean;
  weekdays: Weekday[];
  startTime: string;
  durationMinutes?: number;
  target: SchedulerTargetRef;
  action: {
    kind: SchedulerActionKind;
    service?: string;
    serviceData?: Record<string, unknown>;
    label: string;
  };
  tags: string[];
  conditions?: UiScheduleCondition[];
  jitter?: {
    enabled: boolean;
    minutes: number;
  };
  note?: string;
  sourceMeta?: {
    backendScheduleId?: string;
    compatibility: "native" | "derived" | "lossy";
  };
};
```

### 3.2 Dlaczego ten model jest dobry

- odpowiada temu, jak mysli uzytkownik
- daje prosty formularz add/edit
- nie wymaga liczenia czasu konca
- pozwala pozniej zmienic backend bez przepisywania calego UI

Najwazniejsza decyzja: UI nie powinno traktowac `timeslot` jako swojej encji pierwszej klasy.

## 4. Mapowanie na obecny backend

## 4.1 Co da sie zmapowac elegancko

Dobrze mapowalne w MVP:

- `enabled` -> flaga aktywnosci harmonogramu
- `weekdays` -> dni wykonania
- `startTime` -> czas startu pierwszego slotu
- `target` -> encja lub usluga wywolywana przez scheduler
- `action.kind` dla prostych przypadkow:
  - `light.turn_on`
  - `light.turn_off`
  - `switch.turn_on`
  - `switch.turn_off`
  - `script.turn_on`
  - `automation.trigger`
  - `scene.turn_on`
  - `input_boolean.turn_on`
  - `input_boolean.turn_off`
- `tags` -> backendowe tagi

To pokrywa prosty model:

- uruchom cos o czasie X
- opcjonalnie wylacz po czasie Y, jesli adapter umie to bezpiecznie rozlozyc

## 4.2 Co bedzie sztuczne lub problematyczne

### `start + duration`

To jest najwiekszy problem, bo backend nie ma tego jako bytu pierwszej klasy.

Mapowanie zwykle bedzie wymagalo:

- slotu startowego `turn_on` o `16:20`
- slotu koncowego `turn_off` o `17:00`

Czyli UI udaje jeden event, ale backend dostaje co najmniej dwa wpisy lub jeden wpis z kilkoma timeslotami, zaleznie od mozliwosci payloadu.

Ryzyka:

- crossing midnight, np. `23:50 + 40 min`
- rozjazd po recznej edycji poza nasza karta
- trudnosc w jednoznacznym rozpoznaniu, czy dwa sloty tworza jeden event UI
- edge case, gdy encja nie ma sensownego `turn_off`

### `toggle`

`toggle` jest wygodne w UI, ale slabe semantycznie w schedulerze, bo wynik zalezy od aktualnego stanu. Dla przewidywalnosci lepiej w MVP ukrywac `toggle` albo oznaczyc jako zaawansowane.

### `randomness / jitter`

Jesli backend nie wspiera tego natywnie, to taka funkcja jest tylko pozorna. W MVP najlepiej nie udawac pelnego wsparcia.

### warunki

Proste warunki moga byc mapowalne, ale bardziej zlozone warunki szybko wejda w obszar automatyzacji, a nie prostego harmonogramu.

## 4.3 Kiedy mapowanie jest `lossy`

Adapter powinien umiec oznaczyc wpis jako:

- `native`: da sie w pelni pokazac i zapisac
- `derived`: da sie pokazac jako event, ale backendowy zapis jest zlozony
- `lossy`: istnieje backendowy harmonogram, ale nie da sie go bezpiecznie edytowac w prostym modelu

To pozwala uniknac klamstwa UX.

## 5. Proponowana warstwa adaptera

## 5.1 Kierunek A: UI -> backend

```ts
type SchedulerPayloadAdapter = {
  toCreatePayload(event: UiScheduleEvent): SchedulerAddPayload;
  toEditPayload(event: UiScheduleEvent): SchedulerEditPayload;
};
```

Zasada dla MVP:

- `turn_on_for_duration` mapujemy do pary akcji: start i stop
- jesli target nie wspiera naturalnego stopu, UI blokuje duration albo proponuje inna akcje
- jesli event przechodzi przez polnoc, adapter albo:
  - rozbija wpis na dwa dni i jasno to komunikuje
  - albo blokuje taki zapis w MVP

Rekomendacja MVP:

- na start zablokowac crossing midnight
- unikniemy bardzo wielu niejasnosci

## 5.2 Kierunek B: backend -> UI

Adapter probuje rozpoznac wzorce:

1. pojedynczy slot `turn_on` bez pary stop
2. para `turn_on` + `turn_off` tego samego targetu w tym samym dniu
3. akcja typu `scene.turn_on` lub `script.turn_on` bez duration
4. wpis niestandardowy, ktory nie daje sie bezpiecznie sprowadzic do prostego eventu

Mozliwy wynik:

```ts
type UiScheduleProjection =
  | { mode: "editable"; event: UiScheduleEvent }
  | { mode: "readonly"; reason: string; rawSummary: string };
```

To bardzo wazne dla przyszlej zgodnosci z istniejacymi harmonogramami edytowanymi poza nowa karta.

## 6. MVP karty

## 6.1 Widok listy harmonogramow

Elementy:

- lista wierszy eventow
- wyszukiwanie po nazwie celu
- filtr aktywne / nieaktywne
- filtr po tagu
- przycisk `Dodaj harmonogram`

Kazdy wiersz:

- status aktywny / nieaktywny
- skrot dni tygodnia
- godzina startu
- target
- akcja
- duration, jesli dotyczy
- tagi
- menu: edytuj, wlacz/wylacz, usun

Przyklad podsumowania:

- `Wt, Sr 16:20 | Salon | Wlacz na 40 min`
- `Codziennie 07:00 | Rolety | Otworz`

## 6.2 Formularz add/edit

Kolejnosc pol zgodna z mental model:

1. `Target`
2. `Akcja`
3. `Start time`
4. `Duration`
5. `Days`
6. `Tags`
7. `Active`

Zasady UX:

- jedno kolumnowe, czytelne grupy
- domyslnie tylko pola podstawowe
- bardziej zaawansowane opcje schowane pod `Zaawansowane`
- live preview tekstowy na gorze formularza

Przyklad preview:

- `Wt, Sr 16:20 | Lampa salon | Wlacz na 40 min`

## 6.3 Zakres MVP

W MVP wspierac tylko przypadki o wysokiej przewidywalnosci:

- on at time
- off at time
- on for duration
- run script / scene / automation at time
- podstawowe tagi
- active / inactive

Odlozyc:

- zlozone warunki
- losowosc
- crossing midnight
- wieloetapowe sekwencje
- zaawansowane service data dla kazdej domeny

## 7. UX/UI z naciskiem na prostote

## 7.1 Glowny widok

Glownym widokiem nie powinna byc os czasu.

Lepszy model:

- lista eventow
- kazdy event jako czytelny rekord
- klik otwiera prosty formularz

To jest bliższe temu, jak ludzie mysla o przypomnieniach i kalendarzu niz o edycji wykresu.

## 7.2 Wzorzec prezentacji

Kazdy rekord powinien miec:

- pierwsza linie: dni + godzina + target
- druga linie: akcja, duration, tagi
- po prawej: status i menu akcji

Przyklad:

- `Wt, Sr 16:20`
- `Salon`
- `Wlacz na 40 min`

Mozna to skondensowac do jednego zdania w list view:

- `Wt, Sr 16:20 | Salon | Wlacz na 40 min`

## 7.3 Edytor

Edytor powinien przypominac bardziej:

- tworzenie prostego wydarzenia

niz:

- rysowanie harmonogramu

W praktyce:

- brak drag and drop jako glownej interakcji
- brak osi czasu jako glownego kontrolera
- input czasu plus input duration
- szybkie presety duration: `15 min`, `30 min`, `45 min`, `1 h`

## 8. Granica: prosty harmonogram vs zlozony scenariusz

Prosty harmonogram to:

- jeden target
- jedna glowna akcja
- prosty czas startu
- opcjonalny prosty czas trwania
- proste dni
- ewentualnie podstawowy tag

To powinno zostac w karcie.

Zlozony scenariusz to:

- kilka targetow
- zaleznosci warunkowe
- losowosc z wieloma regułami
- logika oparta o obecność, pogodę, alarm, stan domu
- sekwencje typu `zrob A, potem B, potem C`

To powinno zyc jako:

- skrypt
- automatyzacja
- osobna integracja domenowa

Scheduler ma wtedy tylko wywolac taki scenariusz.

To daje czystsza granice odpowiedzialnosci:

- scheduler planuje
- scenariusz realizuje logike

## 9. Ryzyka architektoniczne i migracyjne

## 9.1 Ryzyko nr 1: zbyt mocne zakotwiczenie UI w timeslotach

Jesli zaczniemy przeciekac backend do widoku, to pozniejsza migracja do wlasnego backendu bedzie bolesna.

Rekomendacja:

- utrzymac `UiScheduleEvent` jako kontrakt nadrzedny
- backend traktowac jako implementacje adaptera

## 9.2 Ryzyko nr 2: udawanie, ze wszystko jest edytowalne

Niektorych backendowych wpisow nie da sie uczciwie przedstawic jako prosty event.

Rekomendacja:

- wspierac tryb `readonly incompatible schedule`
- pokazywac jasny komunikat, ze wpis jest spoza prostego modelu

## 9.3 Ryzyko nr 3: nadmierne wsparcie domen w MVP

Kazda domena ma inne semantyki akcji.

Rekomendacja:

- zaczac od kuracji akcji per domena
- nie dawac dowolnego service call w podstawowym formularzu

## 9.4 Ryzyko nr 4: duration jako obietnica, ktorej backend nie gwarantuje

To najwrazliwszy element UX.

Rekomendacja:

- w MVP wspierac duration tylko tam, gdzie mamy przewidywalne `start/stop`
- brak wsparcia oznaczyc wprost przy wyborze targetu i akcji

## 9.5 Ryzyko nr 5: przyszla migracja do wlasnego backendu

Najbardziej migracjo-odporne decyzje:

- osobny UI model
- osobny adapter
- store i service bez zaleznosci od ksztaltu timeslotow w widokach
- readonly fallback dla niekompatybilnych wpisow

Najbardziej niebezpieczne decyzje:

- zapis UI state bezposrednio w ksztalcie payloadu backendu
- budowanie formularza wokol timeslot arrays
- uznanie, ze `duration` zawsze daje sie odzyskac z danych backendu

## 10. Rekomendacja wdrozeniowa

Etap 1:

- zrobic MVP nad `scheduler-component`
- ograniczyc scope do prostych, przewidywalnych eventow
- jawnie oznaczac przypadki niekompatybilne

Etap 2:

- sprawdzic, ile wpisow w realnym zyciu wypada poza model eventowym
- ocenic, czy adapter nie staje sie zbyt kruchy

Etap 3:

- jesli adapter zacznie dominowac zlozonoscia, rozważyć wlasny backend oparty natywnie o `event + duration`

## 11. Finalna rekomendacja

Tak, warto zaczac od wlasnej karty nad `scheduler-component`.

Ale trzeba od razu przyjac trzy twarde zasady:

- UI projektujemy event-first, nie timeslot-first
- adapter jest jawna warstwa graniczna
- MVP ograniczamy do przypadkow, ktore sa semantycznie przewidywalne

To daje najlepszy kompromis:

- szybko sprawdzimy wartosc nowego UX
- nie przepalimy czasu na wlasny backend za wczesnie
- nie zamkniemy sobie drogi do przyszlej migracji
