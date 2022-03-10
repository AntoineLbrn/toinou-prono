import { join } from 'path'
import { ConnectionOptions } from 'typeorm'
import { parse } from 'url'

const PROD_ENV = 'production'

const config = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
}

const url = process.env.DATABASE_URL;

const connectionOptions: ConnectionOptions = url ? {
  type: 'postgres',
  url,
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  ssl: {
    rejectUnauthorized: false
  },
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  entities: ['src/app/entities/*.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/app/entities',
    migrationsDir: 'src/database/migrations'
  }
} :  
{
  type: 'postgres',
  host: 'host.docker.internal',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'toinou-prono',
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  entities: ['src/app/entities/*.{ts,js}'],
  migrations: ['src/database/migrations/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/app/entities',
    migrationsDir: 'src/database/migrations'
  }
}

export = connectionOptions