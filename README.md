## Rate This Game

Это Приложение для поиска и оценки видеоигр с использованием публичного RAWG API. Интерфейс построен на HeroUI и Tailwind CSS, состояние — через Redux Toolkit (RTK Query).

## Об идеи 
Я люблю играть в игры. А еще я люблю обдумывать и оценивать любой контент, будь то фильм, игра или музыка. Изначальное вдохновение было взято от проекта 'РЗТ', крупное музыкальное сообщество, основанное на идеи осмысления и оценивания музыки. Мне захотелось ничто подобное для сферы игр, оссобенно учитывая что хорошая игра - куда более крупный и разноплановый проект чем музыка или даже фильмы. Не найдя ничего подобного в инетернете я решил сделать свою альтернативу. Проект еще в разработке, много чего надо и будет сделано. Если есть идеи, пишите.

### Технологии

- **Next.js 15 (App Router)**
- **React 18**, **TypeScript**
- **HeroUI v2**, **Tailwind CSS 4**
- **Redux Toolkit**, **RTK Query**, **react-redux**
<!-- - **next-themes** (тёмная/светлая темы) -->

## Быстрый старт

1. Установите зависимости:

```bash
npm install
```

2. Создайте `.env.local` в корне проекта и добавьте ключ RAWG:

```bash
NEXT_PUBLIC_RAWG_API_KEY=ВАШ_КЛЮЧ_RAWG
```

3. Запустите приложение в режиме разработки:

```bash
npm run dev
```

Приложение будет доступно на `http://localhost:3000`.

## Скрипты

- `npm run dev` — запуск dev-сервера Next.js (с Turbopack)
- `npm run build` — продакшн-сборка
- `npm run start` — запуск собранного приложения
- `npm run lint` — запуск ESLint (с автоисправлениями)

## Переменные окружения

- `NEXT_PUBLIC_RAWG_API_KEY` — публичный ключ RAWG API. Используется в `store/services/rawgApi.ts`, автоматически добавляется как параметр `key` ко всем запросам.

Создайте файл `.env.local` (не коммитьте его) и укажите значение.

## Структура проекта

```
app/
  error.tsx               # Страница ошибки
  layout.tsx              # Корневой layout App Router
  page.tsx                # Главная страница
  providers.tsx           # Провайдеры темы, Redux и т.п.

components/
  GameBlock.tsx           # Карточка/блок игры
  NavBar.tsx              # Навигационная панель
  RatingBlock.tsx         # Блок оценки игры

config/
  fonts.ts                # Подключение шрифтов
  site.ts                 # Константы сайта

store/
  reducers/
    rateSlice.ts          # Slice для локальных оценок/рейтингов
  services/
    rawgApi.ts            # RTK Query API для RAWG
  store.ts                # Конфигурация Redux store

styles/
  globals.css             # Глобальные стили (Tailwind)

types/
  index.ts                # Типы данных (RawgGame и пр.)

utils/
  hooksRedux.ts           # Хуки useAppDispatch/useAppSelector

tailwind.config.js        # Tailwind + HeroUI плагин
next.config.js            # Конфиг Next.js
eslint.config.mjs         # Настройки ESLint
tsconfig.json             # Настройки TypeScript
```

## Архитектура и ключевые моменты

- **App Router** (`app/`): маршрутизация, общий `layout`, провайдеры в `providers.tsx`.
- **RTK Query** (`store/services/rawgApi.ts`): эндпоинты `searchGames`, `getGameById`; API-ключ добавляется в `paramsSerializer`.
- **Redux store** (`store/store.ts`): подключение `rawgApi.reducer`, `rateSlice`, мидлварь RTK Query.
- **UI**: компоненты в `components/`, стили через Tailwind; HeroUI подключён через плагин в `tailwind.config.js`.
<!-- - **Темы**: `next-themes` с режимом `class` (см. `tailwind.config.js` и провайдеры). -->

## Лицензия

MIT. См. файл `LICENSE`.
