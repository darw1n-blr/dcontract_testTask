

Инструкция по использованию программы для работы с Google Таблицами
===================================================================

Это приложение позволяет получать данные из внешнего API и записывать их в Google Таблицу. Для работы требуется настроить доступ к Google Sheets API, а также задать несколько переменных окружения.

Требования
----------

*   Node.js (желательно версия 16 или выше)
*   Google Cloud Project с включённым API Google Sheets и созданным сервисным аккаунтом
*   Установленные переменные окружения

Шаги по настройке
-----------------

### 1\. Создание Google Cloud Project

1.  Перейдите на [Google Cloud Console](https://console.cloud.google.com/).
2.  Создайте новый проект.
3.  Перейдите в раздел **API & Services** → **Library**.
4.  Найдите и включите **Google Sheets API**.
5.  Создайте **Service Account** в разделе **IAM & Admin** → **Service Accounts**.
6.  При создании сервисного аккаунта создайте **ключ** в формате JSON. Этот файл необходимо скачать на свой компьютер.

### 2\. Настройка доступа к Google Таблице

1.  Откройте вашу Google Таблицу.
2.  Поделитесь доступом с сервисным аккаунтом (email из JSON-ключа). Убедитесь, что у аккаунта есть права на редактирование таблицы.

### 3\. Установка зависимостей

1.  Клонируйте репозиторий:

        git clone https://github.com/darw1n-blr/dcontract_testTask
        cd your-project

2.  Установите необходимые зависимости:

        npm install


### 4\. Настройка переменных окружения

Создайте файл **.env** в корне проекта и добавьте следующие переменные:


    API_URL=ВАШ_API_URL
    API_KEY=ВАШ_API_KEY
    SHEET_ID=ВАШ_ID_Таблицы


*   **API\_URL** — URL API, с которого будут загружаться данные.
*   **API\_KEY** — Ключ доступа к API.
*   **SHEET\_ID** — ID Google Таблицы. Чтобы получить ID, откройте вашу таблицу и посмотрите на URL, например:

        https://docs.google.com/spreadsheets/d/1vYZdKHDLgxl8Tl9YQAPjFkl1GvwV3aC1Jh0eR9OlgMk/edit#gid=0

    ID таблицы в этом примере — **1vYZdKHDLgxl8Tl9YQAPjFkl1GvwV3aC1Jh0eR9OlgMk**.

### 5\. Размещение ключа сервисного аккаунта

Поместите файл с ключом сервисного аккаунта (например, **google-sheet-key.json**) в корень проекта. Убедитесь, что в вашем коде правильно указывается путь к этому файлу в переменной **googleCredentials**.

### 6\. Запуск приложения

После того, как все настройки завершены, можно запустить приложение:

    node app.js

Программа будет получать данные из API и записывать их в указанную Google Таблицу.

Пример данных
-------------

Пример данных, которые программа будет записывать в таблицу:

*   **id** — идентификатор клиента.
*   **firstName** — имя клиента.
*   **lastName** — фамилия клиента.
*   **gender** — пол клиента.
*   **address** — адрес клиента.
*   **city** — город клиента.
*   **phone** — телефон клиента.
*   **email** — email клиента.
*   **status** — статус клиента (полученные данные из API).

Примечания
----------

*   Программа записывает данные в Google Таблицу построчно, начиная с ячейки A2.
*   Каждая запись данных будет занимать по 9 столбцов (для информации о клиенте) и один столбец для статуса.
*   Для получения данных используется пагинация, поэтому при большом количестве данных программа будет делать несколько запросов к API.
*   Убедитесь, что API, с которым работает приложение, поддерживает необходимые запросы и возвращает корректные данные.

