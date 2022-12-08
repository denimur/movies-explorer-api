const ERROR_MESSAGES = {
  conflict: 'Пользователь с такими данными уже существует.',
  userCreateBadRequest: 'Переданы неверные данные при создании пользователя.',
  userNotFound: 'Пользователь по указанному _id не найден.',
  userUpdateBadRequest: 'Переданы неверные данные при обновлении пользователя.',
  movieCreateBadRequest: 'Переданы неверные данные при создании фильма.',
  movieNotFound: 'Фильм с указанным _id не найден.',
  movieDeleteForbidden: 'Удалять можно только свои фильмы.',
  movieDeleteBadRequest: 'Переданы неверные данные при удалении фильма.',
  sourceNotFound: 'Запрашиваемый ресурс не найден',
  unauthorized: 'Необходима авторизация.',
  serverError: 'На сервере произошла ошибка',
  wrongCredentials: 'Недействительный email или пароль.',
  wrongEmailFormat: 'Неправильный формат почты.',
};

const DB_URL = 'mongodb://localhost:27017/moviesdb';

module.exports = { ERROR_MESSAGES, DB_URL };
