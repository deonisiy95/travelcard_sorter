//------------------------------
// Сортировщик карточек путешественника
//------------------------------

var TravelCardSorter = (function () {

    // основная функция для сортировки карточек
    // cards - массив объектов вида:
    // {
    //     // точка отправления в рамках отрезка маршрута
    //     departure: {
    //         name:
    //     },
    //     // точка назначения в рамках отрезка маршрута
    //     destination: {
    //         name: string
    //     },
    //     // информация о транспорте
    //     transport: {
    //         type: string, // тип транспорта (bus, train, flight, ferry, etc.)
    //         number: string, // номер транспорта
    //         departure_point: string, // дополнительная информация о точке отправления из билетов
    //         seat: string, // номер места в транспорте
    //         baggage: string, // информация, касающаяся багажа
    //     },
    // }
    function sort(cards) {

        // если входные данные не валидные
        if (!_isValidData(cards)) {
            return;
        }

        // отсортированный список карточек
        let sorted_card_list = [];

        // получаем начальную карточку
        let card = _getFirstCard(cards);

        // выполняем пока поиск следующей карточки удачен
        while (card) {

            // добавляем карточку в массив
            sorted_card_list.push(card);

            // получаем следующую карточку
            card = _getCardByDeparture(card.destination.name, cards);
        }

        // возвращаем строку с словестным описанием путешествия отсортированных карточек
        return _print(sorted_card_list);
    }

    // проверка входных данных
    function _isValidData(cards) {

        let card;

        let departure_list = [];
        let destination_list = [];

        // если ничего не передали
        if(cards === undefined) {

            console.error('Traveler cards not passed');
            return false;
        }

        // проверяем все карточки
        for(let i in cards) {

            // текущая карточка
            card = cards[i];

            // если у карточки нет информации о транспорте
            if (!card.transport) {

                // выводим ошибку в консоль
                console.error('Transport info is missing in ' + JSON.stringify(card));
                return false;
            }

            // если у карточки нет информации о точке отправления
            if(!card.departure || !card.departure.name || card.departure.name === '') {

                // выводим ошибку в консоль
                console.error('Departure info is missing in ' + JSON.stringify(card));
                return false;
            }

            // если у карточки нет информации о точке назначения
            if(!card.destination || !card.destination.name || card.destination.name === '') {

                // выводим ошибку в консоль
                console.error('Destination info is missing in ' + JSON.stringify(card));
                return false;
            }

            departure_list.push(card.departure.name.toLowerCase());
            destination_list.push(card.destination.name.toLowerCase());
        }

        // проверим что передали карточки образующие одну непрерывную цепочку
        // т.е должна быть одна точка отправления и одна конечная точка
        let count_departure_card = departure_list.filter(item => destination_list.indexOf(item) === -1).length;
        let count_destination_card = destination_list.filter(item => departure_list.indexOf(item) === -1).length;

        if(count_departure_card !== 1 || count_destination_card !== 1) {

            console.error('Cards do not form a continuous chain');
            return false;
        }

        return true;
    }

    // получение карточки по точке отправления
    function _getCardByDeparture(departure, cards) {

        // фильтруем карточки
        let card_list = cards.filter((card) => {

            return card.departure.name.toLowerCase() === departure.toLowerCase();
        });

        return card_list[0];
    }

    // нахождение начальной карточки
    function _getFirstCard(cards) {

        // массив точек назначения
        let destination_list = cards.map((card) => {

            return card.destination.name.toLowerCase();
        });

        // если карточка начальная, то точка отправления в этой карточке
        // не будет совпадать с точкой назначения в какой-либо другой карточке
        for(let card of cards) {

            if (destination_list.indexOf(card.departure.name.toLowerCase()) === -1) {
                return card;
            }
        }
    }

    // формирует строку - словесное описание, как проделать путешествие
    function _print(cards) {

        // результирующая строка
        let travel_description = '';

        // для каждой карточки формируем словестное описание
        cards.forEach((card, index) => {

            switch (card.transport.type) {
                case 'flight':

                    travel_description += `${index + 1}. From ${card.departure.name}, take flight${card.transport.number ? ' ' + card.transport.number : ''} to ${card.destination.name}. ` +
                    `${card.transport.departure_point ? 'Gate ' + card.transport.departure_point + '. ': ''}` +
                    `${card.transport.seat ? 'Seat ' + card.transport.seat + '. ' : 'No seat assigned. '}` +
                    `${card.transport.baggage ? card.transport.baggage + '. ': ''}\n`;
                    break;
                case 'train':

                    travel_description += `${index + 1}. Take train${card.transport.number ? ' ' + card.transport.number : ''}, ` +
                    `from ${card.departure.name} to ${card.destination.name}. ` +
                    `${card.transport.departure_point ? 'Platform ' + card.transport.departure_point + '. ': ''}` +
                    `${card.transport.seat ? 'Seat ' + card.transport.seat + '. ' : 'No seat assigned. '}` +
                    `${card.transport.baggage ? card.transport.baggage + '. ': ''}\n`;
                    break;
                case 'airport_bus':
                    travel_description += `${index + 1}. Take the airport bus${card.transport.number ? ' ' + card.transport.number : ''}, ` +
                    `from ${card.departure.name} to ${card.destination.name}. ` +
                    `${card.transport.departure_point ? 'Bus stop ' + card.transport.departure_point + '. ': ''}` +
                    `${card.transport.seat ? 'Seat ' + card.transport.seat + '. ' : 'No seat assigned. '}` +
                    `${card.transport.baggage ? card.transport.baggage + '. ': ''}\n`;
                    break;
                case 'taxi':
                    travel_description += `${index + 1}. Take a taxi from ${card.departure.name} to ${card.destination.name}.\n`;
                    break;
                default:
                    travel_description += `${index + 1}. Go from ${card.departure.name} to ${card.destination.name}.\n`;
            }
        });

        return travel_description;
    }

    return {
        sort: sort
    }

}());
