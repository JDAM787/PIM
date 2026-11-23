import { Controller, Get } from '@nestjs/common';
import type { HealthResponseDto } from '@pim/dtos';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): Promise<HealthResponseDto> {
    return this.appService.getData();
  }
}
