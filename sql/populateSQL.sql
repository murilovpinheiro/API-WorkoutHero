INSERT INTO exercise (id, name, difficulty, sets, reps, weight, obj, reps_progress, weight_progress, rest)
VALUES (1, 'Supino Reto', 'Intermediário', 3, 10, 100, 'Força', 2, 5, 60);

INSERT INTO historic (id, user_id, days_trained, weights_lifted, reps_done, time_training)
VALUES (1, 123, 5, 5000, 100, '2 horas');

INSERT INTO muscular_group_exercise (id, muscular_group_id, exercise_id)
VALUES (1, 2, 1);

INSERT INTO muscular_group (id, name)
VALUES (1, 'Peitoral');

INSERT INTO routine_workout (id, routine_id, workout_id)
VALUES (1, 3, 4);

INSERT INTO workout_exercise (id, workout_id, exercise_id)
VALUES (1, 4, 1);

INSERT INTO workout_realized (id, date_, duration, workout_id, historic_id)
VALUES (1, '2023-06-30', '1 hora', 4, 1);

INSERT INTO workout (id, difficulty, obj, user_id)
VALUES (1, 'Intermediário', 'Hipertrofia', 123);

INSERT INTO user (id, name, login, pass, age, weight, height, sex, obj, xp, routine_id)
VALUES (1, 'João Silva', 'joao123', 'senha123', 30, 75, 180, 'M', 'Hipertrofia', 500, 2);

INSERT INTO routine (id, user_creator_id)
VALUES (1, 1);
