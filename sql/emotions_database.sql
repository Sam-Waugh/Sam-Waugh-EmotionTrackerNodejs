-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2024 at 08:55 PM
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
  `modified_ts` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `notes` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci KEY_BLOCK_SIZE=2;

-- --------------------------------------------------------

--
-- Table structure for table `snapshot_default_trigger`
--

CREATE TABLE `snapshot_default_trigger` (
  `snapshot_default_trigger_id` int(11) NOT NULL,
  `emotional_snapshot_id` int(11) DEFAULT NULL,
  `default_trigger_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `telephone_no` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `default_trigger_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emotional_snapshot`
--
ALTER TABLE `emotional_snapshot`
  MODIFY `emotional_snapshot_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `snapshot_default_trigger`
--
ALTER TABLE `snapshot_default_trigger`
  MODIFY `snapshot_default_trigger_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `snapshot_user_trigger`
--
ALTER TABLE `snapshot_user_trigger`
  MODIFY `snapshot_user_trigger_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

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
