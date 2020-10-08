-- MariaDB dump 10.17  Distrib 10.5.5-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: library
-- ------------------------------------------------------
-- Server version	10.5.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banned_users`
--

DROP TABLE IF EXISTS `banned_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banned_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reason` varchar(45) DEFAULT NULL,
  `expire_date` date NOT NULL DEFAULT current_timestamp(),
  `users_id` int(11) NOT NULL,
  `ban_expired` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_user_banned_idx` (`users_id`),
  CONSTRAINT `fk_user_banned` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banned_users`
--

LOCK TABLES `banned_users` WRITE;
/*!40000 ALTER TABLE `banned_users` DISABLE KEYS */;
INSERT INTO `banned_users` VALUES (1,'now','2020-10-06',1,0),(2,'he is acting like a dick','2020-10-06',9,0),(3,'he is acting like a dick','2020-10-06',9,0),(4,'he is acting like a dick','2020-10-06',9,0),(5,'he is acting like a dick','2020-10-06',9,0),(6,'he is acting like a dick','2020-10-06',9,0),(7,'he is acting like a dick','2020-10-06',9,0),(8,'he is acting like a dick','2020-10-06',9,0),(9,'he is acting like a dick','2020-10-06',9,0),(10,'he is acting like a dick','2020-10-06',9,0),(11,'he is acting like a dick','2020-10-06',9,0),(12,'he is acting like a dick','2020-10-06',9,0);
/*!40000 ALTER TABLE `banned_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_ratings`
--

DROP TABLE IF EXISTS `book_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book_ratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` int(11) DEFAULT NULL,
  `users_id` int(11) NOT NULL,
  `books_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_gaved_rating_idx` (`users_id`),
  KEY `fk_book_recieved_rating_idx` (`books_id`),
  CONSTRAINT `fk_book_recieved_rating` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_gaved_rating` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_ratings`
--

LOCK TABLES `book_ratings` WRITE;
/*!40000 ALTER TABLE `book_ratings` DISABLE KEYS */;
INSERT INTO `book_ratings` VALUES (1,2,1,1),(2,5,1,2),(3,4,2,1);
/*!40000 ALTER TABLE `book_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `author` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `image` varchar(45) NOT NULL,
  `is_unlisted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Harry Potter 1','JKR','Harry is dope','',0),(2,'Harry Potter 2','JKR','flying car','',1),(3,'Roadside Picnic','Strugatski','stalkers and stuff','',0);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrowed_books`
--

DROP TABLE IF EXISTS `borrowed_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borrowed_books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `users_id` int(11) NOT NULL,
  `books_id` int(11) NOT NULL,
  `borrow_date` timestamp NULL DEFAULT current_timestamp(),
  `return_date` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) unsigned zerofill NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_book_id_idx` (`books_id`),
  KEY `fk_user_borrowed_book_idx` (`users_id`),
  CONSTRAINT `fk_book_borrowed` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_borrowed` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowed_books`
--

LOCK TABLES `borrowed_books` WRITE;
/*!40000 ALTER TABLE `borrowed_books` DISABLE KEYS */;
INSERT INTO `borrowed_books` VALUES (1,1,2,'2020-10-04 14:24:21',NULL,1),(2,2,1,'2020-10-04 14:24:21',NULL,0),(3,2,2,'2020-10-04 21:20:39','2020-10-04 21:20:45',1),(4,2,2,'2020-10-05 17:07:41','2020-10-05 17:07:47',1),(5,2,2,'2020-10-06 10:58:19','2020-10-06 10:59:43',1),(6,2,2,'2020-10-06 11:07:08','2020-10-06 11:07:24',1);
/*!40000 ALTER TABLE `borrowed_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_likes`
--

DROP TABLE IF EXISTS `review_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` tinyint(1) NOT NULL,
  `reviews_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_review_likes_reviews1_idx` (`reviews_id`),
  KEY `fk_user_id_idx` (`user_id`),
  CONSTRAINT `fk_review_likes_reviews1` FOREIGN KEY (`reviews_id`) REFERENCES `reviews` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_review_likes_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_likes`
--

LOCK TABLES `review_likes` WRITE;
/*!40000 ALTER TABLE `review_likes` DISABLE KEYS */;
INSERT INTO `review_likes` VALUES (7,-1,8,3),(8,1,9,1),(9,1,9,2),(10,1,8,10),(11,1,8,10),(12,1,8,10),(13,1,8,10),(14,0,8,11),(15,1,8,14),(16,1,8,15),(17,1,8,16),(18,0,8,17),(19,0,8,18);
/*!40000 ALTER TABLE `review_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `content` varchar(45) NOT NULL,
  `users_id` int(11) NOT NULL,
  `books_id` int(11) NOT NULL,
  `is_deleted` tinyint(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_idx` (`users_id`),
  KEY `fk_book_id_idx` (`books_id`),
  CONSTRAINT `fk_book_id` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (8,'Total new','click my link',1,1,0),(9,'Meh','Magic is for loosers',2,1,0),(10,'SHort title','Dude i am looking for the DVD. need it',16,1,0),(11,'cool shit','Best. Book. Ever.',20,1,0);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_levels`
--

DROP TABLE IF EXISTS `user_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_levels`
--

LOCK TABLES `user_levels` WRITE;
/*!40000 ALTER TABLE `user_levels` DISABLE KEYS */;
INSERT INTO `user_levels` VALUES (1,'regular'),(2,'admin');
/*!40000 ALTER TABLE `user_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `user_level` int(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `user_level_idx` (`user_level`),
  CONSTRAINT `user_level` FOREIGN KEY (`user_level`) REFERENCES `user_levels` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ivan','123',0,1),(2,'Dani','123',0,1),(3,'Admin','123',0,2),(4,'vasko','$2b$10$iA4YtB52Zei9m/yzF5b2GO82KPZyjXmgW6i92I',0,1),(5,'vasko','$2b$10$vXI09TQKJBPimrH4W/AMQ.hIdhOX5S7sSTB0N2',0,1),(6,'vasko','$2b$10$XsJ67BJJjK.65307TWW0ZOXQgEZnWmmM38SWga',0,1),(7,'dude','$2b$10$zx0o.jnHZQDnbIjge8Ueh.gsQndltA5ZNr8C3a',1,1),(8,'dude2','$2b$10$2evAlAcZHCv/LbkhAXDvx.mmmPFYdeyk0PfMAR',1,1),(9,'dude3','$2b$10$IS.C6I3G0BmD2nmlqstCJuqqpf307C1dSIvG2g',1,1),(10,'dude4','$2b$10$VkHdmWZ36bO8IhXeGDYel.BXnvoO2O5lq.TA5M',0,1),(11,'dude5','$2b$10$5cIo8YevX8q0kZFqhhQAAeZTKb7u1o2rGssjIE',0,1),(12,'test123','$2b$10$.LA2tLCzRSCgop70sUGwyePHomdW/a7Bn3j90b',0,1),(13,'test1233','$2b$10$963GDy7Hv.4wESZJZbP77uK69Bpwgih5iF5usK',0,1),(14,'shar','$2b$10$0bYJHgv9sV0K1GHrvgwOJOvnfnvxSsavvSVzez',0,1),(15,'sharo','$2b$10$l/LUE.MikVk4fqG95nPSdOJdcN1mtDhNTomEKP',0,1),(16,'vasko5','$2b$10$uMHjp8xwW2Cwg6JiWT4od.Lx1SGeKKLkJjixS9',0,1),(17,'vasko6','$2b$10$S2q06CgyHn7le7wloQwUyOdkKXrmk1eDOfM176spR4irvVH6zHAiu',0,1),(18,'admn','$2b$10$8zgkLpD51wCI2/3ukwRW5uMIKwEZ9Y7BulCA1SMN.Ob7L5hMG5.TS',0,2),(19,'sad','$2b$10$nUoSP.XBdfZzgQqgKKXEe.XV9Wt6vJKu9xGy3yTPEYzAuU6dnFkpq',0,1),(20,'tsest123','$2b$10$EUOvIgD425bNKuVJ14Kq..jp5M.Sf0dMT8MOX40ijQ/OElDuuAztq',0,1),(21,'test12356','$2b$10$v6UAK1Zm8islh3o7r8fxbOazxBQ2sxW6TL7u4RCjU8XAhuptM5Wrm',0,1),(22,'guest123','$2b$10$0xRizfz5hTyPI4ukm4pIxuLliJ4S17yWcrtrWKwvpOoKgMk1fQp4a',0,1),(23,'sadasdadaa','$2b$10$Lc3vpUjMkXQYIJHHYZ5DdOVmYxUYvE052aHaAUgqHnWqPsbbOFsm2',0,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-08  9:56:38
