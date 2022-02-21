# Project 2
____
**CRUD** - Create Read Update Delete (the main commands of each application)

**Data**: Persons (class Person below)

**Databases**:
- MySQL
- MongoDB

class **Person**, fields:

id, fname, lname, age, city, phoneNumber, email, companyName;
____
## Main page:
1) Дропдаун выбора базы данных, по умолчанию - MySQL;
2) Поисковая строка для поиска необходимой записи по fname;
3) Поисковая строка для поиска необходимой записи по lname;
4) Дропдаун для выбора сортировки данных по каждому полю;
5) Контрольная панель с кнопками: Create, Update, Delete, ClearAll;
6) Панель ввода данных (label + input, где label - имя поля персоны);
7) Дропдаун с локализацией (en, ru), по умолчанию en;
8) Дропдаун со сменой темы (light, black), по умолчанию light;
9) Кнопка logout -> переход на страницу авторизации;
10) Кнопка settings -> настройки пользователя: можно изменить свой логин
    и/или пароль.
![Main-Light](https://sun9-4.userapi.com/impg/uuwQs03C1A47NChpTt0VbbvR_QkzRwNiOBWgcg/jJWF8FANQzo.jpg?size=1920x1080&quality=96&sign=4a82dc96c8f7e1e8b53443667c379409&type=album)

![Main-Dark](https://sun9-35.userapi.com/impg/13Yslyya6hVkG3weD7lbAmqTD4He1SN8OpoXsA/nrwFVyLiuiM.jpg?size=1920x1080&quality=96&sign=d48b272a992daa2606e4134de3ad4a80&type=album)
____
## Auth page:
1) Форма с логином и паролем + кнопка Login, а также ссылка на форму
регистрации SignUp;
![Auth-Light](https://sun9-43.userapi.com/impg/vJX7dc4ZthCKzfhK-JDPNWG4Cw-Vu7i8Lljp7Q/lufXR4wnQC4.jpg?size=1920x1080&quality=96&sign=b92b30c0dedba7a250c08b0b7208bf3e&type=album)
![Auth-Dark](https://sun9-47.userapi.com/impg/T5IRBbYvg4WqT-9SssGTsVdVN0ktCRDJk3m37Q/GT5SCiQHmvA.jpg?size=1920x1080&quality=96&sign=363843d1eba95cc5c66f09b52d2cd098&type=album)
____
## Reg page:
1) Форма с логином, паролем, подтверждением пароля. Логин уникален. Все
   поля обязательны для ввода.
![Reg-Light](https://sun9-62.userapi.com/impg/q1RyXgm3HWV8C5yapbOd8Th2EwCiVQlseP1deg/QDXS-nbfhyI.jpg?size=1920x1080&quality=96&sign=eb8a70fd5fe53952b7cc1bb1bd4dd06e&type=album)
![Reg-Dark](https://sun9-75.userapi.com/impg/3jaXtfKznzwXkMEgoIXtKpXcLGVmibdbAoBF3w/FbmUGlGtUp0.jpg?size=1920x1080&quality=96&sign=6afa72ef0ec78ab1718a20cf124538b6&type=album)
____
## How to run this project?
```
yarn install
yarn build
yarn start
```

____
[Ссылка на сайт](https://wannaworkinginwizarddev.herokuapp.com/)

