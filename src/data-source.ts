import "reflect-metadata";
import { DataSource } from 'typeorm';
import * as path from 'path';
import { config } from "dotenv";
config(); 

import { Word } from './word/entities/word.entity';
import { User } from './user/entities/user.entity';
import { UserQuestion } from './user-question/entities/user-question.entity';
import { Question } from './question/entities/question.entity';
import { DailyQuestionHistory } from "./daily-question-history/entities/daily-question-history.entity";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,  
  logging: true,
  entities: [User, Word, Question, UserQuestion, DailyQuestionHistory], 
  migrations: [path.join(__dirname, 'migrations/*.{ts,js}')], 
  subscribers: [],
});
