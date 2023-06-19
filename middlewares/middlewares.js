function buildClause(req, res, next, filterMapping) {
  let filters;
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
    routine_id: 'routine_id'
  };

  buildClause(req, res, next, filterMapping);
}

// Para construir o filtro da rotina
function buildRoutine(req, res, next) {
  const filterMapping = {
    id: 'id',
    name: 'user_creator_id'
  };

  buildClause(req, res, next, filterMapping);
}


module.exports = {
    buildUser, buildRoutine,
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