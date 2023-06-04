-- drop table "ROUTINE", "USER", "USER_CREATES_ROUTINE", "WORKOUT", "ROUTINE_WORKOUTS", "EXERCISE", "WORKOUT_EXERCISE", "MUSCULAR_GROUP" ,"MUSCULAR_GROUP_EXERCISE" ,"HISTORIC", "WORKOUT_REALIZED"

create table if not exists "ROUTINE"(
					   id int not null, primary key (id));

create table if not exists "USER"(
					id int not null,
					name  character varying(80) not null,
					login character varying(30) not null unique,
					pass character varying(30) not null,
					age int not null,
					weight real not null,
					height real not null,
					sex character varying(1),
					obj character varying(100),
					xp int,
					routine_id int,
					primary key(id),
					foreign key (routine_id) references "ROUTINE");

create table if not exists "USER_CREATES_ROUTINE"(
							user_id int not null,
							routine_id int not null,
							primary key (user_id, routine_id),
							foreign key (user_id) references "USER",
							foreign key (routine_id) references "ROUTINE"
							);
						
create table if not exists "WORKOUT"(
							id int not null,
							difficulty character varying(1) not null, -- E, M, H -> fazer a checagem
							-- POR ENQUANTO TREINO TÁ SEM GRUPO MUSCULAR
							obj character varying(20) not null, -- não sei muito bem como fazer o objetivo por enquanto fica assim
							user_id int not null,
							primary key (id),
							foreign key (user_id) references "USER",
							check (difficulty IN ('E', 'M', 'H')) -- por enquanto fica assim, no futuro talvez adicione uma função para modificar
							);
						
create table if not exists "ROUTINE_WORKOUTS"(
											  id int not null,
											  routine_id int not null,
											  workout_id int not null,
											  primary key (id),
											  foreign key (routine_id) references "ROUTINE",
											  foreign key (workout_id) references "WORKOUT");
						
create table if not exists "EXERCISE"(
									 id int not null,
									 name character varying(30) not null,
									 difficulty character varying(1) not null,
									 sets int,
									 reps int,
									 weight real,
									 obj character varying(20) not null, -- não sei muito bem como fazer o objetivo por enquanto fica assim
									 reps_progress int,
									 weight_progress real,
									 rest interval not null,
									 primary key (id),
									 check (difficulty IN ('E', 'M', 'H'))
									 );
									
create table if not exists "WORKOUT_EXERCISE"(
											 id int not null,
											 workout_id int not null,
											 exercise_id int not null,
											 primary key (id),
											 foreign key (workout_id) references "WORKOUT",
											 foreign key (exercise_id) references "EXERCISE"
											 );

create table if not exists "MUSCULAR_GROUP"(
											id int not null,
											name character varying(30) not null,
											primary key(id)
											);
											
create table if not exists "MUSCULAR_GROUP_EXERCISE"(
											id int not null,
											muscular_group_id int not null,
											exercise_id int not null,
											primary key(id),
											foreign key (muscular_group_id) references "MUSCULAR_GROUP",
											foreign key (exercise_id) references "EXERCISE"
											);
										
create table if not exists "HISTORIC"(
									 id int not null,
									 user_id int not null,
									 days_trained int not null,
									 weights_lifted real not null,
									 reps_done int not null,
									 time_training numeric(5, 2) not null,
									 primary key(id),
									 foreign key (user_id) references "USER");

create table if not exists "WORKOUT_REALIZED"(
											  id int not null,
											  date_ date not null,
											  duration interval not null,
											  workout_id int not null,
											  historic_id int not null,
											  primary key(id),
											  foreign key (workout_id) references "WORKOUT",
											  foreign key (historic_id) references "HISTORIC",
											  CHECK (date_ >= '2023-01-01' AND date_ <= CURRENT_DATE)
											);