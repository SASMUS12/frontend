import {Api} from "./openapi";

export const apiConfig = {
  baseUrl: 'https://lingvogo.acceleratorpracticum.ru',
};

export const api = new Api(apiConfig);

const array = ['Русская культура', 'Путешествия', 'Дизайн', 'Кулинария', 'Книги', 'Языки', 'Спорт'];

export default array;