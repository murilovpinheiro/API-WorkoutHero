function buildUser(req, res, next) {
  let filters;
  if (Object.keys(req.query).length === 0) {
    filters = req.body 
  }
  else{
    filters = req.query;
  }
  const clause = {};

  if (filters.id) {
    clause.id = filters.id;
  }

  if (filters.name) {
    clause.name = filters.name;
  }

  if (filters.login) {
    clause.login = filters.login;
  }

  if (filters.pass) {
    clause.pass = filters.pass;
  }

  if (filters.age) {
    clause.age = filters.age;
  }

  if (filters.weight) {
    clause.weight = filters.weight;
  }

  if (filters.height) {
    clause.height = filters.height;
  }

  if (filters.sex) {
    clause.sex = filters.sex;
  }

  if (filters.obj) {
    clause.obj = filters.obj;
  }

  if (filters.xp) {
    clause.xp = filters.xp;
  }

  if (filters.routine_id) {
    clause.routine_id = filters.routine_id;
  }

  req.clause = clause;
  next();
}

module.exports = {
    buildUser,
  };