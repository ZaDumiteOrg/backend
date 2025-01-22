import { DataSource } from 'typeorm';
import { Word } from './word/entities/word.entity';
import { User } from './user/entities/user.entity';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost', 
  port: 3306, 
  username: 'root', 
  password: 'root', 
  database: 'zadumite',
  synchronize: false,
  logging: true,
  entities: [User, Word], 
  migrations: [path.join(__dirname, 'migrations/*.{ts,js}')], 
  subscribers: [],
});
