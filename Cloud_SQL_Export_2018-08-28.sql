-- MySQL dump 10.13  Distrib 5.7.14, for Linux (x86_64)
--
-- Host: localhost    Database: mysql
-- ------------------------------------------------------
-- Server version	5.7.14-google-log

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
-- Current Database: `bamazon`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `bamazon` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `bamazon`;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `customer_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Macbook Pro 2018','Computers and Laptops',1300.00,4),(2,'Ipad Pro 2017','Tablet',800.00,6),(3,'iPhone Xd','Cell Phones',900.00,14),(4,'Stylus Pen','Accessories',199.00,43),(5,'Water Bottle green','Sports and Outdoors',15.00,14),(6,'Water Bottle purple','Sports and Outdoors',15.00,10),(7,'Chips Ahoy','Snack Foods',5.00,14),(8,'HP Spectre 2018','Computers and Laptops',1500.00,3),(9,'Galaxy S9','Tablet',700.00,5),(10,'Flash Drive 256GB','Accessories',40.00,13),(11,'Mixed Nuts','Snack Foods',7.00,10),(12,'Galaxy N9','Cell Phones',600.00,11);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-28  6:30:35
