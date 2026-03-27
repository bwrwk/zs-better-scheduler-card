# Backend Limitations

Karta `ZS Better Scheduler Card` dziala obecnie nad `scheduler-component`.

To oznacza kilka istotnych ograniczen, ktore wynikaja z backendu, a nie z samego UI:

## Najwazniejsze

- backend jest `timeslot-first`, nie `event-first`
- `start + duration` jest mapowane na pare akcji `turn_on` i `turn_off`
- bardzo krotkie duration nie sa w pelni wiarygodne
- aktywnosc harmonogramu jest obslugiwana osobno przez encje `switch.schedule_*`
- nie wszystkie wpisy backendowe da sie uczciwie pokazac jako prosty event

## Znany przypadek

Na zywej instancji HA zostalo potwierdzone, ze:

- `duration = 1 min` moze byc pominiete przez `scheduler-component`
- dlatego karta wymusza obecnie minimum `2 min` dla trybu `na czas`

## Skutek dla UI

Jesli wpis nie miesci sie w prostym modelu event-first, karta pokazuje go jako:

- `readonly`

W takim przypadku karta nie ukrywa problemu, tylko pokazuje:

- powod
- szczegoly
- surowe timesloty backendu

## Szerszy kontekst

Pelniejsza lista ograniczen obecnego backendu jest opisana roboczo w repo:

- [C:\Users\User\Codex\Homeassistant\zs-scheduler-pro\docs\current-backend-limitations.md](C:\Users\User\Codex\Homeassistant\zs-scheduler-pro\docs\current-backend-limitations.md)
