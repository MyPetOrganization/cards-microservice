import {DataSource, DataSourceOptions} from 'typeorm'
import {config} from 'dotenv'

config()

export const dataSourceOptions:DataSourceOptions={
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    database: process.env.DB_DATABASE,
    migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
    logging: false,
    synchronize: false,
    ssl: false,
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
