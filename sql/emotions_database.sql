-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2024 at 08:56 PM
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
(10, 'Friends');

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
  `notes` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci KEY_BLOCK_SIZE=2;

--
-- Dumping data for table `emotional_snapshot`
--

INSERT INTO `emotional_snapshot` (`emotional_snapshot_id`, `user_id`, `enjoyment_level`, `sadness_level`, `anger_level`, `contempt_level`, `disgust_level`, `fear_level`, `surprise_level`, `created_ts`, `modified_ts`, `notes`) VALUES
(2, 1, 5, 1, 1, 1, 1, 1, 2, '2024-02-01 16:22:04', '2024-02-18 14:36:33', '2344565'),
(4, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-01-01 00:00:00', NULL, 'Heavy night drinks'),
(8, 2, 1, 4, 4, 4, 2, 1, 1, '2024-02-04 13:38:40', NULL, 'didn\'t get job'),
(11, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 20:02:08', NULL, 'bad night\'s sleep'),
(21, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 21:39:51', NULL, 'bad night\'s sleep'),
(22, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 21:50:51', NULL, 'bad night\'s sleep'),
(23, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:00:25', NULL, 'bad night\'s sleep'),
(24, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:01:34', NULL, 'bad night\'s sleep'),
(25, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:02:24', NULL, 'bad night\'s sleep'),
(26, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:05:42', '2024-02-18 19:00:35', 'bad night\'s sleep2'),
(27, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:19:08', '2024-02-17 17:18:47', 'lots sleep'),
(28, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:19:49', '2024-02-17 16:55:43', 'lots sleep'),
(29, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:22:26', '2024-02-18 13:14:59', 'coffee with friends'),
(30, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-14 22:26:39', '2024-02-17 17:31:55', 'lots of sleep'),
(31, 1, 1, 4, 3, 5, 3, NULL, 1, '2024-02-14 22:29:36', '2024-02-17 16:46:38', NULL),
(32, 1, 1, 4, 3, 5, 3, NULL, 1, '2024-02-14 22:29:47', '2024-02-17 15:44:46', 'big run'),
(33, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 10:32:28', NULL, 'bad night\'s sleep'),
(34, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 10:34:16', NULL, 'bad night\'s sleep'),
(35, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 14:35:29', NULL, 'bad night\'s sleep'),
(36, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 14:37:34', NULL, 'bad night\'s sleep'),
(37, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 14:38:49', NULL, 'bad night\'s sleep'),
(38, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 14:53:18', NULL, 'bad night\'s sleep'),
(39, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 14:59:24', NULL, 'bad night\'s sleep'),
(40, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 16:23:50', NULL, 'bad night\'s sleep'),
(41, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 16:24:42', NULL, 'bad night\'s sleep'),
(42, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 16:29:26', NULL, 'bad night\'s sleep'),
(43, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 16:30:40', NULL, 'bad night\'s sleep'),
(44, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 16:35:17', NULL, 'bad night\'s sleep'),
(45, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 18:29:31', NULL, 'bad night\'s sleep'),
(46, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 18:29:31', NULL, 'bad night\'s sleep'),
(47, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 18:32:17', NULL, 'bad night\'s sleep'),
(48, 1, 1, 4, 3, 5, 3, 2, 1, '2024-02-15 18:35:57', '2024-02-15 18:59:11', 'big run'),
(49, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-17 19:52:32', NULL, NULL),
(50, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-17 19:54:34', NULL, NULL),
(51, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-02-17 20:48:19', NULL, NULL),
(52, 1, 1, 2, 3, 4, 5, 1, 2, '2024-02-17 20:57:36', NULL, 'deadlines'),
(53, 1, 5, 2, 3, 1, 2, 1, 2, '2024-02-18 15:22:14', NULL, 'test');

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
(60, 51, 7),
(61, 51, 8),
(62, 52, 7),
(63, 52, 8),
(64, 29, 4),
(65, 29, 6),
(66, 29, 10),
(70, 53, 3),
(71, 53, 6);

-- --------------------------------------------------------

--
-- Table structure for table `snapshot_user_trigger`
--

CREATE TABLE `snapshot_user_trigger` (
  `snapshot_user_trigger_id` int(11) NOT NULL,
  `emotional_snapshot_id` int(11) NOT NULL,
  `user_trigger_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `telephone_no` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password_saltedhash`, `email`, `name`, `date_of_birth`, `telephone_no`, `gender`) VALUES
(1, 'bob', '$2b$10$XReKIXxPdoO4s58qgkSLMun/SEkme2AhOBdEGiC0naBEGZ/R19L4G', 'bob@gmail.com', 'Bob Smith', '2000-02-04', NULL, 'Male'),
(2, 'sam', 'sam123', 'sam@gmail.com', 'Sam', '0000-00-00', '56454560', 'Female'),
(3, 'david', '$2b$10$jHBfCIYy59x4L2O/tPvpfueLg6BUH1wwQmU/iYPeE59LLmeaMnO.K', 'david@gmail.com', 'david', '0000-00-00', '5454664', 'Male'),
(4, 'david', '$2b$10$83OTiFOg0xl4Fo5lGh9TEeANOMBqiFjJjvldcWEPrLrOFd00L1HUC', 'david@gmail.com', 'david', '0000-00-00', '5454664', 'Male'),
(17, 'fred', '$2b$10$8VoqT.bcIssKr/P0QC.vvelYUw2NvvcYxDGgcVlefzECYnFdWjXGu', 'fred@gmail.com', 'Fred', '1970-01-01', '5454664', 'Male');

-- --------------------------------------------------------

--
-- Table structure for table `user_trigger`
--

CREATE TABLE `user_trigger` (
  `user_trigger_id` int(11) NOT NULL,
  `user_trigger_name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

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
  ADD KEY `fk_emotional_snapshot_emotional_snapshot_id` (`emotional_snapshot_id`),
  ADD KEY `fk_default_trigger_default_trigger_id` (`default_trigger_id`);

--
-- Indexes for table `snapshot_user_trigger`
--
ALTER TABLE `snapshot_user_trigger`
  ADD PRIMARY KEY (`snapshot_user_trigger_id`),
  ADD KEY `fk_emotional_snapshot_emotional_snapshot_id2` (`emotional_snapshot_id`),
  ADD KEY `fk_user_trigger_user_trigger_id` (`user_trigger_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_trigger`
--
ALTER TABLE `user_trigger`
  ADD PRIMARY KEY (`user_trigger_id`),
  ADD KEY `fk_user_user_id2` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `default_trigger`
--
ALTER TABLE `default_trigger`
  MODIFY `default_trigger_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `emotional_snapshot`
--
ALTER TABLE `emotional_snapshot`
  MODIFY `emotional_snapshot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `snapshot_default_trigger`
--
ALTER TABLE `snapshot_default_trigger`
  MODIFY `snapshot_default_trigger_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `snapshot_user_trigger`
--
ALTER TABLE `snapshot_user_trigger`
  MODIFY `snapshot_user_trigger_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_trigger`
--
ALTER TABLE `user_trigger`
  MODIFY `user_trigger_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `emotional_snapshot`
--
ALTER TABLE `emotional_snapshot`
  ADD CONSTRAINT `fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `snapshot_default_trigger`
--
ALTER TABLE `snapshot_default_trigger`
  ADD CONSTRAINT `fk_default_trigger_default_trigger_id` FOREIGN KEY (`default_trigger_id`) REFERENCES `default_trigger` (`default_trigger_id`),
  ADD CONSTRAINT `fk_emotional_snapshot_emotional_snapshot_id` FOREIGN KEY (`emotional_snapshot_id`) REFERENCES `emotional_snapshot` (`emotional_snapshot_id`);

--
-- Constraints for table `snapshot_user_trigger`
--
ALTER TABLE `snapshot_user_trigger`
  ADD CONSTRAINT `fk_emotional_snapshot_emotional_snapshot_id2` FOREIGN KEY (`emotional_snapshot_id`) REFERENCES `emotional_snapshot` (`emotional_snapshot_id`),
  ADD CONSTRAINT `fk_user_trigger_user_trigger_id` FOREIGN KEY (`user_trigger_id`) REFERENCES `user_trigger` (`user_trigger_id`);

--
-- Constraints for table `user_trigger`
--
ALTER TABLE `user_trigger`
  ADD CONSTRAINT `fk_user_user_id2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
