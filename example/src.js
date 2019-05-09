//------------------------------
// Пример использования API сортировщика карточек путешественника
//------------------------------

window.onload = function () {

    // исходные данные
    let cards = [
        {
            departure: {
                name: 'Barcelona'
            },
            destination: {
                name: 'Gerona Airport'
            },
            transport: {
                type: 'airport_bus',
            },
        },
        {
            departure: {
                name: 'Gerona Airport'
            },
            destination: {
                name: 'Stockholm'
            },
            transport: {
                type: 'flight',
                number: 'SK455',
                departure_point: '45B',
                seat: '3A',
                baggage: 'Baggage drop at ticket counter 344',
            },
        },
        {
            departure: {
                name: 'Madrid'
            },
            destination: {
                name: 'Barcelona'
            },
            transport: {
                type: 'train',
                number: '78A',
                seat: '45B',
                departure_point: 'TR40',
            },
        },
        {
            departure: {
                name: 'Stockholm'
            },
            destination: {
                name: 'New York JFK'
            },
            transport: {
                type: 'flight',
                number: 'SK22',
                departure_point: '22',
                seat: '7B',
            },
        },
    ];

    // вызываем сортировку карточек, которая вернет словестное описание путешествия
    let travel_description = TravelCardSorter.sort(cards);

    // выводим маршрут в консоль
    console.log(travel_description);
};