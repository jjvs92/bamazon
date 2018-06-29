drop database if exists bamazon_db;

create database bamazon_db;
use bamazon_db;

create table products (
	item_id int not null auto_increment,
	product_name varchar(30) not null,
	department_name varchar(30) not null,
	price decimal(5,2) not null,
	stock_quantity int(5) not null,
	primary key (item_id)
);

select * from products;

insert into products (product_name, department_name, price, stock_quantity)
values ("TV", "Electronics", 600, 60);

insert into products (product_name, department_name, price, stock_quantity)
values("Laptop", "Electronics", 1200, 45);

insert into products (product_name, department_name, price, stock_quantity)
values("Shin guards", "Sports", 8, 120);

insert into products (product_name, department_name, price, stock_quantity)
values("Soccer ball", "Sports", 13, 78);

insert into products (product_name, department_name, price, stock_quantity)
values("Duffle bag", "Sports", 28, 30);

insert into products (product_name, department_name, price, stock_quantity)
values("Tent", "Outdoors", 140, 24);

insert into products (product_name, department_name, price, stock_quantity)
values("Grill", "Outdoors", 115, 15);

insert into products (product_name, department_name, price, stock_quantity)
values("Lawn chair", "Outdoors", 15, 30);

insert into products (product_name, department_name, price, stock_quantity)
values("30 foot rope", "Outdoors", 8, 15);

insert into products (product_name, department_name, price, stock_quantity)
values("HomePod", "Electronics", 300, 8);


