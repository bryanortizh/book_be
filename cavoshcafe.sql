CREATE DATABASE IF NOT EXISTS `cavoshcafe` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci;

USE cavoshcafe;

CREATE TABLE `producto` (
  `Id` int(11) NOT NULL,
  `Detalle` int(100) NOT NULL,
  `Descripcion` int(100) NOT NULL,
  `Valor` decimal(6,2) NOT NULL,
  `Stock` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Nombres` varchar(120) NOT NULL,
  `Correo` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Login` char(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;


ALTER TABLE `producto`
  ADD PRIMARY KEY (`Id`);


ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

ALTER TABLE `producto`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
