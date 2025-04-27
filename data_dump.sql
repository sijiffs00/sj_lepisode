SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'e85a83b0-de3a-445a-aa74-778a3b94ece2', '{"action":"user_confirmation_requested","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-04-15 05:16:26.973413+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f29e56c2-6ebd-484e-bff3-df5891a361ca', '{"action":"user_signedup","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"team"}', '2025-04-15 05:18:02.661408+00', ''),
	('00000000-0000-0000-0000-000000000000', '574bcac0-cea8-4ba3-b4b1-23974dbdaeb3', '{"action":"login","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-15 05:18:13.337864+00', ''),
	('00000000-0000-0000-0000-000000000000', '86b058b1-1146-4e1f-acbf-d7766ecf598e', '{"action":"login","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-15 05:19:39.365519+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe58868f-b697-44eb-a13e-bb1c46deb710', '{"action":"login","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-15 05:19:39.717334+00', ''),
	('00000000-0000-0000-0000-000000000000', '54c22e65-7df1-4465-95ba-dea6b7082725', '{"action":"login","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-04-15 05:27:02.017201+00', ''),
	('00000000-0000-0000-0000-000000000000', '02cdc4a0-9117-4c9c-8a52-7a94fad3521b', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 06:25:36.245148+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b7ab6c0c-6def-44d3-800b-2a375b3a7882', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 06:25:36.253652+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ad23086-c3d4-4eb6-8c3f-b0138051fae4', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 07:24:24.603861+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3974869-ba1f-4d53-b321-102ab9823d0a', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 07:24:24.608421+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f4defc1c-47c0-4ddf-8f6c-396cca89f5de', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 08:27:04.172809+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bdfda03a-8786-4ddc-b008-9b0e430cf409', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-15 08:27:04.173616+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3ec1745-144a-487f-898f-ea8741fb1015', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 00:35:56.671398+00', ''),
	('00000000-0000-0000-0000-000000000000', '01d62ed7-38e0-435e-8855-478b4a8398f7', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 00:35:56.677216+00', ''),
	('00000000-0000-0000-0000-000000000000', 'da0c91fd-8b98-416e-af25-43fa25f87ddb', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 04:49:05.540428+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a4f8393-df22-46ec-9f39-08b736ee26fe', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 04:49:05.54182+00', ''),
	('00000000-0000-0000-0000-000000000000', '0ede8b73-ff65-4ff0-9416-a98d8a7e5d47', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 06:32:18.199402+00', ''),
	('00000000-0000-0000-0000-000000000000', '5fd3305b-38e5-46c1-b946-fbc2fb16c0e4', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 06:32:18.206972+00', ''),
	('00000000-0000-0000-0000-000000000000', '806b9b74-b352-4517-b5aa-250a2e510ce9', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 07:30:55.854846+00', ''),
	('00000000-0000-0000-0000-000000000000', '72f13221-1779-4bd0-b8a0-372348729c20', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-16 07:30:55.857148+00', ''),
	('00000000-0000-0000-0000-000000000000', '18264169-d66b-4120-9cc2-b80a38729b60', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 04:43:27.565875+00', ''),
	('00000000-0000-0000-0000-000000000000', '79a72a4b-6ec6-4070-94ab-9506080e3106', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 04:43:27.573538+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f6adf74a-a4f7-48c7-b3bd-908a1cb80664', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 05:41:48.233172+00', ''),
	('00000000-0000-0000-0000-000000000000', '233e4cd9-d663-4334-8c1f-cb439d259871', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 05:41:48.237516+00', ''),
	('00000000-0000-0000-0000-000000000000', '34ee61ad-0e27-498d-815d-8f63efab8fe2', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 07:07:20.856309+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c7ca0d90-46c6-4a92-acb1-0659a66b792c', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 07:07:20.867021+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a843e3a4-f499-411c-a6c1-86dccbb6bdc1', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 08:09:44.530552+00', ''),
	('00000000-0000-0000-0000-000000000000', '16ed6160-7c1c-4cc8-a274-c4e517980e2c', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-17 08:09:44.533905+00', ''),
	('00000000-0000-0000-0000-000000000000', '62802e65-787d-4b41-922b-90e33a8c4d4f', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 00:39:00.051763+00', ''),
	('00000000-0000-0000-0000-000000000000', '5aa0b7f7-33fe-4fe3-9c6b-cf43cf1d34d3', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 00:39:00.067247+00', ''),
	('00000000-0000-0000-0000-000000000000', '61a2a16c-ba5c-44a2-b212-fe5367ac73a2', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 01:37:21.275527+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d1cbb18-666f-47c3-8581-ccf90f35041c', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 01:37:21.280782+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c7348e3-2113-41e4-9e90-dc2cbeb30da3', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 02:37:26.156441+00', ''),
	('00000000-0000-0000-0000-000000000000', '21b18b80-72ad-4c5f-9fa1-2fddec63647a', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 02:37:26.157936+00', ''),
	('00000000-0000-0000-0000-000000000000', '2a67dabe-cb3d-43f8-b136-79fbfd732823', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 03:54:11.74511+00', ''),
	('00000000-0000-0000-0000-000000000000', '43a01573-e7f1-4f01-a65a-ebb3fc47023f', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 03:54:11.746561+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee7f5260-8b08-4f53-a655-986937416f71', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 04:52:13.087541+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aea1e379-55de-4509-9084-cada7058cf64', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 04:52:13.089127+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cc4984b8-480d-453b-88e5-b14f13ddd7a8', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 05:50:46.524959+00', ''),
	('00000000-0000-0000-0000-000000000000', '392c4166-23fb-4ea1-b4b5-bfc4c09992e8', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 05:50:46.52664+00', ''),
	('00000000-0000-0000-0000-000000000000', '2198e1e9-0a70-43f2-ba84-3fffd5e80f7a', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 06:48:57.590499+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dfac8968-37d9-4fd2-839f-9d5e9dd333fd', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 06:48:57.604237+00', ''),
	('00000000-0000-0000-0000-000000000000', '478c8479-12ad-4970-9ad4-c0205ad6ae26', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 12:31:43.300647+00', ''),
	('00000000-0000-0000-0000-000000000000', '96d6b4d5-30ae-4bc1-bcea-bdfc07344eba', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-18 12:31:43.308332+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bf65f1e9-2521-41d4-8eba-226aa2537282', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-19 05:14:35.389821+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f59f1e89-29d9-4dc8-b742-bdb9aa28ed04', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-19 05:14:35.399133+00', ''),
	('00000000-0000-0000-0000-000000000000', '992efb44-d1fb-4445-8a38-c1a0ec64f60d', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 03:35:27.164108+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd5533d21-4dd2-491f-a88c-812cf4f0da10', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 03:35:27.183914+00', ''),
	('00000000-0000-0000-0000-000000000000', '25d43b69-722b-4802-9de0-15a5f3e2a619', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 04:33:44.902356+00', ''),
	('00000000-0000-0000-0000-000000000000', '03582707-6229-4286-b5c1-92b852cb9eed', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-20 04:33:44.903889+00', ''),
	('00000000-0000-0000-0000-000000000000', '504af916-d14c-4c05-a465-a94d8caecb07', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 02:28:49.897356+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b95b8720-d7f3-4e7c-bcf8-b876dcce44da', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 02:28:49.906729+00', ''),
	('00000000-0000-0000-0000-000000000000', '50fdc248-9772-41e5-a161-42cd03686aaa', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 03:28:12.851943+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a05f4d02-6c6f-45fd-92ba-61bb371f6614', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 03:28:12.854737+00', ''),
	('00000000-0000-0000-0000-000000000000', '0aba0eb7-0f4f-4a68-8169-e3f5e8cf11df', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 04:26:26.214893+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a42c84f-a020-45fa-993b-47f3e3f877d8', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 04:26:26.2165+00', ''),
	('00000000-0000-0000-0000-000000000000', '7211357a-2459-4e19-8d88-ee62de313068', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 08:25:24.540842+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c7ac867c-2f88-45f6-83c4-f56b97a7b22a', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-21 08:25:24.55335+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8b48994-e65d-49c8-89de-6ebde3d9f0e5', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-22 04:11:13.059782+00', ''),
	('00000000-0000-0000-0000-000000000000', '8564bed6-869f-4273-ab71-8ec3c91ea65b', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-22 04:11:13.070771+00', ''),
	('00000000-0000-0000-0000-000000000000', '6959afcc-0d48-4fc2-8924-d196018c9f9a', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-22 05:09:19.479692+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b5dfd03-5404-476e-adf7-0674ca1205b2', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-22 05:09:19.482678+00', ''),
	('00000000-0000-0000-0000-000000000000', '4deafcc5-56b5-4a74-b056-4c46e53259a7', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-22 06:08:09.257376+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e349eb44-3def-42b7-806b-8b7a98f871cd', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-22 06:08:09.260676+00', ''),
	('00000000-0000-0000-0000-000000000000', '3bbdfba5-bdf1-46a7-9c9d-bf8cc74b45fa', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 03:34:53.611003+00', ''),
	('00000000-0000-0000-0000-000000000000', 'abdace37-be5c-4ccc-8ff3-a2d390261f3f', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 03:34:53.623352+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f1e7cb4-f44e-4f3a-8c9e-eaa2faf907bb', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 04:33:41.402185+00', ''),
	('00000000-0000-0000-0000-000000000000', '79eeddfd-4415-406b-85a0-757c6ec92534', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 04:33:41.403172+00', ''),
	('00000000-0000-0000-0000-000000000000', '5154f260-0bb6-466c-a12e-a794c4a629d6', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 06:22:33.444925+00', ''),
	('00000000-0000-0000-0000-000000000000', '1968198a-484a-42a6-a59f-6f3f412664f5', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 06:22:33.46081+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bfdadaf0-58ed-400d-adfa-6bdebd643b0e', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 07:23:42.047493+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dd46b7f6-a350-44d4-9866-b413e9fbc83e', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 07:23:42.049328+00', ''),
	('00000000-0000-0000-0000-000000000000', 'efd46d07-295a-4e67-bc87-9c70ffe53b9a', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 08:33:35.549723+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f9d4a00a-5ed7-4413-b117-7ca0a55fa777', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-23 08:33:35.551296+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bde106dd-e143-4d04-95bb-d941fb0f1640', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-24 00:39:19.013531+00', ''),
	('00000000-0000-0000-0000-000000000000', '7699af8f-e544-4079-9053-677c8513b5c2', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-24 00:39:19.034481+00', ''),
	('00000000-0000-0000-0000-000000000000', 'daf97743-db0d-4f6e-93c1-9f535e73b878', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-24 02:11:48.040504+00', ''),
	('00000000-0000-0000-0000-000000000000', '24b102fa-b4b7-4635-967c-bb9df2366d97', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-24 02:11:48.042657+00', ''),
	('00000000-0000-0000-0000-000000000000', '3514463c-53d7-41b2-90ad-37519951760d', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-24 03:09:57.104754+00', ''),
	('00000000-0000-0000-0000-000000000000', '5aebf50b-7d9f-4121-bf95-9d3007c30d61', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-24 03:09:57.107317+00', ''),
	('00000000-0000-0000-0000-000000000000', '97682bd3-2be5-44fa-9f8a-9c7cf7bfeda8', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-24 04:09:03.842964+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a02dbafc-17cd-4656-93eb-980ee6492f6a', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-24 04:09:03.845063+00', ''),
	('00000000-0000-0000-0000-000000000000', '34cf3ea3-65f4-418b-8e94-d635eace0a70', '{"action":"token_refreshed","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-24 05:07:19.972958+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd9325814-47e9-4c7a-85c4-c52ddc2dd603', '{"action":"token_revoked","actor_id":"92aa8789-784b-47f7-83a0-aa039638734b","actor_username":"sijiffs00@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-04-24 05:07:19.979127+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '92aa8789-784b-47f7-83a0-aa039638734b', 'authenticated', 'authenticated', 'sijiffs00@gmail.com', '$2a$10$ynWomyjyQo1z0JMHG4nMguYnJDuJl2VTCGtHyM.eOPJUOxcm2BJQ6', '2025-04-15 05:18:02.662787+00', NULL, '', '2025-04-15 05:16:26.977492+00', '', NULL, '', '', NULL, '2025-04-15 05:27:02.018139+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "92aa8789-784b-47f7-83a0-aa039638734b", "email": "sijiffs00@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-04-15 05:16:26.93747+00', '2025-04-24 05:07:19.998706+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('92aa8789-784b-47f7-83a0-aa039638734b', '92aa8789-784b-47f7-83a0-aa039638734b', '{"sub": "92aa8789-784b-47f7-83a0-aa039638734b", "email": "sijiffs00@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-04-15 05:16:26.965342+00', '2025-04-15 05:16:26.965392+00', '2025-04-15 05:16:26.965392+00', '1511e8bd-9142-4e86-bb0a-aea6ec3e34e1');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('1a63dddd-39a0-4e70-bdf2-d92483b48b12', '92aa8789-784b-47f7-83a0-aa039638734b', '2025-04-15 05:18:02.668738+00', '2025-04-15 05:18:02.668738+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '14.48.189.159', NULL),
	('011667d8-c8e4-45e0-959d-1e63bad1aef9', '92aa8789-784b-47f7-83a0-aa039638734b', '2025-04-15 05:18:13.338595+00', '2025-04-15 05:18:13.338595+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '14.48.189.159', NULL),
	('c389b359-4264-4c3b-9bdd-518a0f187d93', '92aa8789-784b-47f7-83a0-aa039638734b', '2025-04-15 05:19:39.366478+00', '2025-04-15 05:19:39.366478+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '14.48.189.159', NULL),
	('94dddd87-ba14-40ee-917e-fc6ae8de9051', '92aa8789-784b-47f7-83a0-aa039638734b', '2025-04-15 05:19:39.718003+00', '2025-04-15 05:19:39.718003+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '14.48.189.159', NULL),
	('90452d27-b0d6-433c-a305-3c0da3d44e60', '92aa8789-784b-47f7-83a0-aa039638734b', '2025-04-15 05:27:02.01821+00', '2025-04-24 05:07:20.001638+00', NULL, 'aal1', NULL, '2025-04-24 05:07:20.001558', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36', '121.179.17.188', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('1a63dddd-39a0-4e70-bdf2-d92483b48b12', '2025-04-15 05:18:02.678466+00', '2025-04-15 05:18:02.678466+00', 'otp', '3364d666-c9e4-468c-9ab5-b24e96641ef1'),
	('011667d8-c8e4-45e0-959d-1e63bad1aef9', '2025-04-15 05:18:13.344786+00', '2025-04-15 05:18:13.344786+00', 'password', 'fc0e1ef9-e41c-412a-9b2c-902e1488e459'),
	('c389b359-4264-4c3b-9bdd-518a0f187d93', '2025-04-15 05:19:39.370077+00', '2025-04-15 05:19:39.370077+00', 'password', '7200829b-bfd8-4497-bc5e-3f7ede5d81c5'),
	('94dddd87-ba14-40ee-917e-fc6ae8de9051', '2025-04-15 05:19:39.719864+00', '2025-04-15 05:19:39.719864+00', 'password', '1d7cfd21-d927-489a-8f7e-8bf5b448945e'),
	('90452d27-b0d6-433c-a305-3c0da3d44e60', '2025-04-15 05:27:02.02268+00', '2025-04-15 05:27:02.02268+00', 'password', '742a0b73-023e-467c-b329-294ad420877a');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1, 'IZtI1cqOZEthclAee_VFoQ', '92aa8789-784b-47f7-83a0-aa039638734b', false, '2025-04-15 05:18:02.673178+00', '2025-04-15 05:18:02.673178+00', NULL, '1a63dddd-39a0-4e70-bdf2-d92483b48b12'),
	('00000000-0000-0000-0000-000000000000', 2, '3rVGGLR3rbVBKZ_TIj7WfQ', '92aa8789-784b-47f7-83a0-aa039638734b', false, '2025-04-15 05:18:13.339278+00', '2025-04-15 05:18:13.339278+00', NULL, '011667d8-c8e4-45e0-959d-1e63bad1aef9'),
	('00000000-0000-0000-0000-000000000000', 3, 'WMBZ829GMvRGxDP87HDKLw', '92aa8789-784b-47f7-83a0-aa039638734b', false, '2025-04-15 05:19:39.368239+00', '2025-04-15 05:19:39.368239+00', NULL, 'c389b359-4264-4c3b-9bdd-518a0f187d93'),
	('00000000-0000-0000-0000-000000000000', 4, 'liDL7-tX5hRSzTbQt6egzA', '92aa8789-784b-47f7-83a0-aa039638734b', false, '2025-04-15 05:19:39.718664+00', '2025-04-15 05:19:39.718664+00', NULL, '94dddd87-ba14-40ee-917e-fc6ae8de9051'),
	('00000000-0000-0000-0000-000000000000', 5, '_xQvaxbp7YvF2jUc7tRZ0g', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-15 05:27:02.020385+00', '2025-04-15 06:25:36.255243+00', NULL, '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 6, '0zSofqaaKz9DdLTJP90sbQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-15 06:25:36.261125+00', '2025-04-15 07:24:24.608905+00', '_xQvaxbp7YvF2jUc7tRZ0g', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 7, 'jrGcI6B2Btq6PZljtTqmqg', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-15 07:24:24.611074+00', '2025-04-15 08:27:04.174097+00', '0zSofqaaKz9DdLTJP90sbQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 8, 'HmeBL_-R3l2llWHBfM45GQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-15 08:27:04.175371+00', '2025-04-16 00:35:56.677697+00', 'jrGcI6B2Btq6PZljtTqmqg', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 9, 'rQRkj-OD9Kt43fosZU-6Rg', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-16 00:35:56.681259+00', '2025-04-16 04:49:05.542269+00', 'HmeBL_-R3l2llWHBfM45GQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 10, 'aJwv9UDvx6ZLFxkTAmYixg', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-16 04:49:05.544533+00', '2025-04-16 06:32:18.208835+00', 'rQRkj-OD9Kt43fosZU-6Rg', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 11, 'dIfLe0Sypzt-EUDBoHRZ2g', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-16 06:32:18.212873+00', '2025-04-16 07:30:55.857671+00', 'aJwv9UDvx6ZLFxkTAmYixg', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 12, 'BuPJM92--cqBqtQVj7HPog', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-16 07:30:55.859887+00', '2025-04-17 04:43:27.574036+00', 'dIfLe0Sypzt-EUDBoHRZ2g', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 13, 'kYSyvMXePxOBm-41sHb0ag', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-17 04:43:27.5778+00', '2025-04-17 05:41:48.237973+00', 'BuPJM92--cqBqtQVj7HPog', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 14, 'rfhKXn5PeGuVG2sfwu7IuQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-17 05:41:48.239774+00', '2025-04-17 07:07:20.867572+00', 'kYSyvMXePxOBm-41sHb0ag', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 15, 'pbaB3Jgfbxl9sZYUQWHZ8A', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-17 07:07:20.872484+00', '2025-04-17 08:09:44.534421+00', 'rfhKXn5PeGuVG2sfwu7IuQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 16, 'EA8ovYVhMYjXS3ZJVCUMdA', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-17 08:09:44.539521+00', '2025-04-18 00:39:00.06836+00', 'pbaB3Jgfbxl9sZYUQWHZ8A', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 17, 'Kjey7wWoedvbI3ogWa7waQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-18 00:39:00.08088+00', '2025-04-18 01:37:21.281453+00', 'EA8ovYVhMYjXS3ZJVCUMdA', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 18, 'crpn_LqR9-1I5_uM8LsI2A', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-18 01:37:21.283998+00', '2025-04-18 02:37:26.162685+00', 'Kjey7wWoedvbI3ogWa7waQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 19, 'GZNszcamemX-tZV2NIjRiQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-18 02:37:26.164568+00', '2025-04-18 03:54:11.747141+00', 'crpn_LqR9-1I5_uM8LsI2A', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 20, 'buR6Zh9yNmpi16ns4KPXSg', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-18 03:54:11.748804+00', '2025-04-18 04:52:13.089666+00', 'GZNszcamemX-tZV2NIjRiQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 21, '33jaxkTIhSxZMjvvxz7C-g', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-18 04:52:13.092082+00', '2025-04-18 05:50:46.527188+00', 'buR6Zh9yNmpi16ns4KPXSg', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 22, 'lga3JCEvgZZZ1gpms4KR5Q', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-18 05:50:46.529496+00', '2025-04-18 06:48:57.604881+00', '33jaxkTIhSxZMjvvxz7C-g', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 23, 'FbWAGGTdUQWhV780072iQg', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-18 06:48:57.613301+00', '2025-04-18 12:31:43.308946+00', 'lga3JCEvgZZZ1gpms4KR5Q', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 24, 'cfQB7U5XGdmecCnUQ6rqTw', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-18 12:31:43.314045+00', '2025-04-19 05:14:35.399744+00', 'FbWAGGTdUQWhV780072iQg', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 25, 'YmrR6r8SDf75BOfUH0DxAw', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-19 05:14:35.409087+00', '2025-04-20 03:35:27.185325+00', 'cfQB7U5XGdmecCnUQ6rqTw', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 26, 'Thm_LYO86-P908GdJ_VWEQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-20 03:35:27.200951+00', '2025-04-20 04:33:44.904402+00', 'YmrR6r8SDf75BOfUH0DxAw', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 27, 'c9pCIJM0yTGN6ZpeRdnQEA', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-20 04:33:44.905035+00', '2025-04-21 02:28:49.908672+00', 'Thm_LYO86-P908GdJ_VWEQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 28, 'svgWQiGJ2J0ekyWED1wUKA', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-21 02:28:49.918221+00', '2025-04-21 03:28:12.855342+00', 'c9pCIJM0yTGN6ZpeRdnQEA', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 29, 'UOPeXtm0vdLgMxq8Ok8VNg', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-21 03:28:12.857709+00', '2025-04-21 04:26:26.217027+00', 'svgWQiGJ2J0ekyWED1wUKA', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 30, 'oC7htV9YTedm_s75GoyKhA', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-21 04:26:26.218298+00', '2025-04-21 08:25:24.554473+00', 'UOPeXtm0vdLgMxq8Ok8VNg', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 31, 'e7sa3VziEh58mVTCAK-dyQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-21 08:25:24.565428+00', '2025-04-22 04:11:13.071407+00', 'oC7htV9YTedm_s75GoyKhA', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 32, '0yRHtCZHxpxUsENl5LV9Mw', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-22 04:11:13.081779+00', '2025-04-22 05:09:19.483228+00', 'e7sa3VziEh58mVTCAK-dyQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 33, 'huNpQj-udVpRlom-x_aiqQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-22 05:09:19.487894+00', '2025-04-22 06:08:09.261315+00', '0yRHtCZHxpxUsENl5LV9Mw', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 34, '7ViIruyVsLWeU8yIBUphJw', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-22 06:08:09.265618+00', '2025-04-23 03:34:53.624557+00', 'huNpQj-udVpRlom-x_aiqQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 35, 'TeUOz28vWDNqG-y4wvovtg', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-23 03:34:53.638093+00', '2025-04-23 04:33:41.405284+00', '7ViIruyVsLWeU8yIBUphJw', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 36, 'gTWoVqUpbQWWsSK1ZhyJCg', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-23 04:33:41.408198+00', '2025-04-23 06:22:33.462457+00', 'TeUOz28vWDNqG-y4wvovtg', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 37, 'p5Ilb52fza_9CDQ6Iwuwkw', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-23 06:22:33.472589+00', '2025-04-23 07:23:42.050901+00', 'gTWoVqUpbQWWsSK1ZhyJCg', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 38, '3wz4g9m7zu3Ki9Yj23KxiQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-23 07:23:42.054323+00', '2025-04-23 08:33:35.551816+00', 'p5Ilb52fza_9CDQ6Iwuwkw', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 39, 'szaUnm2xACjJ9go0_UjHBQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-23 08:33:35.554873+00', '2025-04-24 00:39:19.037107+00', '3wz4g9m7zu3Ki9Yj23KxiQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 40, 'tOnKw3JZZZ1roi5yLt4xyg', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-24 00:39:19.05557+00', '2025-04-24 02:11:48.043414+00', 'szaUnm2xACjJ9go0_UjHBQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 41, 'f90MkbsZsjsscKdC6UC19w', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-24 02:11:48.048127+00', '2025-04-24 03:09:57.107869+00', 'tOnKw3JZZZ1roi5yLt4xyg', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 42, 'M3-QmfawYHmLTW7pwuKxOQ', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-24 03:09:57.110651+00', '2025-04-24 04:09:03.845659+00', 'f90MkbsZsjsscKdC6UC19w', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 43, '3jX11tMmpVxSNWr1KhC4eA', '92aa8789-784b-47f7-83a0-aa039638734b', true, '2025-04-24 04:09:03.848553+00', '2025-04-24 05:07:19.979756+00', 'M3-QmfawYHmLTW7pwuKxOQ', '90452d27-b0d6-433c-a305-3c0da3d44e60'),
	('00000000-0000-0000-0000-000000000000', 44, 'xuI9plochrTP3xzo1dHuTg', '92aa8789-784b-47f7-83a0-aa039638734b', false, '2025-04-24 05:07:19.995075+00', '2025-04-24 05:07:19.995075+00', '3jX11tMmpVxSNWr1KhC4eA', '90452d27-b0d6-433c-a305-3c0da3d44e60');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."companies" ("id", "ceo_name", "logo_url", "name", "industry", "address", "homepage_url", "approval_status", "created_at", "members") VALUES
	('e4018ae3-bad4-49ae-928e-ac2ed1378fea', 'Laxman Narasimhan', 'https://upload.wikimedia.org/wikipedia/ko/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/800px-Starbucks_Corporation_Logo_2011.svg.png', 'Starbucks', '식품/음료', '서울특별시 중구 소공로 112', 'https://www.starbucks.co.kr', 'approved', '2025-04-17 06:34:36.394751', '[{"member_info": {"id": 9, "name": "김카페", "type": "user", "status": {"auth": "verified", "approval": "approved", "joined_at": "2025-04-17T06:45:19.382709"}, "contact": {"email": "cafe@starbucks.com", "phone": "010-0009-1009"}, "profile": {"role": "store_manager", "position": "점장", "department": "매장운영팀"}, "org_info": {"org_chart_id": "ORG_9"}}}, {"member_info": {"id": 19, "name": "스타벅스직원2", "type": "user", "status": {"auth": "verified", "approval": "pending", "joined_at": "2025-04-17T06:50:45.660315"}, "contact": {"email": "cafe2@starbucks.com", "phone": "010-0029-2009"}, "profile": {"role": "barista", "position": "바리스타", "department": "바리스타팀"}, "org_info": {"org_chart_id": "ORG_19"}}}, {"member_info": {"id": "5f53efc3-0a30-4851-ac6c-6a8c22172abf", "name": "김스벅", "type": "admin", "status": {"created_at": "2025-04-17T06:39:21.190395", "updated_at": "2025-04-17T06:39:21.190395"}, "profile": {"role": "super_admin", "admin_id": "admin_1"}, "admin_logs": [{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]}}]'),
	('a6b9794d-f098-422b-a1f4-e718354e7639', '김대표', 'https://example.com/lepisode.png', '(주)레피소드', '소프트웨어/IT', '서울특별시 강남구 테헤란로 123', 'https://lepisode.kr', 'approved', '2025-04-17 06:34:36.394751', '[{"member_info": {"id": 5, "name": "박개발", "type": "user", "status": {"auth": "verified", "approval": "approved", "joined_at": "2025-04-17T06:45:19.382709"}, "contact": {"email": "dev@lepisode.kr", "phone": "010-0005-1005"}, "profile": {"role": "senior_developer", "position": "선임개발자", "department": "개발팀"}, "org_info": {"org_chart_id": "ORG_5"}}}, {"member_info": {"id": 15, "name": "레피소드직원2", "type": "user", "status": {"auth": "verified", "approval": "pending", "joined_at": "2025-04-17T06:50:45.660315"}, "contact": {"email": "dev2@lepisode.kr", "phone": "010-0025-2005"}, "profile": {"role": "designer", "position": "UI디자이너", "department": "디자인팀"}, "org_info": {"org_chart_id": "ORG_15"}}}, {"member_info": {"id": "71b65ada-8b56-4285-956b-3e7cc252254c", "name": "이레피", "type": "admin", "status": {"created_at": "2025-04-17T06:39:21.190395", "updated_at": "2025-04-17T06:39:21.190395"}, "profile": {"role": "company_admin", "admin_id": "admin_0"}, "admin_logs": [{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]}}]'),
	('37b5649f-2ba7-498a-8bb0-22f2eb7c8d65', 'James Quincey', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/800px-Coca-Cola_logo.svg.png', 'The Coca-Cola Company', '식품/음료', '서울특별시 종로구 새문안로 68', 'https://www.coca-cola.co.kr', 'approved', '2025-04-17 06:34:36.394751', '[{"member_info": {"id": 10, "name": "이음료", "type": "user", "status": {"auth": "verified", "approval": "approved", "joined_at": "2025-04-17T06:45:19.382709"}, "contact": {"email": "drink@cocacola.com", "phone": "010-0010-1010"}, "profile": {"role": "team_leader", "position": "팀장", "department": "마케팅팀"}, "org_info": {"org_chart_id": "ORG_10"}}}, {"member_info": {"id": 20, "name": "코카콜라직원2", "type": "user", "status": {"auth": "verified", "approval": "pending", "joined_at": "2025-04-17T06:50:45.660315"}, "contact": {"email": "drink2@cocacola.com", "phone": "010-0030-2010"}, "profile": {"role": "sales", "position": "영업사원", "department": "영업팀"}, "org_info": {"org_chart_id": "ORG_20"}}}, {"member_info": {"id": "19d1be05-b464-4b87-9f96-0b8aa702860c", "name": "박콜라", "type": "admin", "status": {"created_at": "2025-04-17T06:39:21.190395", "updated_at": "2025-04-17T06:39:21.190395"}, "profile": {"role": "super_admin", "admin_id": "admin_cocacola"}, "admin_logs": [{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]}}]'),
	('abdb3e9e-c410-466d-97e3-51d41aafab55', 'Chris Kempczinski', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/800px-McDonald%27s_Golden_Arches.svg.png', 'McDonalds', '외식/프랜차이즈', '서울특별시 종로구 공평동 1', 'https://www.mcdonalds.co.kr', 'approved', '2025-04-17 06:34:36.394751', '[{"member_info": {"id": 6, "name": "최버거", "type": "user", "status": {"auth": "verified", "approval": "approved", "joined_at": "2025-04-17T06:45:19.382709"}, "contact": {"email": "burger@mcdonalds.com", "phone": "010-0006-1006"}, "profile": {"role": "store_manager", "position": "매니저", "department": "매장관리팀"}, "org_info": {"org_chart_id": "ORG_6"}}}, {"member_info": {"id": 16, "name": "맥도날드직원2", "type": "user", "status": {"auth": "verified", "approval": "pending", "joined_at": "2025-04-17T06:50:45.660315"}, "contact": {"email": "burger2@mcdonalds.com", "phone": "010-0026-2006"}, "profile": {"role": "kitchen_manager", "position": "주방장", "department": "주방팀"}, "org_info": {"org_chart_id": "ORG_16"}}}, {"member_info": {"id": "e3882965-048a-4017-b6fc-87660d5cd70a", "name": "정맥도", "type": "admin", "status": {"created_at": "2025-04-17T06:39:21.190395", "updated_at": "2025-04-17T06:39:21.190395"}, "profile": {"role": "company_admin", "admin_id": "admin_mcdonalds"}, "admin_logs": [{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]}}]'),
	('346721d8-4e6e-45aa-97f1-1166e49603a8', '황성수', 'https://www.lotteeatz.com/resources/assets/img/brand/logo-lotteria.png', '롯데리아', '외식/프랜차이즈', '서울특별시 송파구 올림픽로 300', 'https://www.lotteria.com', 'approved', '2025-04-17 06:34:36.394751', '[{"member_info": {"id": 1, "name": "정치킨", "type": "user", "status": {"auth": "verified", "approval": "approved", "joined_at": "2025-04-17T06:45:19.382709"}, "contact": {"email": "chicken@lotteria.com", "phone": "010-0001-1001"}, "profile": {"role": "store_manager", "position": "점장", "department": "운영팀"}, "org_info": {"org_chart_id": "ORG_1"}}}, {"member_info": {"id": 11, "name": "롯데리아직원2", "type": "user", "status": {"auth": "verified", "approval": "pending", "joined_at": "2025-04-17T06:50:45.660315"}, "contact": {"email": "chicken2@lotteria.com", "phone": "010-0021-2001"}, "profile": {"role": "marketer", "position": "마케터", "department": "마케팅팀"}, "org_info": {"org_chart_id": "ORG_11"}}}, {"member_info": {"id": "a67573ff-37b4-4ecc-a920-3bd157032031", "name": "김롯데", "type": "admin", "status": {"created_at": "2025-04-17T06:39:21.190395", "updated_at": "2025-04-17T06:39:21.190395"}, "profile": {"role": "company_admin", "admin_id": "admin_lotteria"}, "admin_logs": [{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]}}]'),
	('01c6abd4-076a-4527-b7c1-db7ee26ee11e', '김프랭크', 'https://example.com/frankburger.png', '프랭크버거', '외식/프랜차이즈', '서울특별시 마포구 와우산로 48', 'https://frankburger.co.kr', 'approved', '2025-04-17 06:34:36.394751', '[{"member_info": {"id": 4, "name": "강셰프", "type": "user", "status": {"auth": "verified", "approval": "approved", "joined_at": "2025-04-17T06:45:19.382709"}, "contact": {"email": "chef@frankburger.kr", "phone": "010-0004-1004"}, "profile": {"role": "chef", "position": "주방장", "department": "주방팀"}, "org_info": {"org_chart_id": "ORG_4"}}}, {"member_info": {"id": 14, "name": "프랭크버거직원2", "type": "user", "status": {"auth": "verified", "approval": "pending", "joined_at": "2025-04-17T06:50:45.660315"}, "contact": {"email": "chef2@frankburger.kr", "phone": "010-0024-2004"}, "profile": {"role": "server", "position": "서버", "department": "홀서빙팀"}, "org_info": {"org_chart_id": "ORG_14"}}}, {"member_info": {"id": "73238e26-9823-44bd-85f0-ad5922ce0322", "name": "최프랭크", "type": "admin", "status": {"created_at": "2025-04-17T06:39:21.190395", "updated_at": "2025-04-17T06:39:21.190395"}, "profile": {"role": "company_admin", "admin_id": "admin_frankburger"}, "admin_logs": [{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]}}]'),
	('982ead4c-b80f-4872-a499-3e0380752f05', '박용현', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Nexon_Logo.svg/800px-Nexon_Logo.svg.png', 'NEXON', '게임/엔터테인먼트', '경기도 성남시 분당구 판교로 256번길 7', 'https://www.nexon.com', 'approved', '2025-04-17 06:34:36.394751', '[{"member_info": {"id": 8, "name": "김게임", "type": "user", "status": {"auth": "verified", "approval": "approved", "joined_at": "2025-04-17T06:45:19.382709"}, "contact": {"email": "game@nexon.com", "phone": "010-0008-1008"}, "profile": {"role": "lead_developer", "position": "수석개발자", "department": "게임개발팀"}, "org_info": {"org_chart_id": "ORG_8"}}}, {"member_info": {"id": 18, "name": "넥슨직원2", "type": "user", "status": {"auth": "verified", "approval": "pending", "joined_at": "2025-04-17T06:50:45.660315"}, "contact": {"email": "game2@nexon.com", "phone": "010-0028-2008"}, "profile": {"role": "game_planner", "position": "게임기획자", "department": "기획팀"}, "org_info": {"org_chart_id": "ORG_18"}}}, {"member_info": {"id": "b2ba51d5-cc88-4de4-8706-dde4f188e47e", "name": "박넥슨", "type": "admin", "status": {"created_at": "2025-04-17T06:39:21.190395", "updated_at": "2025-04-17T06:39:21.190395"}, "profile": {"role": "company_admin", "admin_id": "admin_nexon"}, "admin_logs": [{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]}}]'),
	('6ba65f0c-eac3-4652-9a42-883aec25436e', 'Satya Nadella', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/800px-Microsoft_logo_%282012%29.svg.png', 'Microsoft', '소프트웨어/IT', '서울특별시 종로구 종로1길 50', 'https://www.microsoft.com/ko-kr', 'approved', '2025-04-17 06:34:36.394751', '[{"member_info": {"id": 7, "name": "이클라우드", "type": "user", "status": {"auth": "verified", "approval": "approved", "joined_at": "2025-04-17T06:45:19.382709"}, "contact": {"email": "cloud@microsoft.com", "phone": "010-0007-1007"}, "profile": {"role": "solution_architect", "position": "아키텍트", "department": "클라우드팀"}, "org_info": {"org_chart_id": "ORG_7"}}}, {"member_info": {"id": 17, "name": "마이크로소프트직원2", "type": "user", "status": {"auth": "verified", "approval": "pending", "joined_at": "2025-04-17T06:50:45.660315"}, "contact": {"email": "cloud2@microsoft.com", "phone": "010-0027-2007"}, "profile": {"role": "ai_engineer", "position": "AI엔지니어", "department": "AI개발팀"}, "org_info": {"org_chart_id": "ORG_17"}}}, {"member_info": {"id": "b4e8b8ce-45f4-4041-8d38-0ce0c55b3e29", "name": "이마소", "type": "admin", "status": {"created_at": "2025-04-17T06:39:21.190395", "updated_at": "2025-04-17T06:39:21.190395"}, "profile": {"role": "super_admin", "admin_id": "admin_microsoft"}, "admin_logs": [{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]}}]'),
	('383089b2-a3a7-4dd1-b001-464d52b4af81', '김창섭', 'https://example.com/techstart.png', '테크스타트', '소프트웨어/IT', '서울특별시 서초구 강남대로 373', 'https://techstart.kr', 'pending', '2025-04-17 06:34:36.394751', '[{"member_info": {"id": 3, "name": "박스타트", "type": "user", "status": {"auth": "verified", "approval": "approved", "joined_at": "2025-04-17T06:45:19.382709"}, "contact": {"email": "dev@techstart.kr", "phone": "010-0003-1003"}, "profile": {"role": "developer", "position": "개발자", "department": "기술개발팀"}, "org_info": {"org_chart_id": "ORG_3"}}}, {"member_info": {"id": 13, "name": "테크스타트직원2", "type": "user", "status": {"auth": "verified", "approval": "pending", "joined_at": "2025-04-17T06:50:45.660315"}, "contact": {"email": "dev2@techstart.kr", "phone": "010-0023-2003"}, "profile": {"role": "marketing", "position": "마케팅담당", "department": "마케팅팀"}, "org_info": {"org_chart_id": "ORG_13"}}}, {"member_info": {"id": "1cee87ca-da45-4b65-9efd-1f2002b398fd", "name": "김테크", "type": "admin", "status": {"created_at": "2025-04-17T06:39:21.190395", "updated_at": "2025-04-17T06:39:21.190395"}, "profile": {"role": "company_admin", "admin_id": "admin_techstart"}, "admin_logs": [{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]}}]'),
	('f7de1a12-7d47-4022-91c6-6bd6d8ab8d7d', '이미래', 'https://example.com/futurecorp.png', '미래기업', '제조/유통', '경기도 성남시 분당구 대왕판교로 645번길 12', 'https://futurecorp.kr', 'pending', '2025-04-17 06:34:36.394751', '[{"member_info": {"id": 2, "name": "황미래", "type": "user", "status": {"auth": "verified", "approval": "approved", "joined_at": "2025-04-17T06:45:19.382709"}, "contact": {"email": "plan@future.kr", "phone": "010-0002-1002"}, "profile": {"role": "planner", "position": "기획자", "department": "기획팀"}, "org_info": {"org_chart_id": "ORG_2"}}}, {"member_info": {"id": 12, "name": "미래기업직원2", "type": "user", "status": {"auth": "verified", "approval": "pending", "joined_at": "2025-04-17T06:50:45.660315"}, "contact": {"email": "plan2@future.kr", "phone": "010-0022-2002"}, "profile": {"role": "sales", "position": "영업사원", "department": "영업팀"}, "org_info": {"org_chart_id": "ORG_12"}}}, {"member_info": {"id": "8b3ca6f2-d818-4504-be6c-be89cee209ec", "name": "정미래", "type": "admin", "status": {"created_at": "2025-04-17T06:39:21.190395", "updated_at": "2025-04-17T06:39:21.190395"}, "profile": {"role": "company_admin", "admin_id": "admin_future"}, "admin_logs": [{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]}}]');


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."admins" ("id", "admin_id", "manager_name", "secret_number", "role", "company_id", "created_at", "updated_at", "admin_logs") VALUES
	('19d1be05-b464-4b87-9f96-0b8aa702860c', 'admin_cocacola', '박콜라', '1234', 'super_admin', '37b5649f-2ba7-498a-8bb0-22f2eb7c8d65', '2025-04-17 06:39:21.190395', '2025-04-17 06:39:21.190395', '[{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]'),
	('e3882965-048a-4017-b6fc-87660d5cd70a', 'admin_mcdonalds', '정맥도', '1234', 'company_admin', 'abdb3e9e-c410-466d-97e3-51d41aafab55', '2025-04-17 06:39:21.190395', '2025-04-17 06:39:21.190395', '[{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]'),
	('a67573ff-37b4-4ecc-a920-3bd157032031', 'admin_lotteria', '김롯데', '1234', 'company_admin', '346721d8-4e6e-45aa-97f1-1166e49603a8', '2025-04-17 06:39:21.190395', '2025-04-17 06:39:21.190395', '[{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]'),
	('73238e26-9823-44bd-85f0-ad5922ce0322', 'admin_frankburger', '최프랭크', '1234', 'company_admin', '01c6abd4-076a-4527-b7c1-db7ee26ee11e', '2025-04-17 06:39:21.190395', '2025-04-17 06:39:21.190395', '[{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]'),
	('b2ba51d5-cc88-4de4-8706-dde4f188e47e', 'admin_nexon', '박넥슨', '1234', 'company_admin', '982ead4c-b80f-4872-a499-3e0380752f05', '2025-04-17 06:39:21.190395', '2025-04-17 06:39:21.190395', '[{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]'),
	('b4e8b8ce-45f4-4041-8d38-0ce0c55b3e29', 'admin_microsoft', '이마소', '1234', 'super_admin', '6ba65f0c-eac3-4652-9a42-883aec25436e', '2025-04-17 06:39:21.190395', '2025-04-17 06:39:21.190395', '[{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]'),
	('1cee87ca-da45-4b65-9efd-1f2002b398fd', 'admin_techstart', '김테크', '1234', 'company_admin', '383089b2-a3a7-4dd1-b001-464d52b4af81', '2025-04-17 06:39:21.190395', '2025-04-17 06:39:21.190395', '[{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]'),
	('8b3ca6f2-d818-4504-be6c-be89cee209ec', 'admin_future', '정미래', '1234', 'company_admin', 'f7de1a12-7d47-4022-91c6-6bd6d8ab8d7d', '2025-04-17 06:39:21.190395', '2025-04-17 06:39:21.190395', '[{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]'),
	('71b65ada-8b56-4285-956b-3e7cc252254c', 'admin_0', '이레피', '1234', 'company_admin', 'a6b9794d-f098-422b-a1f4-e718354e7639', '2025-04-17 06:39:21.190395', '2025-04-17 06:39:21.190395', '[{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]'),
	('5f53efc3-0a30-4851-ac6c-6a8c22172abf', 'admin_1', '김스벅', '1234', 'super_admin', 'e4018ae3-bad4-49ae-928e-ac2ed1378fea', '2025-04-17 06:39:21.190395', '2025-04-17 06:39:21.190395', '[{"action": "account_created", "details": "관리자 계정 생성", "timestamp": "2025-04-17T06:39:21.190395+00:00"}]');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "name", "joined_at", "registered_at", "auth_status", "company_approval", "department", "position", "contact", "email", "association_role", "org_chart_id", "company_id", "company") VALUES
	(3, '박스타트', '2025-04-17 06:45:19.382709', '2025-04-17 06:45:19.382709', 'verified', 'approved', '기술개발팀', '개발자', '010-0003-1003', 'dev@techstart.kr', 'developer', 'ORG_3', '383089b2-a3a7-4dd1-b001-464d52b4af81', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "본사", "team_size" : {"department_size" : 5, "total_employees" : 29}}'),
	(4, '강셰프', '2025-04-17 06:45:19.382709', '2025-04-17 06:45:19.382709', 'verified', 'approved', '주방팀', '주방장', '010-0004-1004', 'chef@frankburger.kr', 'chef', 'ORG_4', '01c6abd4-076a-4527-b7c1-db7ee26ee11e', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "본사", "team_size" : {"department_size" : 17, "total_employees" : 55}}'),
	(5, '박개발', '2025-04-17 06:45:19.382709', '2025-04-17 06:45:19.382709', 'verified', 'approved', '개발팀', '선임개발자', '010-0005-1005', 'dev@lepisode.kr', 'senior_developer', 'ORG_5', 'a6b9794d-f098-422b-a1f4-e718354e7639', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "본사", "team_size" : {"department_size" : 24, "total_employees" : 93}}'),
	(6, '최버거', '2025-04-17 06:45:19.382709', '2025-04-17 06:45:19.382709', 'verified', 'approved', '매장관리팀', '매니저', '010-0006-1006', 'burger@mcdonalds.com', 'store_manager', 'ORG_6', 'abdb3e9e-c410-466d-97e3-51d41aafab55', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "본사", "team_size" : {"department_size" : 19, "total_employees" : 92}}'),
	(7, '이클라우드', '2025-04-17 06:45:19.382709', '2025-04-17 06:45:19.382709', 'verified', 'approved', '클라우드팀', '아키텍트', '010-0007-1007', 'cloud@microsoft.com', 'solution_architect', 'ORG_7', '6ba65f0c-eac3-4652-9a42-883aec25436e', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "본사", "team_size" : {"department_size" : 16, "total_employees" : 78}}'),
	(8, '김게임', '2025-04-17 06:45:19.382709', '2025-04-17 06:45:19.382709', 'verified', 'approved', '게임개발팀', '수석개발자', '010-0008-1008', 'game@nexon.com', 'lead_developer', 'ORG_8', '982ead4c-b80f-4872-a499-3e0380752f05', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "본사", "team_size" : {"department_size" : 24, "total_employees" : 44}}'),
	(9, '김카페', '2025-04-17 06:45:19.382709', '2025-04-17 06:45:19.382709', 'verified', 'approved', '매장운영팀', '점장', '010-0009-1009', 'cafe@starbucks.com', 'store_manager', 'ORG_9', 'e4018ae3-bad4-49ae-928e-ac2ed1378fea', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "본사", "team_size" : {"department_size" : 7, "total_employees" : 65}}'),
	(10, '이음료', '2025-04-17 06:45:19.382709', '2025-04-17 06:45:19.382709', 'verified', 'approved', '마케팅팀', '팀장', '010-0010-1010', 'drink@cocacola.com', 'team_leader', 'ORG_10', '37b5649f-2ba7-498a-8bb0-22f2eb7c8d65', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "본사", "team_size" : {"department_size" : 8, "total_employees" : 63}}'),
	(11, '롯데리아직원2', '2025-04-17 06:50:45.660315', '2025-04-17 06:50:45.660315', 'verified', 'pending', '마케팅팀', '마케터', '010-0021-2001', 'chicken2@lotteria.com', 'marketer', 'ORG_11', '346721d8-4e6e-45aa-97f1-1166e49603a8', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "지사", "team_size" : {"department_size" : 11, "total_employees" : 32}, "is_new_employee" : true}'),
	(12, '미래기업직원2', '2025-04-17 06:50:45.660315', '2025-04-17 06:50:45.660315', 'verified', 'pending', '영업팀', '영업사원', '010-0022-2002', 'plan2@future.kr', 'sales', 'ORG_12', 'f7de1a12-7d47-4022-91c6-6bd6d8ab8d7d', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "지사", "team_size" : {"department_size" : 14, "total_employees" : 69}, "is_new_employee" : true}'),
	(13, '테크스타트직원2', '2025-04-17 06:50:45.660315', '2025-04-17 06:50:45.660315', 'verified', 'pending', '마케팅팀', '마케팅담당', '010-0023-2003', 'dev2@techstart.kr', 'marketing', 'ORG_13', '383089b2-a3a7-4dd1-b001-464d52b4af81', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "지사", "team_size" : {"department_size" : 21, "total_employees" : 104}, "is_new_employee" : true}'),
	(2, '황미래', '2025-04-17 06:45:19.382709', '2025-04-17 06:45:19.382709', 'verified', 'approved', '기획팀', '기획자', '010-0002-1002', 'plan@future.kr', 'planner', 'ORG_2', '01c6abd4-076a-4527-b7c1-db7ee26ee11e', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "본사", "team_size" : {"department_size" : 23, "total_employees" : 83}}'),
	(14, '프랭크버거직원2', '2025-04-17 06:50:45.660315', '2025-04-17 06:50:45.660315', 'verified', 'pending', '홀서빙팀', '서버', '010-0024-2004', 'chef2@frankburger.kr', 'server', 'ORG_14', '01c6abd4-076a-4527-b7c1-db7ee26ee11e', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "지사", "team_size" : {"department_size" : 23, "total_employees" : 103}, "is_new_employee" : true}'),
	(16, '맥도날드직원2', '2025-04-17 06:50:45.660315', '2025-04-17 06:50:45.660315', 'verified', 'pending', '주방팀', '주방장', '010-0026-2006', 'burger2@mcdonalds.com', 'kitchen_manager', 'ORG_16', 'abdb3e9e-c410-466d-97e3-51d41aafab55', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "지사", "team_size" : {"department_size" : 16, "total_employees" : 93}, "is_new_employee" : true}'),
	(17, '마이크로소프트직원2', '2025-04-17 06:50:45.660315', '2025-04-17 06:50:45.660315', 'verified', 'pending', 'AI개발팀', 'AI엔지니어', '010-0027-2007', 'cloud2@microsoft.com', 'ai_engineer', 'ORG_17', '6ba65f0c-eac3-4652-9a42-883aec25436e', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "지사", "team_size" : {"department_size" : 20, "total_employees" : 106}, "is_new_employee" : true}'),
	(18, '넥슨직원2', '2025-04-17 06:50:45.660315', '2025-04-17 06:50:45.660315', 'verified', 'pending', '기획팀', '게임기획자', '010-0028-2008', 'game2@nexon.com', 'game_planner', 'ORG_18', '982ead4c-b80f-4872-a499-3e0380752f05', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "지사", "team_size" : {"department_size" : 17, "total_employees" : 115}, "is_new_employee" : true}'),
	(19, '스타벅스직원2', '2025-04-17 06:50:45.660315', '2025-04-17 06:50:45.660315', 'verified', 'pending', '바리스타팀', '바리스타', '010-0029-2009', 'cafe2@starbucks.com', 'barista', 'ORG_19', 'e4018ae3-bad4-49ae-928e-ac2ed1378fea', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "지사", "team_size" : {"department_size" : 20, "total_employees" : 115}, "is_new_employee" : true}'),
	(20, '코카콜라직원2', '2025-04-17 06:50:45.660315', '2025-04-17 06:50:45.660315', 'verified', 'pending', '영업팀', '영업사원', '010-0030-2010', 'drink2@cocacola.com', 'sales', 'ORG_20', '37b5649f-2ba7-498a-8bb0-22f2eb7c8d65', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "지사", "team_size" : {"department_size" : 18, "total_employees" : 109}, "is_new_employee" : true}'),
	(15, '레피소드직원2', '2025-04-17 06:50:45.660315', '2025-04-17 06:50:45.660315', 'verified', 'approved', '디자인팀', 'UI디자이너', '010-0025-2005', 'dev2@lepisode.kr', 'designer', 'ORG_15', 'a6b9794d-f098-422b-a1f4-e718354e7639', '{"join_year" : 2024, "employee_type" : "full-time", "office_location" : "지사", "team_size" : {"department_size" : 24, "total_employees" : 61}, "is_new_employee" : true}'),
	(4216114741, '이소정', '2025-04-24 03:49:21.871007', '2025-04-24 03:49:21.871007', 'pending', 'pending', NULL, '사원', '010-8498-6314', 'sijiffs00@gmail.com', NULL, NULL, 'a6b9794d-f098-422b-a1f4-e718354e7639', NULL),
	(101, '김코딩', '2025-04-25 05:43:21.30495', '2025-04-25 05:43:21.30495', 'verified', 'approved', '개발팀', '주니어개발자', '010-1234-5678', 'coding@example.com', 'developer', 'ORG_101', 'a6b9794d-f098-422b-a1f4-e718354e7639', '{"join_year": 2024, "employee_type": "full-time", "office_location": "본사", "team_size": {"department_size": 20, "total_employees": 85}}'),
	(102, '이디자인', '2025-04-25 05:43:21.30495', '2025-04-25 05:43:21.30495', 'verified', 'approved', '디자인팀', '시니어디자이너', '010-2345-6789', 'design@example.com', 'designer', 'ORG_102', 'a6b9794d-f098-422b-a1f4-e718354e7639', '{"join_year": 2023, "employee_type": "full-time", "office_location": "본사", "team_size": {"department_size": 15, "total_employees": 85}}'),
	(103, '박마케팅', '2025-04-25 05:43:21.30495', '2025-04-25 05:43:21.30495', 'verified', 'approved', '마케팅팀', '마케팅매니저', '010-3456-7890', 'marketing@example.com', 'marketing_manager', 'ORG_103', 'f7de1a12-7d47-4022-91c6-6bd6d8ab8d7d', '{"join_year": 2022, "employee_type": "full-time", "office_location": "본사", "team_size": {"department_size": 12, "total_employees": 83}}'),
	(104, '최데이터', '2025-04-25 05:43:21.30495', '2025-04-25 05:43:21.30495', 'verified', 'approved', '데이터분석팀', '데이터분석가', '010-4567-8901', 'data@example.com', 'data_analyst', 'ORG_104', '383089b2-a3a7-4dd1-b001-464d52b4af81', '{"join_year": 2024, "employee_type": "part-time", "office_location": "지사", "team_size": {"department_size": 8, "total_employees": 29}}'),
	(105, '정운영', '2025-04-25 05:43:21.30495', '2025-04-25 05:43:21.30495', 'verified', 'approved', '운영팀', '운영팀장', '010-5678-9012', 'operations@example.com', 'operations_manager', 'ORG_105', '01c6abd4-076a-4527-b7c1-db7ee26ee11e', '{"join_year": 2021, "employee_type": "full-time", "office_location": "본사", "team_size": {"department_size": 10, "total_employees": 55}}');


--
-- Data for Name: org; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."org" ("id", "tier") VALUES
	(101, 0),
	(102, 1),
	(103, 2),
	(104, 3),
	(105, 4);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 44, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
