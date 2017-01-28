import * as models from './all'
import Sequelize from 'sequelize'
import configs from '../config/config.json'
import _ from 'lodash'

const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable])
  : new Sequelize(config.database, config.username, config.password, config);
const db = {};

_.each(models, (model, name)=> {
  db[name] = model(sequelize, Sequelize);
});
_.each(db, model=> {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;