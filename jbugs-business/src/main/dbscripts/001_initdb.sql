-- create tables

create table users
(
	ID bigint auto_increment
		primary key,
	counter int null,
	email varchar(255) not null,
	first_name varchar(255) not null,
	last_name varchar(255) not null,
	mobile_number varchar(255) not null,
	password varchar(255) not null,
	username varchar(255) not null
)
;

create table roles
(
	ID bigint auto_increment
		primary key,
	type varchar(255) not null
)
;

create table users_roles
(
	user_id bigint not null,
	role_id bigint not null,
	primary key (user_id, role_id),
	constraint FK_users_roles_role_id
		foreign key (role_id) references roles (ID),
	constraint FK_users_roles_user_id
		foreign key (user_id) references users (ID)
)
;

create table permission
(
	ID bigint auto_increment
		primary key,
	description varchar(255) not null,
	type varchar(255) not null
)
;

create table permissions_roles
(
	role_id bigint not null,
	permission_id bigint not null,
	primary key (role_id, permission_id),
	constraint FK_permissions_roles_permission_id
		foreign key (permission_id) references permissions (ID),
	constraint FK_permissions_roles_role_id
		foreign key (role_id) references roles (ID)
)
;

create table notifications
(
	ID bigint auto_increment
		primary key,
	date datetime null,
	message varchar(255) null,
	type varchar(255) null,
	url varchar(255) null,
	user_id bigint null
)
;


create table comment
(
	text varchar(1000) null,
	date datetime null
)
;


-- insert data
INSERT INTO jbugs.users (ID, counter, email, first_name, last_name, mobile_number, password, username) VALUES (1, 0, 'admin@admin.com', 'Viorica', 'Administrator', '0700000000', 'admin', 'admin');
INSERT INTO jbugs.users (ID, counter, email, first_name, last_name, mobile_number, password, username) VALUES (5, 0, 'pm@pm.com', 'Serban', 'Manager', '0700000000', 'pm', 'pm');
INSERT INTO jbugs.users (ID, counter, email, first_name, last_name, mobile_number, password, username) VALUES (6, 0, 'tm@tm.com', 'Mihai', 'TestManager', '0700000000', 'tm', 'tm');
INSERT INTO jbugs.users (ID, counter, email, first_name, last_name, mobile_number, password, username) VALUES (7, 0, 'dev@dev.com', 'Andreea', 'Developer', '0700000000', 'dev', 'dev');
INSERT INTO jbugs.users (ID, counter, email, first_name, last_name, mobile_number, password, username) VALUES (8, 0, 'tst@tst.com', 'Gheorghe', 'Tester', '0700000000', 'tester', 'tester');

INSERT INTO jbugs.roles (ID, type) VALUES (1, 'ADMINISTRATOR');
INSERT INTO jbugs.roles (ID, type) VALUES (2, 'PROJECT MANAGER');
INSERT INTO jbugs.roles (ID, type) VALUES (3, 'TEST MANAGER');
INSERT INTO jbugs.roles (ID, type) VALUES (4, 'DEVELOPER');
INSERT INTO jbugs.roles (ID, type) VALUES (5, 'TESTER');

INSERT INTO jbugs.users_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO jbugs.users_roles (user_id, role_id) VALUES (5, 2);
INSERT INTO jbugs.users_roles (user_id, role_id) VALUES (6, 3);
INSERT INTO jbugs.users_roles (user_id, role_id) VALUES (7, 4);
INSERT INTO jbugs.users_roles (user_id, role_id) VALUES (8, 5);

INSERT INTO jbugs.permission (ID, description, type) VALUES (1, 'Can modify role assignment.', 'PERMISSION_MANAGEMENT');
INSERT INTO jbugs.permission (ID, description, type) VALUES (2, 'Can modify users.', 'USER_MANAGEMENT');
INSERT INTO jbugs.permission (ID, description, type) VALUES (3, 'Can modify bugs.', 'BUG_MANAGEMENT');

INSERT INTO jbugs.permissions_roles (role_id, permission_id) VALUES (1, 1);
INSERT INTO jbugs.permissions_roles (role_id, permission_id) VALUES (1, 2);
INSERT INTO jbugs.permissions_roles (role_id, permission_id) VALUES (2, 2);
INSERT INTO jbugs.permissions_roles (role_id, permission_id) VALUES (2, 3);

