import { Sequelize } from 'sequelize-typescript';
import { Users } from 'src/modules/users/entities/users.entity';
import { Friends } from 'src/modules/friends/entities/friends.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './db.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }

      const sequelize = new Sequelize(config);

      sequelize.addModels([Users, Friends]);
      sequelize.sync().then(() => {
        console.log('Database connected!!!');
      });
      return sequelize;
    },
  },
];
