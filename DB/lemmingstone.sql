-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:8889
-- Время создания: Ноя 20 2024 г., 13:59
-- Версия сервера: 8.0.35
-- Версия PHP: 8.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `lemmingstone`
--

-- --------------------------------------------------------

--
-- Структура таблицы `boss_type`
--

CREATE TABLE `boss_type` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `width` int NOT NULL,
  `height` int NOT NULL,
  `speed` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `global_settings`
--

CREATE TABLE `global_settings` (
  `id` int NOT NULL,
  `version` int NOT NULL,
  `boss_timeout` int NOT NULL COMMENT 'Промежуток, через который вываливается босс',
  `game_timeout` int NOT NULL COMMENT 'Время шага, через который обновляется игровая сцена. 150mc'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `hashes`
--

CREATE TABLE `hashes` (
  `id` bigint UNSIGNED NOT NULL,
  `chat_hash` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `game_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `game_timestamp` int NOT NULL COMMENT 'Текущее время в игре',
  `other_hashes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Какие-то другие хеши'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `inventory`
--

CREATE TABLE `inventory` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `type_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE `items` (
  `id` int NOT NULL,
  `type_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `item_type`
--

CREATE TABLE `item_type` (
  `id` int NOT NULL,
  `type` enum('ladder','farm','lopata','dynamite','immortal') COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` int NOT NULL COMMENT 'Характеристика предмета'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `lemming_slot`
--

CREATE TABLE `lemming_slot` (
  `id` int NOT NULL,
  `lemming_id` int NOT NULL,
  `slot` int DEFAULT NULL COMMENT 'ID предмета, если есть'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `lemming_type`
--

CREATE TABLE `lemming_type` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `speed` float NOT NULL,
  `slots_count` int DEFAULT '1',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `map`
--

CREATE TABLE `map` (
  `id` int NOT NULL,
  `background` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sprite_id` int NOT NULL,
  `start_time` int NOT NULL,
  `points` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Массив точек в формате JSON'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `map_boss`
--

CREATE TABLE `map_boss` (
  `id` int NOT NULL,
  `boss_id` int NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `direction` enum('left','right') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('move','jump','stunned') COLLATE utf8mb4_unicode_ci NOT NULL,
  `stunned_timestamp` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `map_damage`
--

CREATE TABLE `map_damage` (
  `id` int NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `timestamp` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `map_farm`
--

CREATE TABLE `map_farm` (
  `id` int NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `timestamp` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `map_items`
--

CREATE TABLE `map_items` (
  `id` int NOT NULL,
  `type` enum('key','market','grave','coin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `map_ladder`
--

CREATE TABLE `map_ladder` (
  `id` int NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `direction` enum('vertical','horizontal','diagonale-left','diagonale-right') COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `map_lopata`
--

CREATE TABLE `map_lopata` (
  `id` int NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `direction` enum('vertical','horizontal','diagonale-left','diagonale-right') COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `market`
--

CREATE TABLE `market` (
  `id` int NOT NULL,
  `type_id` int NOT NULL,
  `cost` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `sprite`
--

CREATE TABLE `sprite` (
  `id` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `login` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `money` int DEFAULT NULL,
  `points` int DEFAULT NULL,
  `lemming_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `name`, `token`, `money`, `points`, `lemming_id`) VALUES
(4, 'testUser0', 'f9fa863ac643f968cafa76d3d49d6713', 'test', '17f84e7df497bd1cb96c31790abf3afa', 0, 0, NULL),
(5, 'testUser1', 'a09d5c543a0ea0450693792ef5a5ea9e', 'test1', '2f62d51e6bf21d4aa0b34c1606bb6439', 0, 0, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `user_lemming`
--

CREATE TABLE `user_lemming` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `lemming_id` int NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `direction` enum('left','right') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('move','jump','dead') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `boss_type`
--
ALTER TABLE `boss_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `global_settings`
--
ALTER TABLE `global_settings`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `hashes`
--
ALTER TABLE `hashes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `item_type`
--
ALTER TABLE `item_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `lemming_slot`
--
ALTER TABLE `lemming_slot`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `lemming_type`
--
ALTER TABLE `lemming_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `map_boss`
--
ALTER TABLE `map_boss`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `map_damage`
--
ALTER TABLE `map_damage`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `map_farm`
--
ALTER TABLE `map_farm`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `map_items`
--
ALTER TABLE `map_items`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `map_ladder`
--
ALTER TABLE `map_ladder`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `map_lopata`
--
ALTER TABLE `map_lopata`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `market`
--
ALTER TABLE `market`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `sprite`
--
ALTER TABLE `sprite`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `user_lemming`
--
ALTER TABLE `user_lemming`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `boss_type`
--
ALTER TABLE `boss_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `global_settings`
--
ALTER TABLE `global_settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `hashes`
--
ALTER TABLE `hashes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `item_type`
--
ALTER TABLE `item_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `lemming_slot`
--
ALTER TABLE `lemming_slot`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `lemming_type`
--
ALTER TABLE `lemming_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `map`
--
ALTER TABLE `map`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `map_boss`
--
ALTER TABLE `map_boss`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `map_damage`
--
ALTER TABLE `map_damage`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `map_farm`
--
ALTER TABLE `map_farm`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `map_items`
--
ALTER TABLE `map_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `map_ladder`
--
ALTER TABLE `map_ladder`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `map_lopata`
--
ALTER TABLE `map_lopata`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `market`
--
ALTER TABLE `market`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `sprite`
--
ALTER TABLE `sprite`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `user_lemming`
--
ALTER TABLE `user_lemming`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
