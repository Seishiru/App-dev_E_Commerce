-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2024 at 11:10 AM
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
-- Database: `app_e_commerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `address_type` enum('Home','Work','Other') DEFAULT 'Home',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `phone_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `receiver`, `address`, `address_type`, `created_at`, `updated_at`, `phone_number`) VALUES
(1, 33, 'Cecil', '1234 Elm Street, Springfield, IL, 62701', 'Home', '2024-12-16 09:52:22', '2024-12-16 10:55:33', '09687027777'),
(2, 1, 'Test', '5678 Oak Street, Springfield, IL, 62702', 'Work', '2024-12-16 09:52:22', '2024-12-16 11:51:50', '09687027777');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'keyboard'),
(2, 'laptop'),
(3, 'cellphone'),
(4, 'computer'),
(5, 'tablet'),
(6, 'monitor'),
(7, 'earphone'),
(8, 'mouse');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `shipping_address` varchar(255) DEFAULT NULL,
  `tracking_number` varchar(255) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT 'unpaid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT 'completed',
  `transaction_id` varchar(255) NOT NULL,
  `currency` varchar(10) DEFAULT 'USD'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `category_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `description`, `price`, `stock_quantity`, `category_id`, `created_at`, `image_url`) VALUES
(4, 'ZOWIE Zhuowei mouse', 'EC2 EC3C esports FK2FK1B game S1 S2C BenQ ZA12B ZA13-C', 1699.00, 100, 8, '2024-12-13 08:21:49', '1734106909269.png'),
(5, 'Ziyoulang K68', 'Bluetooth Wireless Dual Mode Brazilian Portuguese Wireless Mechanical Keyboard Hot Plug Ergonomics Red Switch', 1300.00, 1000, 1, '2024-12-13 08:26:15', '1734107175344.png'),
(6, 'SDEHB Varmilo minilo', '75% wireless 81key 3-mode (wired+2.4G+BT5.0) Hot swapping mechanical keyboard PBT Keycaps RGB backlit QMJID', 1299.00, 548, 1, '2024-12-13 08:42:32', '1734108152960.png'),
(8, 'ATTACK SHARK X6 Mouse', 'PAW3395 Bluetooth Tri-Mode Connection,RGB Touch Magnetic Charging Base,Macro Gaming Mouse', 2999.89, 990, 8, '2024-12-13 09:38:55', '1734111535280.png'),
(9, 'Rapoo VT950 Pro Gaming Mouse', 'Two connection modes: Wired and 2.4 GHz Wireless, Ergonomic design, Adjustable 50 – 16,000 DPI gaming sensor', 1990.89, 344, 8, '2024-12-13 09:49:58', '1734112198292.png'),
(10, 'Logitech G PRO X SUPERLIGHT', 'Wireless Gaming Mouse, Ultra-Lightweight, HERO 25K Sensor, 25,600 DPI, 5 Programmable Buttons, White C28', 598.00, 789, 8, '2024-12-13 10:12:08', '1734113528369.png'),
(11, 'Assorted Mouse', 'Computer with Free Mousepad', 699.00, 800, 8, '2024-12-13 10:13:03', '1734113583545.png'),
(12, 'FFN Wireless Gaming Mouse', 'Colorful 9 Backlight,16000 DPI,75H Battery Standby,3 Mode USB-C/Dual Bluetooth 5.0 Portable Rechargeable/Black', 399.67, 560, 8, '2024-12-13 10:14:31', '1734113671909.png'),
(13, 'memzuoix Wireless Mouse', '5 Button 1200 DPI Mobile Optical Mouse, Cordless Laptop Mouse with Nano Receiver, Purple', 399.67, 490, 8, '2024-12-13 10:15:17', '1734113717730.png'),
(14, 'R8 Mouse', 'Hot sale 2.4G 3D Wireless Mouse with USB Receiver for Office', 456.00, 128, 8, '2024-12-13 10:19:06', '1734113946951.png'),
(15, 'Gogusuu Keyboard Mouse Combo', 'T350 Backlight Usb Ergonomic Gaming Keyboard and Mouse Set for Laptop', 1389.78, 100, 8, '2024-12-13 10:19:56', '1734113996906.png'),
(16, 'Logitech G213 Prodigy USB Gaming Keyboard', 'Designed for gamers of all levels, this full-sized gaming keyboard offers responsive performance that\'s up to 4x faster than standard keyboards.\r\n', 2456.99, 980, 1, '2024-12-13 18:46:59', '1734144419938.png'),
(17, 'MSI Vigor GK30 Gaming RGB Keyboard/Mouse Combo', 'White with Vigor GK30 Keyboard and Clutch GM11 Mouse', 3456.99, 1000, 1, '2024-12-13 18:48:05', '1734144485376.png'),
(18, 'D620 Gaming Keyboard and Mouse Bundle Kit', 'Rainbow led Light effect Crack Backlit USB Computer Gaming Wired Keyboard and mice bundle set RGB LED Backlit 104 Keys and Mouse combo set', 3000.00, 500, 1, '2024-12-13 18:52:07', '1734144727905.png'),
(19, 'Logitech Wireless Keyboard and Mouse', 'Combo for Windows, 2.4 GHz Wireless, Compact Mouse, 8 Multimedia and Shortcut Keys, 2-Year Battery Life', 2999.00, 389, 1, '2024-12-13 18:53:01', '1734144781758.png'),
(20, 'AnthroDesk Wireless Keyboard/Mouse', 'Combo, Silver & White\r\n', 1999.00, 389, 1, '2024-12-13 18:54:02', '1734144842099.png'),
(21, 'Redragon K368 Keyboard', 'Wired 104 Keys LED Outemu Switch Computer Mechanical Gaming Keyboard Gamer Teclado', 999.00, 200, 1, '2024-12-13 18:54:41', '1734144881943.png'),
(22, 'Razer Huntsman V2 Tenkeyless Optical Gaming Keyboard', 'RAZER™ OPTICAL SWITCHES and LIGHTNING-FAST ACTUATION Swifter Actions\r\n', 2399.00, 457, 1, '2024-12-13 18:55:36', '1734144936600.png'),
(23, 'HP Window Laptop', 'HP 14S-DQ3041TU 14-inch HD Intel Pentium Silver N6000 8GB RAM 256GB SSD Intel UHD Graphics Windows 11 Laptop\r\n', 22989.00, 390, 2, '2024-12-13 19:25:14', '1734146714369.png'),
(24, 'MSI Katana 15 B12UDXK', '1826PH 15.6″ FHD 144Hz|i5-12450H|RTX 3050|8GB DDR5|512GB SSD\r\n', 45000.00, 300, 2, '2024-12-13 19:25:55', '1734146755782.png'),
(25, 'Asus TUF Dash F15 FX507ZC4', 'HN081W [Mecha Grey] 15.6″ FHD 144Hz|i5-12500H|RTX 3050|8GB DDR4|512GB SSD\r\n', 51234.00, 678, 2, '2024-12-13 19:26:42', '1734146802464.png'),
(26, 'LENOVO LOQ 15IRX9 ', '83DV0013PH 15.6″ FHD 144Hz|i5-13450HX|RTX 3050|8GB DDR5|512GB SSD\r\n', 52100.00, 678, 2, '2024-12-13 19:27:23', '1734146843272.png'),
(27, 'WENTING Cell Phone ', 'Sale Clearance P48 Plus Phones Unlocked,5.8&#34; 6GB215GB Dual Sim Phone,Triple Cameras 4G Global Bands Smart Phone,Face ID 4800 mAh-Blue\n', 5499.00, 278, 3, '2024-12-13 20:35:04', '1734150904045.png'),
(28, 'Alcatel 1 ', '(16GB) 5.0\" Full View Display, Removable Battery, FM Radio, Dual SIM GSM Unlocked US & Global 4G LTE International Version 5033E (Bluish Black)\r\n', 4999.00, 568, 3, '2024-12-13 20:35:52', '1734150952434.png'),
(29, 'Nokia 110 4G ', '|Dual SIM|GSM Unlocked Mobile Phone|Volte|Blue|International Version|Not AT&T/Cricket/Verizon Compatible', 3389.00, 768, 3, '2024-12-13 20:36:27', '1734150987911.png'),
(30, 'BLU C5L MAX ', 'All-Day Battery|GSM Unlocked|5.7” Display|16/2GB|US Version|Black\r\n', 3373.00, 768, 3, '2024-12-13 20:37:34', '1734151054342.png'),
(31, 'Apple iPhone 11 Pro Max ', 'iPhone 7-32GB/64GB/256GB-Unlocked-Excellent\r\n', 19000.00, 357, 3, '2024-12-13 20:38:13', '1734151093533.png'),
(32, 'Apple iPhone 14 Plus ', '128GB Blue Cellphone Mobile Phone\r\n', 54234.00, 266, 3, '2024-12-13 20:39:02', '1734151142458.png'),
(33, 'Samsung Galaxy S21 Ultra 5G', '6.8 in|25W fast charging, 15W wireles charging, 4.5W reverse wireless charging|108.0 MP|12.0 MP|10.0 MP\r\n', 15431.00, 4467, 3, '2024-12-13 20:40:07', '1734151207036.png'),
(34, 'Brand New System Unit / CPU', 'Intel Core i5-11400, Intel HD Graphics, 8GB DDR4 Memory, 240GB SSD, 700 Watts PSU with Casing', 15949.00, 345, 4, '2024-12-13 21:11:20', '1734153080871.png'),
(35, 'SYSTEM UNIT FOR SALE', 'AMD RYZEN 3 3200G TURBO 4.0GHZ, BIOSTAR A320MH, LIQUID COOLING SINGLE (ANY BRAND), 8GB RAM DDR4 2666MHZ GLOWAY', 6730.00, 436, 4, '2024-12-13 21:12:02', '1734153122100.png'),
(36, 'Hot sale cheap gamer desktop computer', 'A8 7680 CPU, 16GB DDR3 RAM, and a GT 240 graphics card', 4598.00, 467, 4, '2024-12-13 21:12:52', '1734153172410.png'),
(37, 'Dell Optiplex 745 80GB', 'Intel Core 2 Duo, 2GB RAM, 80GB HDD', 3667.00, 100, 4, '2024-12-13 21:14:27', '1734153267061.png'),
(38, 'Tablet 10.1 inch Android 12 Tablet ', '2024 Latest Update Octa-Core Processor with 64GB Storage, Dual 13MP+5MP Camera, WiFi, Bluetooth, GPS, 512GB Expand Support, IPS Full HD Display (Black)\r\n', 10678.00, 3477, 5, '2024-12-13 21:31:06', '1734154266534.png'),
(39, 'Lenovo Tab M10 Plus ', '3rd Gen 10 Tablet, 64GB Storage, 4GB Memory, Android 12, FHD Display', 8678.00, 4000, 5, '2024-12-13 21:31:48', '1734154308902.png'),
(40, 'Tab P12 Pro', 'Premium tablet with 12.6&quot; 2K AMOLED display\r\n', 11900.00, 4078, 5, '2024-12-13 21:32:46', '1734154366315.png'),
(41, 'TCL NXTPAPER 14', 'Full-color Electronic Paper Display Tablet | TCL Global', 10900.00, 678, 5, '2024-12-13 21:33:19', '1734154399240.png'),
(42, 'CHERRY AIO1 (All-in-One Tablet)', 'Large 15.6” FHD IPS Display, Dual Front Camera (13MP Main, Swivel Cam & 2MP Secondary Camera), 128GB Internal Storage |8GB RAM\r\n', 11980.00, 567, 5, '2024-12-13 21:33:55', '1734154435024.png'),
(43, 'TCL NXTPAPER 11', '2K 11\" NXTPAPER Display, Premium Design, 8000mAh Big Battery', 12980.00, 567, 5, '2024-12-13 21:34:27', '1734154467400.png'),
(44, 'Lenovo Tab M11 Android Tablet ', '4GB Memory – 128GB Storage – Front 8MP & Rear 13MP Camera 11.0', 9980.00, 567, 5, '2024-12-13 21:35:12', '1734154512172.png'),
(45, 'OEM Hot Sale ', '2K Computer Monitors 21.5\' 24\' 27\' HD IPS Display 165Hz Game Desktop Gaming PC Monitor', 5987.00, 324, 6, '2024-12-13 21:44:42', '1734155082158.png'),
(46, 'Gaming Monitor', 'Model: G244F-E2, Screen Size: 23.8\", Panel Type: IPS, Resolution: 1920x1080 FHD', 7987.00, 657, 6, '2024-12-13 21:45:18', '1734155118766.png'),
(47, 'Gigabyte 27. 144 Hz Gaming Monitor ', '17d (range: 5-7.5mm), delivers crisp images with vp, dp-c, freesync, dvi-d, widescreen, blue light. Hp Monitor 27', 5947.00, 500, 6, '2024-12-13 21:46:03', '1734155163394.png'),
(48, 'ASUS TUF 23.8-inch FHD FreeSync Gaming Monitor', 'Display Stream Compression (DSC), ASUS Extreme Low Motion Blur Sync (ELMB Sync) and AMD FreeSync Premium', 9947.00, 657, 6, '2024-12-13 21:46:35', '1734155195345.png'),
(49, 'ViVo Earphone', 'Color: Black, White, Red, Blue, Length：1215 mm , External case material: Plastic , Operating temperature：-10℃ to 55℃ ', 567.00, 4567, 7, '2024-12-13 22:14:58', '1734156898628.png'),
(50, 'Y70 Earphone ', 'Tws Mini Fone Bt 5.1 Noise Cancelling Earbuds', 868.00, 4575, 7, '2024-12-13 22:15:43', '1734156943686.png'),
(51, 'Ows-03 Earphones', 'Computer Headphone from High Quality Earphones Bluetooth Ows-03 Earbuds Three Colors White Black Brown Hot Sale', 485.00, 2367, 7, '2024-12-13 22:16:28', '1734156988644.png'),
(52, 'R12 Hot Sale Headphones ', 'RoHS Wireless Earphones Stereo Handsfree Headset', 675.00, 2367, 7, '2024-12-13 22:17:38', '1734157058963.png');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `title` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `verification_code` varchar(64) NOT NULL,
  `expiry_time` datetime NOT NULL,
  `is_verified` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'customer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `verification_code`, `expiry_time`, `is_verified`, `created_at`, `password`, `address`, `phone`, `role`) VALUES
(1, 'Admin User', '1@1.1', '', '0000-00-00 00:00:00', 1, '2024-12-13 17:40:20', '1', '123 Admin St', '123-456-7890', 'admin'),
(2, 'Customer User', '2@2.2', '', '0000-00-00 00:00:00', 0, '2024-12-13 17:40:20', '2', '456 Customer Ave', '234-567-8901', 'customer'),
(3, 'Seller User', 'seller@example.com', '233008', '2024-12-16 14:31:16', 0, '2024-12-13 17:40:20', 'password123', '789 Seller Rd', '345-678-9012', 'seller'),
(33, 'Cecil', '22105000@usc.edu.ph', '543788', '2024-12-16 16:10:43', 1, '2024-12-16 07:55:43', '183492761', 'Guadalupe', NULL, 'customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `tracking_number` (`tracking_number`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD UNIQUE KEY `transaction_id` (`transaction_id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
