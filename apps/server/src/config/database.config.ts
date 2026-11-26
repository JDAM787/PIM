import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/**
 * Conexión a Postgres a partir de variables de entorno.
 */
export function databaseConfig(config: ConfigService): TypeOrmModuleOptions {
  const url = config.get<string>('DATABASE_URL');
  const ssl = config.get<string>('DB_SSL') === 'true';

  return {
    type: 'postgres',
    ...(url
      ? { url }
      : {
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '5432')),
        username: config.get<string>('DB_USER', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.get<string>('DB_NAME', 'pim'),
      }),
    ssl: ssl ? { rejectUnauthorized: false } : false,
    autoLoadEntities: true,
    // El esquema se gestiona con SQL en Supabase; nunca sincronizar desde TypeORM.
    synchronize: false,
  };
}
