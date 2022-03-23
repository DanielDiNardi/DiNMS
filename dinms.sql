drop table Ingredient;
drop table ProductCategory;
drop table SaleOrder;
drop table Product;
drop table Stock;
drop table Sale;
drop table Category;

-- Entities

create table Sale(
    id integer primary key,
    sale_date varchar,
    total_money decimal,
    payment_method varchar
);

create table Product(
    id varchar primary key,
    name varchar,
    price real
);

create table Category(
    id varchar primary key,
    name varchar
);

create table Stock(
    id varchar primary key,
    name varchar,
    restock_max real,
    restock_min real,
    current_stock real,
    unit varchar
);

-- Weak Entities

create table Ingredient(
    product_id varchar,
    stock_id varchar,
    amount_used real,
    foreign key (product_id) references product(id),
    foreign key (stock_id) references stock(id)
);

create table SaleOrder(
    sale_id integer,
    amount integer,
    product_id varchar,
    foreign key (sale_id) references sale(id),
    foreign key (product_id) references product(id)
);


create table ProductCategory(
    product_id varchar,
    category_id varchar,
    foreign key (product_id) references product(id),
    foreign key (category_id) references category(id)
);

insert into Category values('chip_cat_demo', 'Chips');
insert into Category values('burger_cat_demo', 'Burgers');
insert into Category values('battered_cat_demo', 'Battered');
insert into Category values('chicken_cat_demo', 'Chicken');
insert into Category values('gluten_free_cat_demo', 'Gluten Free');
insert into Category values('pizza_cat_demo', 'Pizza');

insert into Product values('chip_demo', 'Chip', 2.80);
insert into Product values('burger_demo', 'Burger', 3.60);
insert into Product values('battered_sausage_demo', 'Battered Sausage', 2.00);

insert into ProductCategory values('chip_demo', 'chip_cat_demo');
insert into ProductCategory values('burger_demo', 'burger_cat_demo');
insert into ProductCategory values('battered_sausage_demo', 'battered_cat_demo');

insert into Stock values('potato_demo','Potato', 25, 10, 25, 'kg');
insert into Stock values('bun_demo', 'Bun', 24, 6, 24, 'buns');
insert into Stock values('ketchup_demo', 'Ketchup', 5, 1, 5, 'kg');
insert into Stock values('onion_demo', 'Onion', 20, 5, 20, 'kg');
insert into Stock values('flour_demo', 'Flour', 25, 5, 25, 'kg');
insert into Stock values('sausage_demo', 'Sausage', 40, 5, 40, 'susages');

insert into Ingredient values('chip_demo', 'potato_demo', 0.5);
insert into Ingredient values('burger_demo', 'bun_demo', 1),
                             ('burger_demo', 'ketchup_demo', 0.017),
                             ('burger_demo', 'onion_demo', 0.017);
insert into Ingredient values('battered_sausage_demo', 'flour_demo', 0.05),
                             ('battered_sausage_demo', 'sausage_demo', 1);