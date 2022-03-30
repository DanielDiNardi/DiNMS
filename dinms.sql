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
insert into Category values('fish_cat_demo', 'Fish');
insert into Category values('burger_cat_demo', 'Burgers');
insert into Category values('battered_cat_demo', 'Battered');
insert into Category values('chicken_cat_demo', 'Chicken');
insert into Category values('gluten_free_cat_demo', 'Gluten Free');
insert into Category values('pizza_cat_demo', 'Pizza');

insert into Product values('chip_demo', 'Chip', 2.80);
insert into Product values('battered_sausage_demo', 'Battered Sausage', 2.10);
insert into Product values('scallops_test', 'Potato Scallops', 2.20);
insert into Product values('battered_burger_test', 'Battered Burger', 3.20);
insert into Product values('onion_rings_test', 'Onion Rings', 2.70);
insert into Product values('battered_mushrooms_test', 'Battered Mushrooms', 5.00);
insert into Product values('fresh_cod_test', 'Fresh Cod', 7.10);
insert into Product values('smoked_cod_test', 'Smoked Cod', 7.10);
insert into Product values('cod_portion_test', 'Cod Portion', 4.50);

insert into ProductCategory values('chip_demo', 'chip_cat_demo');
insert into ProductCategory values('battered_sausage_demo', 'battered_cat_demo');
insert into ProductCategory values('scallops_test', 'battered_cat_demo');
insert into ProductCategory values('battered_burger_test', 'battered_cat_demo');
insert into ProductCategory values('onion_rings_test', 'battered_cat_demo');
insert into ProductCategory values('battered_mushrooms_test', 'battered_cat_demo');
insert into ProductCategory values('fresh_cod_test', 'fish_cat_demo');
insert into ProductCategory values('smoked_cod_test', 'fish_cat_demo');
insert into ProductCategory values('cod_portion_test', 'fish_cat_demo');

insert into Stock values('potato_demo','Potato', 15, 5, 15, 'Sack(s)');
insert into Stock values('onion_demo', 'Onion', 1, 0, 1, 'Sack(s)');
insert into Stock values('flour_demo', 'Flour', 3, 1, 3, 'Sack(s)');
insert into Stock values('sausage_demo', 'Sausage', 4, 2, 4, 'Box(es)');
insert into Stock values('fresh_fish_test', 'Fresh Fish', 4, 2, 4, 'Box(es)');
insert into Stock values('smoked_fish_test', 'Smoked Fish', 4, 2, 4, 'Box(es)');
insert into Stock values('fish_portion_test', 'Fish Portion', 1, 0, 1, 'Box(es)');
insert into Stock values('mushroom_test', 'Mushrooms', 1, 0, 1, 'Box(es)');
insert into Stock values('burger_patty_test', 'Burger Patty', 2, 1, 2, 'Box(es)');

insert into Ingredient values('chip_demo', 'potato_demo', 0.04);
insert into Ingredient values('battered_sausage_demo', 'flour_demo', 0.002),
                             ('battered_sausage_demo', 'sausage_demo', 0.025);
insert into Ingredient values('scallops_test', 'potato_demo', 0.003),
                             ('scallops_test', 'flour_demo', 0.006);
insert into Ingredient values('battered_burger_test', 'burger_patty_test', 0.025),
                             ('battered_burger_test', 'flour_demo', 0.002);
insert into Ingredient values('onion_rings_test', 'onion_demo', 0.05),
                             ('onion_rings_test', 'flour_demo', 0.01);
insert into Ingredient values('battered_mushrooms_test', 'mushroom_test', 0.08),
                             ('battered_mushrooms_test', 'flour_demo', 0.01);
insert into Ingredient values('fresh_cod_test', 'fresh_fish_test', 0.025),
                             ('fresh_cod_test', 'flour_demo', 0.002);
insert into Ingredient values('cod_portion_test', 'fish_portion_test', 0.02),
                             ('cod_portion_test', 'flour_demo', 0.002);
insert into Ingredient values('smoked_cod_test', 'smoked_fish_test', 0.025),
                             ('smoked_cod_test', 'flour_demo', 0.002);