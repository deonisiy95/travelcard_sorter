# travelcard_sorter
## Сортировщик карточек путешественника

Вам дана стопка посадочных карточек на различные виды транспорта, которые доставят вас из точки A в точку B. Карточки перепутаны, и вы не знаете, где начинается и где заканчивается ваше путешествие. Каждая карточка содержит информацию о том, откуда и куда вы едете на данном отрезке маршрута, а также о типе транспорта (номер рейса, номер места и прочее).

Предоставьте JavaScript API, который отсортирует такой список карточек и вернет словесное описание, как проделать ваше путешествие. API должен принимать на вход несортированный список карточек в формате, придуманном вами, и возвращать, например, такое описание:

* Take train 78A from Madrid to Barcelona. Seat 45B.
* Take the airport bus from Barcelona to Gerona Airport. No seat assignment.
* From Gerona Airport, take flight SK455 to Stockholm. Gate 45B. Seat 3A. Baggage drop at ticket counter 344.
* From Stockholm, take flight SK22 to New York JFK. Gate 22. Seat 7B. Baggage will be automatically transferred from your last leg.

## Установка
Добавьте `travel_card_sorter.js` к проекту:

```<script type="text/javascript" src="travel_card_sorter.js"></script>```

### Формат входных данных

API принимает массив объектов, следующего вида:
```
[
  {
    // точка отправления в рамках отрезка маршрута
    departure: {
        name: string
    },
    // точка назначения в рамках отрезка маршрута
    destination: {
        name: string
    },
    // информация о транспорте
    transport: {
        type: string, // тип транспорта (bus, train, flight, ferry, etc.)
        number: string, // номер транспорта
        departure_point: string, // дополнительная информация о точке отправления из билетов (gate, platform, pier, etc.)
        seat: string, // номер места в транспорте
        baggage: string, // информация, касающаяся багажа
    },
  }
  {
    ...
  }
]
```
Обязательными являются departure.name, destination.name и transport. Поддерживаемые типы транспорта: flight, train, airport_bus, taxi, если способ передвижения не указан, словестное отображение карточки будет иметь вид "Go from A to B".

Информация о точке отправления (departure) и точке назначения (destination) выделены в отдельные объекты с одним свойством name для того, чтобы в будущем была возможность расширение информации о точках.

### Использование

```
let travel_description = TravelCardSorter.sort(cards);
console.log(travel_description);
```
