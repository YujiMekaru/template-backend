import 'dotenv/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    DB_ENTITIES,
    DB_MIGRATIONS,
} = process.env;

const databaseOptions: PostgresConnectionOptions = {
    type: 'postgres',
    database: DB_DATABASE,
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    entities: [DB_ENTITIES],
    migrations: [DB_MIGRATIONS],
    synchronize: false,
    logging: true,
};

export default databaseOptions;
