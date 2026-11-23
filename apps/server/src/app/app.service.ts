import { Injectable } from '@nestjs/common';
import type { HealthResponseDto } from '@pim/dtos';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  async getData(): Promise<HealthResponseDto> {
    let database: HealthResponseDto['database'] = 'down';
    try {
      await this.dataSource.query('SELECT 1');
      database = 'up';
    } catch {
      database = 'down';
    }
    return {
      message: 'Hello API',
      database,
      timestamp: new Date().toISOString(),
    };
  }
}
