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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banned_users`
--

LOCK TABLES `banned_users` WRITE;
/*!40000 ALTER TABLE `banned_users` DISABLE KEYS */;
INSERT INTO `banned_users` VALUES (1,'now','2020-10-06',1,0),(2,'he is acting like a dick','2020-10-06',9,0),(3,'he is acting like a dick','2020-10-06',9,0),(4,'he is acting like a dick','2020-10-06',9,0),(5,'he is acting like a dick','2020-10-06',9,0),(6,'he is acting like a dick','2020-10-06',9,0),(7,'he is acting like a dick','2020-10-06',9,0),(8,'he is acting like a dick','2020-10-06',9,0),(9,'he is acting like a dick','2020-10-06',9,0),(10,'he is acting like a dick','2020-10-06',9,0),(11,'he is acting like a dick','2020-10-06',9,0),(12,'he is acting like a dick','2020-10-06',9,0),(13,'I don\'t like him','2020-10-09',10,0),(14,'I don\'t like him','2020-10-09',10,0),(15,'I don\'t like him','2020-10-09',10,0),(16,'I don\'t like him','2020-10-09',10,0),(17,'I don\'t like him','2020-10-09',10,0),(18,'I don\'t like him','2020-10-09',10,0),(19,'I don\'t like him','2020-10-09',10,0),(20,'I don\'t like him','2020-10-09',10,0),(21,'I don\'t like him','2020-10-09',10,0),(22,'I don\'t like him','2020-10-09',10,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_ratings`
--

LOCK TABLES `book_ratings` WRITE;
/*!40000 ALTER TABLE `book_ratings` DISABLE KEYS */;
INSERT INTO `book_ratings` VALUES (1,2,1,1),(2,5,1,2),(3,4,2,1),(4,4,24,1),(5,4,24,2),(6,4,24,2),(7,4,24,2),(8,4,24,2),(9,4,24,2),(10,4,24,2);
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
  `description` varchar(1000) DEFAULT NULL,
  `image` varchar(500) NOT NULL,
  `is_unlisted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Harry Potter and the Philosopher\'s Stone','JKR','Harry Potter and the Philosopher\'s Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling\'s debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry\'s parents, but failed to kill Harry when he was just 15 months old.','https://hpmedia.bloomsbury.com/rep/s/9781408855898_309038.jpeg',0),(2,'Harry Potter and the Chamber of Secerts','JKR','flying car','https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL.jpg',1),(3,'Roadside Picnic','Strugatski','stalkers and stuff','https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1376254870l/17158490.jpg',0),(4,'The Hunger Games','Suzzane Collins','Kids go to reality show war','https://images-na.ssl-images-amazon.com/images/I/71WSzS6zvCL.jpg',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowed_books`
--

LOCK TABLES `borrowed_books` WRITE;
/*!40000 ALTER TABLE `borrowed_books` DISABLE KEYS */;
INSERT INTO `borrowed_books` VALUES (1,1,2,'2020-10-04 14:24:21',NULL,1),(2,2,1,'2020-10-04 14:24:21',NULL,0),(3,2,2,'2020-10-04 21:20:39','2020-10-04 21:20:45',1),(4,2,2,'2020-10-05 17:07:41','2020-10-05 17:07:47',1),(5,2,2,'2020-10-06 10:58:19','2020-10-06 10:59:43',1),(6,2,2,'2020-10-06 11:07:08','2020-10-06 11:07:24',1),(7,24,2,'2020-10-08 20:09:15','2020-10-08 20:13:56',1),(8,24,2,'2020-10-08 20:15:21','2020-10-08 20:15:26',1),(9,24,2,'2020-10-08 20:16:56','2020-10-08 20:17:03',1),(10,24,2,'2020-10-08 20:17:57','2020-10-08 20:18:02',1),(11,24,2,'2020-10-08 20:18:10','2020-10-08 20:18:14',1),(12,24,2,'2020-10-08 20:18:49','2020-10-08 20:18:54',1),(13,24,2,'2020-10-08 20:19:26','2020-10-08 20:19:31',1),(14,24,2,'2020-10-08 20:20:27','2020-10-08 20:20:32',1),(15,24,2,'2020-10-08 20:21:00','2020-10-08 20:21:04',1),(16,24,2,'2020-10-08 20:23:50','2020-10-08 20:23:55',1),(17,24,2,'2020-10-08 20:24:45','2020-10-08 20:24:51',1),(18,24,2,'2020-10-08 20:25:24','2020-10-08 20:25:27',1),(19,24,2,'2020-10-08 20:26:07','2020-10-08 20:26:12',1),(20,24,2,'2020-10-08 20:27:44','2020-10-08 20:27:48',1),(21,24,2,'2020-10-08 20:28:42','2020-10-08 20:28:47',1),(22,24,2,'2020-10-08 20:29:38','2020-10-08 20:29:42',1),(23,24,2,'2020-10-09 06:52:19','2020-10-09 06:52:28',1),(24,25,2,'2020-10-09 06:53:24','2020-10-09 06:53:44',1),(25,25,2,'2020-10-09 06:53:52','2020-10-09 06:53:56',1),(26,25,2,'2020-10-09 06:54:43','2020-10-09 06:54:48',1),(27,24,4,'2020-10-10 13:42:02','2020-10-10 13:42:32',1),(28,24,4,'2020-10-10 13:42:44','2020-10-10 13:42:49',1),(29,24,4,'2020-10-10 13:42:56','2020-10-10 13:43:01',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_likes`
--

LOCK TABLES `review_likes` WRITE;
/*!40000 ALTER TABLE `review_likes` DISABLE KEYS */;
INSERT INTO `review_likes` VALUES (7,-1,8,3),(8,1,9,1),(9,1,9,2),(10,1,8,10),(11,1,8,10),(12,1,8,10),(13,1,8,10),(14,0,8,11),(15,1,8,14),(16,1,8,15),(17,1,8,16),(18,0,8,17),(19,0,8,18),(25,40,12,24),(26,1,9,24);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (8,'It was fantastic','Gonna read it again!',1,1,0),(9,'Meh','Magic is for loosers',2,1,0),(10,'SHort title','Dude i am looking for the DVD. need it',16,1,0),(11,'cool shit','Best. Book. Ever.',20,1,1),(12,'It was fantastic','Gonna read it again!',24,1,1),(13,'It was fantastic','Gonna read it again!',24,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_levels`
--

LOCK TABLES `user_levels` WRITE;
/*!40000 ALTER TABLE `user_levels` DISABLE KEYS */;
INSERT INTO `user_levels` VALUES (1,'regular'),(2,'admin'),(3,'powerReader'),(4,'masterReader'),(5,'moderator');
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ivan','123',0,1),(2,'Dani','123',0,1),(3,'Admin','123',0,2),(4,'vasko','$2b$10$iA4YtB52Zei9m/yzF5b2GO82KPZyjXmgW6i92I',0,1),(5,'vasko','$2b$10$vXI09TQKJBPimrH4W/AMQ.hIdhOX5S7sSTB0N2',1,1),(6,'vasko','$2b$10$XsJ67BJJjK.65307TWW0ZOXQgEZnWmmM38SWga',0,1),(7,'dude','$2b$10$zx0o.jnHZQDnbIjge8Ueh.gsQndltA5ZNr8C3a',1,1),(8,'dude2','$2b$10$2evAlAcZHCv/LbkhAXDvx.mmmPFYdeyk0PfMAR',1,1),(9,'dude3','$2b$10$IS.C6I3G0BmD2nmlqstCJuqqpf307C1dSIvG2g',1,1),(10,'dude4','$2b$10$VkHdmWZ36bO8IhXeGDYel.BXnvoO2O5lq.TA5M',1,1),(11,'dude5','$2b$10$5cIo8YevX8q0kZFqhhQAAeZTKb7u1o2rGssjIE',0,1),(12,'test123','$2b$10$.LA2tLCzRSCgop70sUGwyePHomdW/a7Bn3j90b',0,1),(13,'test1233','$2b$10$963GDy7Hv.4wESZJZbP77uK69Bpwgih5iF5usK',0,1),(14,'shar','$2b$10$0bYJHgv9sV0K1GHrvgwOJOvnfnvxSsavvSVzez',0,1),(15,'sharo','$2b$10$l/LUE.MikVk4fqG95nPSdOJdcN1mtDhNTomEKP',0,1),(16,'vasko5','$2b$10$uMHjp8xwW2Cwg6JiWT4od.Lx1SGeKKLkJjixS9',0,1),(17,'vasko6','$2b$10$S2q06CgyHn7le7wloQwUyOdkKXrmk1eDOfM176spR4irvVH6zHAiu',0,1),(18,'admn','$2b$10$8zgkLpD51wCI2/3ukwRW5uMIKwEZ9Y7BulCA1SMN.Ob7L5hMG5.TS',0,2),(19,'sad','$2b$10$nUoSP.XBdfZzgQqgKKXEe.XV9Wt6vJKu9xGy3yTPEYzAuU6dnFkpq',0,1),(20,'tsest123','$2b$10$EUOvIgD425bNKuVJ14Kq..jp5M.Sf0dMT8MOX40ijQ/OElDuuAztq',0,1),(21,'test12356','$2b$10$v6UAK1Zm8islh3o7r8fxbOazxBQ2sxW6TL7u4RCjU8XAhuptM5Wrm',0,1),(22,'guest123','$2b$10$0xRizfz5hTyPI4ukm4pIxuLliJ4S17yWcrtrWKwvpOoKgMk1fQp4a',0,1),(23,'sadasdadaa','$2b$10$Lc3vpUjMkXQYIJHHYZ5DdOVmYxUYvE052aHaAUgqHnWqPsbbOFsm2',0,1),(24,'verji','$2b$10$TDNovY5KpUhTSqS11n/2kuKybx5PA6D.uGj9ZAk31AM5YJTV332ay',0,2),(25,'verji3','$2b$10$VGixCmM8dnstLusM3zAyiutlRbHqHnwYihTBiJYjrh.sSOB8nAfnO',0,3);
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

-- Dump completed on 2020-10-17 17:16:41
