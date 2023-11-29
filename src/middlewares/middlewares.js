function buildClause(req, res, next, filterMapping) {
  let filters;
  console.log(req.query);
  if (Object.keys(req.query).length === 0) {
    filters = req.body;
  } else {
    filters = req.query;
  }

  const clause = {};

  for (const filterKey in filterMapping) {
    if (filters[filterKey]) {
      clause[filterMapping[filterKey]] = filters[filterKey];
    }
  }

  req.clause = clause;
  next();
}

// Para construir o filtro do usuário
function buildToken(req, res, next) {
  const filterMapping = {
    login: 'login',
    pass: 'pass',
    passResetToken: 'passResetToken'
  };

  buildClause(req, res, next, filterMapping);
}

function buildStatus(req, res, next) {
  const filterMapping = {
    login: 'login',
    exercisesRealized: 'exercisesRealized',
    repsRealized: 'repsRealized'
  };

  buildClause(req, res, next, filterMapping)
}

function buildUser(req, res, next) {
  const filterMapping = {
    id: 'id',
    name: 'name',
    login: 'login',
    pass: 'pass',
    age: 'age',
    weight: 'weight',
    height: 'height',
    sex: 'sex',
    obj: 'obj',
    xp: 'xp',
    //routine_id: 'routine_id'
  };

  buildClause(req, res, next, filterMapping);
}

// Para construir o filtro da rotina
function buildRoutine(req, res, next) {
  const filterMapping = {
    id: 'id',
    user_creator_id: 'user_creator_id'
  };

  buildClause(req, res, next, filterMapping);
}

// Para construir o filtro do exercicio
function buildExercise(req, res, next) {
  const filterMapping = {
    id: 'id',
    name: 'user_creator_id',
    difficulty: 'difficulty',
    sets: 'sets',
    reps: 'reps',
    weight: 'weight',
    obj: 'obj',
    reps_progress: 'reps_progress',
    weight_progress: 'weight_progress',
    rest: 'rest',
    muscles: 'muscles',
    body_part: 'body_part'
  };

  buildClause(req, res, next, filterMapping);
}

function buildExercisePage(req, res, next) {
  const filterMapping = {
    id: 'id',
    name: 'user_creator_id',
    difficulty: 'difficulty',
    sets: 'sets',
    reps: 'reps',
    weight: 'weight',
    obj: 'obj',
    reps_progress: 'reps_progress',
    weight_progress: 'weight_progress',
    rest: 'rest',
    muscles: 'muscles',
    body_part: 'body_part',
    offset: 'offset',
    limit: 'limit'
  };

  buildClause(req, res, next, filterMapping);
}

// Para construir o filtro do histórico
function buildHistoric(req, res, next) {
  const filterMapping = {
    id: 'id',
    user_id: 'user_id',
    days_trained: 'days_trained',
    weights_lifted: 'weights_lifted',
    reps_done: 'reps_done',
    time_training: 'time_training'
  };

  buildClause(req, res, next, filterMapping);
}

// Para construir o filtro do muscular_group_exercise
function buildMuscularGroupExercise(req, res, next) {
  const filterMapping = {
    id: 'id',
    muscular_group_id: 'muscular_group_id',
    exercise_id: 'exercise_id'
  };

  buildClause(req, res, next, filterMapping);
}

// Para construir o filtro do muscular_group
function buildMuscularGroup(req, res, next) {
  const filterMapping = {
    id: 'id',
    name: 'name'
  };

  buildClause(req, res, next, filterMapping);
}

// Para construir o filtro do routine_workouts
function buildRoutineWorkouts(req, res, next) {
  const filterMapping = {
    id: 'id',
    routine_id: 'routine_id',
    workout_id: 'workout_id'
  };

  buildClause(req, res, next, filterMapping);
}

// Para construir o filtro do workout_exercise
function buildWorkoutExercise(req, res, next) {
  const filterMapping = {
    id: 'id',
    workout_id: 'workout_id',
    exercise_id: 'exercise_id'
  };

  buildClause(req, res, next, filterMapping);
}

// Para construir o filtro do workout_realized
function buildWorkoutRealized(req, res, next) {
  const filterMapping = {
    id: 'id',
    date_ : 'date_',
    duration: 'duration',
    workout_id: 'workout_id',
    historic_id: 'historic_id'
  };

  buildClause(req, res, next, filterMapping);
}

// Para construir o filtro do workout
function buildWorkout(req, res, next) {
  const filterMapping = {
    id: 'id',
    difficulty: 'difficulty',
    obj: 'obj',
    user_id:'user_id'
  };

  buildClause(req, res, next, filterMapping);
}


module.exports = {
    buildUser, 
    buildRoutine, 
    buildExercise, 
    buildExercisePage,
    buildHistoric, 
    buildMuscularGroupExercise,
    buildMuscularGroup, 
    buildRoutineWorkouts,
    buildWorkoutExercise,
    buildWorkoutRealized,
    buildWorkout,
    buildToken,
    buildStatus
  };

  // function buildUser(req, res, next) {
//   let filters;
//   if (Object.keys(req.query).length === 0) {
//     filters = req.body 
//   }
//   else{
//     filters = req.query;
//   }
//   const clause = {};

//   if (filters.id) {
//     clause.id = filters.id;
//   }

//   if (filters.name) {
//     clause.name = filters.name;
//   }

//   if (filters.login) {
//     clause.login = filters.login;
//   }

//   if (filters.pass) {
//     clause.pass = filters.pass;
//   }

//   if (filters.age) {
//     clause.age = filters.age;
//   }

//   if (filters.weight) {
//     clause.weight = filters.weight;
//   }

//   if (filters.height) {
//     clause.height = filters.height;
//   }

//   if (filters.sex) {
//     clause.sex = filters.sex;
//   }

//   if (filters.obj) {
//     clause.obj = filters.obj;
//   }

//   if (filters.xp) {
//     clause.xp = filters.xp;
//   }

//   if (filters.routine_id) {
//     clause.routine_id = filters.routine_id;
//   }

//   req.clause = clause;
//   next();
// }

// //  DEPOIS TENTAR DEIXAR TUDO ADAPTADO NO USER

// function buildRoutine(req, res, next) {
//   let filters;
//   if (Object.keys(req.query).length === 0) {
//     filters = req.body 
//   }
//   else{
//     filters = req.query;
//   }
//   const clause = {};

//   if (filters.id) {
//     clause.id = filters.id;
//   }

//   if (filters.name) {
//     clause.user_creator_id = filters.user_creator_id;
//   }
  
//   req.clause = clause;
//   next();
// }