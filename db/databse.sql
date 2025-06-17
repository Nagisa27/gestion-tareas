create table usuario(
	id serial primary key,
	nombre varchar(50) not null,
	email varchar(50) unique not null,
	contrasena varchar(100) not null
);

create table tarea(
	id serial primary key,
	titulo varchar(100) not null,
	descripcion text,
	estado varchar(15),
	id_usuario integer references usuario(id)
)