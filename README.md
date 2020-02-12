# README
#chat-space2 DB設計
## usersテーブル
| Column | Type | Option |
| ------ | ---- | ------ |
| name | string | null: false |
| email | string | null: false |
| password | string | null: false |
### Association
- has_many : chats
- has_many : users_groups
- has_many : groups,  through:  :users_groups

## groupsテーブル
| Column | Type | Option |
| ------ | ---- | ------ |
| name | string | null: false |
### Association
- has_many : chats
- has_many : users_groups
- has_many : users,  through:  :users_groups

## chatsテーブル
| Column | Type | Option |
| ------ | ---- | ------ |
| text | text | null: true |
| image | string | null: true |
| users_id | integer | null: false, foreign_key: ture |
| groups_id | integer | null: false, foreign_key: ture |
### Association
- belong_to : user
- belong_to : group

## users_groupsテーブル
| Column | Type | Option |
| ------ | ---- | ------ |
| users_id | integer | null: false, foreign_key: ture |
| groups_id | integer | null: false, foreign_key: ture |
### Association
- belong_to : user
- belong_to : group
