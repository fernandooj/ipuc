CREATE TABLE IF NOT EXISTS `eventos` (
  `ideventos` INT NOT NULL,
  `tittle` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `eventDate` DATETIME NOT NULL,
  `created` VARCHAR(45) NOT NULL,
  `image` VARCHAR(255) NULL,
  `idCategory` INT NOT NULL,
  `namePlace` VARCHAR(45) NOT NULL,
  `estado` BINARY(1) NOT NULL,
  PRIMARY KEY (`ideventos`))
ENGINE = InnoDB;

COMMENT ON TABLE eventos IS 'events directory';

