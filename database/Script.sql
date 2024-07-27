CREATE DATABASE WAC;

USE WAC;

CREATE TABLE WAC.main_screen(
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100)	
);

INSERT INTO main_screen (name) values ('Ver Mesas');

SELECT * FROM main_screen;

CREATE TABLE WAC.wac_usuarios(
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) UNIQUE,
	pass VARCHAR(255),
	usrName VARCHAR(255),
	usrRole INT(2),
	created_at DATETIME,
	created_by VARCHAR(50),
	active BOOL
);

insert into wac_usuarios (username, pass, usrName, usrRole, created_at, created_by, active) values ('MrRX', '123', 'Julio Pineda', 10, sysdate(), 'DEVELOPER', true);

select * from wac_usuarios;

CREATE TABLE WAC.wac_mesas (
	mesa_id INT auto_increment primary key,
	mesa_area VARCHAR(100),
	mesa_status VARCHAR(100)
);

INSERT INTO wac_mesas (mesa_area, mesa_status) values ('Terraza', 'Libre');

SELECT * FROM wac_mesas;

UPDATE WAC.wac_mesas SET mesa_status = 'Libre' WHERE mesa_id = 2;

CREATE TABLE WAC.wac_mesas_movimientos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	mesa_id INT,
	mesa_status VARCHAR(100),
	mesa_changed DATETIME
);

SELECT * FROM wac_mesas_movimientos;

CREATE TABLE WAC.wac_productos(
	item_id INT AUTO_INCREMENT PRIMARY KEY,
	item_name VARCHAR(100),
	item_description VARCHAR(255),
	item_unit_messure VARCHAR(50),
	item_category VARCHAR(100),
	item_sub_cat VARCHAR(100),
	item_unit_price DOUBLE(4,2),
	item_existence INT
);

INSERT INTO wac_productos (item_name,item_description,item_unit_messure,item_category,item_sub_cat,item_unit_price,item_existence)
VALUES ('Prociutto Estelar','','Unidad','Pizzas','Pizzas',10.99,0);

SELECT * FROM wac_productos;