-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2024 at 11:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emotions_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_user`
--

CREATE TABLE `api_user` (
  `apiuser_id` int(11) NOT NULL,
  `apiusername` varchar(255) NOT NULL,
  `apikey` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_user`
--

INSERT INTO `api_user` (`apiuser_id`, `apiusername`, `apikey`) VALUES
(1, 'emotionTrackerClientSide', 'dsa4xqkqkjd0i1bxd9gv540s071x68'),
(2, 'emotionTrackerClientSide', 'hb3sord0dya2tkdd0ukwj6hx2vwf8j'),
(3, 'emotionTrackerClientSide', 'knc3pn1eyp1xty4nosfdwp097mk7u4'),
(4, 'emotionTrackerClientSide', 'knvt8yxuenh5jfrtxjm7lpgzqjwiu4'),
(5, 'emotionTrackerClientSide', '$2b$10$OGnuSgLQ8M.MgqbDEnZFYejlt2iO8rRkx1TiGVp/bwtQIBZHqnyS6'),
(6, 'emotionTrackerClientSide', '8llnc03d4qnwyc3j9v3mrhetp4a0wg');

-- --------------------------------------------------------

--
-- Table structure for table `default_trigger`
--

CREATE TABLE `default_trigger` (
  `default_trigger_id` int(11) NOT NULL,
  `default_trigger_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `default_trigger`
--

INSERT INTO `default_trigger` (`default_trigger_id`, `default_trigger_name`) VALUES
(1, 'Exercise'),
(2, 'Sleep'),
(3, 'Healthy Food'),
(4, 'Comfort Food'),
(5, 'Alcohol'),
(6, 'Gratitude'),
(7, 'Work'),
(8, 'Study'),
(9, 'Family'),
(10, 'Friends'),
(11, 'Weather'),
(12, 'Social Media');

-- --------------------------------------------------------

--
-- Table structure for table `emotional_snapshot`
--

CREATE TABLE `emotional_snapshot` (
  `emotional_snapshot_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `enjoyment_level` int(1) DEFAULT NULL,
  `sadness_level` int(1) DEFAULT NULL,
  `anger_level` int(1) DEFAULT NULL,
  `contempt_level` int(1) DEFAULT NULL,
  `disgust_level` int(1) DEFAULT NULL,
  `fear_level` int(1) DEFAULT NULL,
  `surprise_level` int(1) DEFAULT NULL,
  `created_ts` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified_ts` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci KEY_BLOCK_SIZE=2;

--
-- Dumping data for table `emotional_snapshot`
--

INSERT INTO `emotional_snapshot` (`emotional_snapshot_id`, `user_id`, `enjoyment_level`, `sadness_level`, `anger_level`, `contempt_level`, `disgust_level`, `fear_level`, `surprise_level`, `created_ts`, `modified_ts`, `notes`) VALUES
(2, 1, 5, 1, 1, 1, 1, 1, 2, '2024-02-01 16:22:04', '2024-02-23 20:19:42', '2344565'),
(4, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-01-01 00:00:00', '2024-02-24 14:40:34', 'Heavy night drinks'),
(11, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 20:02:08', '2024-02-24 14:40:14', 'bad night\'s sleep'),
(26, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:05:42', '2024-02-19 13:56:11', 'bad night\'s sleep2'),
(27, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:19:08', '2024-02-17 17:18:47', 'lots sleep'),
(28, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:19:49', '2024-02-19 13:52:27', 'lots sleep'),
(29, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:22:26', '2024-02-18 13:14:59', 'coffee with friends'),
(30, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:26:39', '2024-02-17 17:31:55', 'lots of sleep'),
(31, 1, 1, 4, 3, 5, 3, NULL, 1, '2024-02-14 22:29:36', '2024-02-17 16:46:38', NULL),
(32, 1, 1, 4, 3, 5, 3, NULL, 1, '2024-02-14 22:29:47', '2024-02-17 15:44:46', 'big run'),
(34, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 10:34:16', '2024-02-19 13:27:56', 'bad night\'s sleep'),
(35, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 14:35:29', NULL, 'bad night\'s sleep'),
(36, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 14:37:34', '2024-02-19 13:23:22', 'bad night\'s sleep'),
(37, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 14:38:49', NULL, 'bad night\'s sleep'),
(39, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 14:59:24', '2024-02-19 13:23:35', 'bad night\'s sleep'),
(44, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 16:35:17', NULL, 'bad night\'s sleep'),
(45, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 18:29:31', NULL, 'bad night\'s sleep'),
(46, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 18:29:31', NULL, 'bad night\'s sleep'),
(47, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 18:32:17', NULL, 'bad night\'s sleep'),
(48, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 18:35:57', '2024-02-15 18:59:11', 'big run'),
(49, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-17 19:52:32', NULL, NULL),
(50, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-17 19:54:34', NULL, NULL),
(51, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-17 20:48:19', '2024-02-19 15:38:30', ''),
(52, 1, 1, 2, 3, 4, 5, 1, 2, '2024-02-17 20:57:36', NULL, 'deadlines'),
(53, 1, 5, 2, 3, 1, 2, 1, 2, '2024-02-18 15:22:14', '2024-02-18 20:37:51', 'test'),
(54, 1, 1, 5, 3, 2, 5, 2, 4, '2024-02-18 20:42:07', NULL, 'dog died'),
(55, 1, 5, 5, 3, 2, 5, 1, 2, '2024-02-18 20:43:13', NULL, ''),
(56, 1, 1, 2, 3, 1, 2, 1, 2, '2024-02-19 15:20:11', '2024-02-19 15:20:29', 'uuyihulkj'),
(58, 1, 5, 2, 3, 2, 5, 1, 2, '2024-02-19 15:23:24', NULL, ''),
(59, 1, 1, 1, 1, 1, 1, 1, 1, '2024-02-23 20:07:06', NULL, ''),
(60, 1, 1, 1, 1, 1, 1, 1, 1, '2024-02-23 20:07:06', NULL, ''),
(61, 1, 3, 3, 4, 2, 5, 4, 3, '2024-02-23 20:09:22', NULL, 'test'),
(62, 1, 1, 1, 4, 1, 1, 1, 1, '2024-02-23 20:20:39', NULL, 'sasds'),
(63, 1, 1, 1, 4, 1, 1, 1, 1, '2024-02-23 20:22:18', NULL, 'sasds'),
(64, 1, 1, 1, 4, 1, 1, 1, 1, '2024-02-23 20:25:11', NULL, 'sasds'),
(65, 1, 1, 1, 5, 1, 1, 1, 1, '2024-02-23 20:25:54', '2024-02-23 20:28:05', 'hgfghfUPDATE'),
(66, 1, 1, 3, 1, 4, 1, 1, 1, '2024-02-24 15:31:37', NULL, ''),
(81, 18, 4, 3, 4, 3, 3, 4, 4, '2024-01-01 21:13:58', NULL, ''),
(82, 18, 1, 1, 5, 4, 1, 2, 1, '2024-01-02 21:36:45', '2024-01-07 21:44:08', ''),
(83, 18, 5, 2, 1, 1, 1, 1, 5, '2024-01-05 21:37:30', NULL, 'Friends threw me a surprise party'),
(84, 18, 4, 1, 1, 1, 2, 1, 3, '2024-01-05 21:38:19', NULL, 'lots of sleep'),
(85, 18, 4, 1, 1, 1, 1, 3, 1, '2024-01-11 21:39:04', NULL, 'Night out'),
(86, 18, 1, 5, 1, 1, 2, 1, 2, '2024-01-15 21:39:39', '2024-01-16 21:57:42', 'Dog died'),
(87, 18, 1, 1, 4, 4, 1, 2, 1, '2024-01-15 21:40:12', '2024-02-01 22:03:03', 'Work and study deadlines'),
(88, 18, 4, 1, 1, 1, 1, 1, 1, '2024-01-16 21:40:34', '2024-01-16 19:45:34', 'Family lunch'),
(89, 18, 2, 2, 4, 4, 1, 3, 2, '2024-01-18 21:41:06', NULL, 'Scrolling instagram'),
(90, 18, 1, 1, 3, 3, 4, 1, 2, '2024-01-22 22:15:51', '2024-01-24 22:16:25', 'Caught in a storm '),
(91, 18, 4, 1, 1, 1, 4, 1, 1, '2024-01-31 22:18:15', NULL, 'hot yoga'),
(92, 18, 4, 1, 1, 1, 4, 1, 1, '2024-02-02 22:18:15', NULL, 'hot yoga'),
(93, 18, 4, 3, 1, 1, 1, 1, 1, '2024-02-05 22:19:56', NULL, ''),
(94, 18, 4, 3, 1, 1, 1, 1, 1, '2024-02-05 22:19:56', NULL, ''),
(95, 18, 1, 1, 2, 4, 3, 1, 1, '2024-02-07 22:20:49', '2024-02-07 20:08:19', 'i'),
(96, 18, 1, 4, 1, 1, 1, 1, 1, '2024-02-08 22:22:14', NULL, 'i'),
(97, 18, 1, 1, 1, 1, 1, 1, 5, '2024-02-09 22:53:50', '2024-02-10 23:00:12', 'Caught in a storm'),
(98, 18, 5, 1, 1, 1, 1, 3, 4, '2024-02-11 12:17:18', NULL, 'promotion at work'),
(99, 18, 5, 1, 1, 1, 1, 1, 1, '2024-02-15 12:52:09', NULL, ''),
(100, 18, 5, 1, 1, 1, 1, 1, 1, '2024-02-16 12:52:16', NULL, ''),
(101, 18, 1, 4, 1, 1, 1, 1, 1, '2024-02-18 13:04:22', '2024-02-19 21:56:41', ''),
(102, 18, 1, 4, 1, 1, 1, 1, 1, '2024-02-20 13:04:39', NULL, ''),
(103, 18, 1, 4, 1, 1, 1, 1, 1, '2024-02-21 13:05:32', '2024-02-21 09:54:42', ''),
(104, 18, 1, 1, 1, 1, 3, 1, 1, '2024-02-22 13:07:10', NULL, ''),
(106, 18, 1, 1, 1, 1, 3, 1, 1, '2024-02-18 13:24:02', '2024-02-18 20:59:03', 'cdas'),
(109, 18, 3, 1, 1, 1, 1, 1, 1, '2024-02-23 13:33:08', '2024-02-25 17:21:42', 't'),
(111, 18, 5, 1, 1, 1, 2, 1, 4, '2024-02-25 13:37:19', '2024-03-03 21:38:10', 'got validator to work'),
(112, 18, 1, 4, 1, 1, 1, 2, 1, '2024-02-26 13:39:26', '2024-03-03 21:38:17', 'validator didn\'t work as expected'),
(119, 18, 1, 1, 1, 1, 1, 1, 1, '2024-02-27 14:04:46', '2024-03-27 18:20:24', 'test'),
(120, 18, 1, 1, 1, 1, 1, 1, 1, '2024-02-28 14:06:29', '2024-02-28 20:28:21', 'lots sleep'),
(125, 18, 1, 1, 1, 1, 1, 1, 2, '2024-02-28 14:15:05', '2024-03-03 21:39:15', 'test'),
(127, 18, 1, 4, 3, 1, 1, 1, 1, '2024-02-29 19:29:41', '2024-03-03 21:39:07', 'k'),
(128, 18, 1, 1, 5, 1, 3, 1, 1, '2024-03-02 19:33:29', NULL, 'sports team lost'),
(130, 18, 1, 4, 1, 3, 1, 4, 1, '2024-02-29 21:56:54', '2024-03-03 21:39:26', ''),
(133, 18, 4, 1, 1, 2, 1, 1, 5, '2024-03-01 19:00:51', '2024-03-03 21:39:31', 'if refactoring works'),
(135, 18, 3, 1, 1, 1, 4, 1, 4, '2024-03-03 20:29:07', NULL, 'Big run PB');

-- --------------------------------------------------------

--
-- Table structure for table `snapshot_default_trigger`
--

CREATE TABLE `snapshot_default_trigger` (
  `snapshot_default_trigger_id` int(11) NOT NULL,
  `emotional_snapshot_id` int(11) DEFAULT NULL,
  `default_trigger_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `snapshot_default_trigger`
--

INSERT INTO `snapshot_default_trigger` (`snapshot_default_trigger_id`, `emotional_snapshot_id`, `default_trigger_id`) VALUES
(42, 48, 1),
(43, 48, 3),
(44, 48, 5),
(48, 32, 1),
(49, 32, 3),
(50, 32, 5),
(53, 30, 2),
(54, 30, 6),
(55, 49, 7),
(56, 49, 8),
(57, 50, 4),
(58, 50, 5),
(59, 50, 10),
(62, 52, 7),
(63, 52, 8),
(64, 29, 4),
(65, 29, 6),
(66, 29, 10),
(86, 53, 3),
(87, 54, 9),
(92, 58, 2),
(93, 51, 7),
(94, 51, 8),
(100, 65, 5),
(101, 65, 8),
(102, 11, 6),
(103, 4, 5),
(129, 83, 9),
(130, 83, 10),
(131, 84, 2),
(132, 85, 5),
(133, 85, 10),
(136, 89, 12),
(137, 82, 7),
(138, 86, 4),
(139, 87, 7),
(140, 87, 8),
(142, 90, 11),
(143, 91, 1),
(144, 92, 1),
(145, 93, 4),
(146, 94, 4),
(149, 96, 9),
(152, 97, 10),
(153, 98, 7),
(154, 111, 8),
(155, 112, 8),
(156, 109, 9),
(161, 127, 9),
(171, 106, 7),
(172, 106, 8),
(174, 130, 7),
(175, 103, 10),
(176, 103, 12),
(183, 133, 8),
(184, 88, 4),
(185, 88, 9),
(187, 95, 5),
(188, 95, 7),
(189, 120, 2),
(190, 120, 3),
(191, 135, 1);

--
-- Triggers `snapshot_default_trigger`
--
DELIMITER $$
CREATE TRIGGER `update_snapshot_modified_ts` BEFORE UPDATE ON `snapshot_default_trigger` FOR EACH ROW BEGIN
    UPDATE emotional_snapshot
    SET modified_ts = CURRENT_TIMESTAMP()
    WHERE emotional_snapshot_id = NEW.emotional_snapshot_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password_saltedhash` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password_saltedhash`, `email`, `name`, `date_of_birth`, `gender`) VALUES
(1, 'bob', '$2b$10$XReKIXxPdoO4s58qgkSLMun/SEkme2AhOBdEGiC0naBEGZ/R19L4G', 'bob@gmail.com', 'Bob Smith', '2000-02-04', 'Male'),
(3, 'david', '$2b$10$jHBfCIYy59x4L2O/tPvpfueLg6BUH1wwQmU/iYPeE59LLmeaMnO.K', 'david@gmail.com', 'david', '0000-00-00', 'Male'),
(17, 'fred', '$2b$10$8VoqT.bcIssKr/P0QC.vvelYUw2NvvcYxDGgcVlefzECYnFdWjXGu', 'fred@gmail.com', 'Fred', '1970-01-01', 'Male'),
(18, 'Sam', '$2b$10$kYOG8IxrJoCcS3o0Wg5Jre6CG7Ig5ObuqyqTco1jo5xXoXFpHBUMS', 'sam@gmail.co.uk', 'Sam King', '1990-05-11', 'female'),
(19, 'Rose', '$2b$10$mLjpyQ9Trdrj9oABJLANTeLfmoH21JhbWs0TCvpiLWcje..nEAaBK', 'rose@gmail.com', 'Rose Jones', '2001-01-01', 'female'),
(20, 'Steve', '$2b$10$CYIWv2wR.CuSRuJLCx20QuYljWQnJRTDk5ZxXjXz/wtHhfeMgW2Bi', 'steve@gmail.com', 'Steve Stephens', '1994-02-01', 'other'),
(21, 'Susie', '$2b$10$cv4ItZKp7A8QWVUSjc5VgekdEfwOCsqrf6QCgK9bk3tyY397/UpuS', 'susie@gmail.com', 'Susie Brown', '2005-02-02', 'female'),
(22, 'dave12356', '$2b$10$4tDKhBRnMyUlUjtz5LAziuNsl3VYyrD0mYLANW3vMUyfyXQd8kZXC', 'david@gmail.com', 'david', '1982-12-25', 'male'),
(23, 'Patrick', '$2b$10$T0l6qtihE.7B3jsP8lt67ef.RQRAqzmtoWE8.GO6r7/D8O64XYYJ2', 'patrick@gmail.com', 'Patrick O\'Connor', '1970-02-28', 'male'),
(61, 'Sam56', '$2b$10$7QUEvyLC6NLRPtVfKO5NgeJ8SvR3zlMGyhI4M26dg22k4S87Rn6im', 'sam@gmail.co.uk', 'Sam Williams', '1960-02-25', 'male');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_user`
--
ALTER TABLE `api_user`
  ADD PRIMARY KEY (`apiuser_id`);

--
-- Indexes for table `default_trigger`
--
ALTER TABLE `default_trigger`
  ADD PRIMARY KEY (`default_trigger_id`);

--
-- Indexes for table `emotional_snapshot`
--
ALTER TABLE `emotional_snapshot`
  ADD PRIMARY KEY (`emotional_snapshot_id`),
  ADD KEY `fk_user_user_id` (`user_id`);

--
-- Indexes for table `snapshot_default_trigger`
--
ALTER TABLE `snapshot_default_trigger`
  ADD PRIMARY KEY (`snapshot_default_trigger_id`),
  ADD KEY `fk_default_trigger_default_trigger_id` (`default_trigger_id`),
  ADD KEY `fk_emotional_snapshot_emotional_snapshot_id` (`emotional_snapshot_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`,`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_user`
--
ALTER TABLE `api_user`
  MODIFY `apiuser_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `default_trigger`
--
ALTER TABLE `default_trigger`
  MODIFY `default_trigger_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `emotional_snapshot`
--
ALTER TABLE `emotional_snapshot`
  MODIFY `emotional_snapshot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `snapshot_default_trigger`
--
ALTER TABLE `snapshot_default_trigger`
  MODIFY `snapshot_default_trigger_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `emotional_snapshot`
--
ALTER TABLE `emotional_snapshot`
  ADD CONSTRAINT `fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `snapshot_default_trigger`
--
ALTER TABLE `snapshot_default_trigger`
  ADD CONSTRAINT `fk_default_trigger_default_trigger_id` FOREIGN KEY (`default_trigger_id`) REFERENCES `default_trigger` (`default_trigger_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_emotional_snapshot_emotional_snapshot_id` FOREIGN KEY (`emotional_snapshot_id`) REFERENCES `emotional_snapshot` (`emotional_snapshot_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
