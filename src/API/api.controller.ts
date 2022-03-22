import { Controller, Get } from '@nestjs/common';
import { endpoints } from './endpoints';

@Controller()
export class ApiController {
  constructor() {}

  @Get()
  getEndpoints() {
    return { endpoints };
  }
}
