# Описание БД lemming-stone

## Сущности

* Пользователь-Игрок
* Карта
* Рынок

## Формализация сущностей

### Общеигровые таблицы

**Таблица hashes**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| chat_hash | string | |
| game_hash | string | |
| game_timestamp | integer | текущее время в игре |
| ... | string | какие-то другие хеши |


**Таблица global_settings**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| version | integer | |
| boss_timeout | integer | промежуток, через который вываливается босс |
| game_timeout | integer | время шага, через который обновляется игровая сцена. 150mc |


### Пользователь-Игрок


**Таблица users**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string | |
| login | string | unique |
| password | string | |
| token | string | |
| money | integer | |
| points | integer | |
| lemming_id | integer | can be NULL |


**Таблица lemming_type**

типы леммингов. Таблица-словарь
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string | |
| speed | float | |
| slots_count | integer | 1 by default |
| image | string | |


**Таблица user_lemming**

все лемминги в игре. На одного игрока один лемминг
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| user_id | integer | |
| lemming_id | integer | |
| x | float | |
| y | float | |
| direction | string | 'left', 'right' |
| status | string | 'move', 'jump', 'dead' |


**Таблица lemming_slot**

предметы в карманах лемминга
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| lemming_id | integer | |
| slot | integer | id предмета can be NULL |


**Таблица item_type**

типы предметов. Таблица-словарь
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| type | string | 'ladder', 'farm', 'lopata', 'dynamite', 'immortal' |
| name | string | |
| image | string | |
| value | integer | характеристика предмета |


**Таблица items**

все предметы в карманах игроков и в слотах леммингов
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| type_id | integer | |


**Таблица inventory**

предметы в карманах игроков
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| user_id | integer | |
| type_id | integer | |


### Карта

**Таблица map**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| background | string | |
| sprite_id | integer | |
| start_time | integer | |
| points | string | массив точек, состоящий из объектов { x: number, y: number } |


**Таблица sprite**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| image | string | |


**Таблица map_damage**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| x | float | |
| y | float | |
| timestamp | integer | |


**Таблица map_ladder**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| x | float | |
| y | float | |
| direction | string | 'vertical', 'horizontal', 'diagonale-left', 'diagonale-right' |
| timestamp | integer | |


**Таблица map_lopata**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| x | float | |
| y | float | |
| direction | string | 'vertical', 'horizontal', 'diagonale-left', 'diagonale-right' |
| timestamp | integer | |


**Таблица map_farm**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| x | float | |
| y | float | |
| timestamp | integer | |


**Таблица map_items**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| type | string | 'key', 'market', 'grave', 'coin' |
| x | float | |
| y | float | |


**Таблица boss_type**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| name | string | |
| image | string | |
| width | integer | |
| height | integer | |
| speed | integer | |


**Таблица map_boss**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| boss_id | integer | |
| x | float | |
| y | float | |
| direction | string | 'left', 'right' |
| status | string | 'move', 'jump', 'stunned' |
| stunned_timestamp | integer | can be NULL |


### Рынок

**Таблица market**
| Название | Тип | Комментарий |
| - | - | - |
| id | integer | PK |
| type_id | integer | |
| cost | integer | |
