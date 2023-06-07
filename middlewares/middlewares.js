function buildWhereUser(req, res, next) {
  const filters = req.query;
  const where = {};

  if (filters.id) {
    where.id = filters.id;
  }

  if (filters.name) {
    where.name = filters.name;
  }

  if (filters.login) {
    where.login = filters.login;
  }

  if (filters.pass) {
    where.pass = filters.pass;
  }

  if (filters.age) {
    where.age = filters.age;
  }

  if (filters.weight) {
    where.weight = filters.weight;
  }

  if (filters.height) {
    where.height = filters.height;
  }

  if (filters.sex) {
    where.sex = filters.sex;
  }

  if (filters.obj) {
    where.obj = filters.obj;
  }

  if (filters.xp) {
    where.xp = filters.xp;
  }

  if (filters.routine_id) {
    where.routine_id = filters.routine_id;
  }

  req.whereClause = where;
  next();
}

module.exports = {
    buildWhereUser,
  };