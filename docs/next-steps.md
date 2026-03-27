# Next Steps

Lista rzeczy do dopracowania w `ZS Better Scheduler Card` po pierwszych testach na zywej instancji HA.

## 1. Odczyt szczegolow backendowych wpisow

Do sprawdzenia i dopracowania:

- czy `scheduler/item` zawsze zwraca komplet danych dla wpisow z warunkami i tagami
- czy projection `backend -> UI` dobrze zachowuje sie dla bardziej zlozonych wpisow
- czy readonly fallback daje wystarczajaco jasny opis problemu

## 2. Lepszy readonly UX

Obecny fallback dziala technicznie, ale warto go ulepszyc:

- pokazac bardziej ludzki opis, dlaczego wpis jest readonly
- pokazac surowe sloty lub uproszczone podsumowanie backendowe
- dodac CTA typu `edytuj w scheduler-card` albo `otworz szczegoly`

## 3. Target picker z wyszukiwaniem

Obecny select oparty o `hass.states` dziala, ale przy wiekszej liczbie encji bedzie niewygodny.

Do zrobienia:

- wyszukiwarka po nazwie i `entity_id`
- filtrowanie po domenie
- mozliwosc szybkiego wyboru ostatnio uzywanych targetow

## 4. Walidacja i komunikaty domenowe

Do dopracowania:

- lepsze komunikaty zalezne od domeny i akcji
- pokazywanie, kiedy dana domena nie wspiera sensownie `duration`
- czytelne blokowanie przypadkow niepewnych backendowo

## 5. Krotkie duration

Na obecnym backendzie:

- `1 min` okazalo sie niepewne

Obecnie karta blokuje takie wpisy, ale warto jeszcze:

- pokazac to bardziej czytelnie w UI
- zaszyc preset od `2 min`
- rozważyć opis ograniczenia w README i changelogu

## 6. Edit flow

Do sprawdzenia na zywej instancji:

- czy `edit` zawsze odswieza `next_trigger` przewidywalnie
- czy zmiana tagow, dni i targetu daje oczekiwany efekt we wszystkich przypadkach
- czy po zapisie karta zawsze dobrze synchronizuje draft z backendem

## 7. Filtry i lista

Obecne filtry dzialaja, ale sa nadal MVP.

Do rozwoju:

- sortowanie po czasie startu
- grupowanie aktywne / nieaktywne
- grupowanie po dniach lub tagach
- lepsza prezentacja encji i domen

## 8. Zaawansowane pola

Na razie mamy tylko podstawowy model.

Do przyszlego rozwazenia:

- conditions
- `service_data`
- `repeat_type`
- daty startu i konca

Te pola powinny trafic do sekcji `Zaawansowane`, nie do glownego flow.

## 9. Testy

Aktualne testy obejmuja glownie adapter.

Warto dolozyc:

- testy projection `backend -> UI`
- testy walidacji `duration`
- testy mapowania akcji per domena
- testy scenariuszy readonly

## 10. Dokumentacja produktu

Do uzupelnienia:

- znane ograniczenia obecnego backendu
- lista wspieranych domen i akcji
- opis przypadkow readonly
- opis ograniczenia `minimum 2 min` dla duration
