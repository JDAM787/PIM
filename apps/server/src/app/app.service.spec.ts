import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  const query = jest.fn();

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService, { provide: DataSource, useValue: { query } }],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  it('reports the database as up when the query succeeds', async () => {
    query.mockResolvedValueOnce([{ '?column?': 1 }]);
    await expect(service.getData()).resolves.toMatchObject({
      message: 'Hello API',
      database: 'up',
    });
  });

  it('reports the database as down when the query fails', async () => {
    query.mockRejectedValueOnce(new Error('connection refused'));
    await expect(service.getData()).resolves.toMatchObject({
      database: 'down',
    });
  });
});
