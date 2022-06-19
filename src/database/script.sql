CREATE TABLE IF NOT EXISTS `users`(

    `user_id` INT (10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_name` VARCHAR(50) NOT NULL,
    `user_password` VARCHAR(15) NOT NULL,
    `user_bio` VARCHAR (500),
    `user_pic` VARCHAR(150) NOT NULL,
    `user_brithday` DATETIME,
);

CREATE TABLE IF NOT EXISTS `photos`(

    `photo_id` INT (10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user_photo` VARCHAR (150) NOT NULL,
    `user_id` INT (10) NOT NULL,
    `insert_date` DATETIME DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS `user_has_folow`(

    `user_id` INT (10) NOT NULL,
    `follow_id` INT (10) NOT NULL
)