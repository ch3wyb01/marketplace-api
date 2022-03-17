import { Controller, Get } from '@nestjs/common';
import endpointsDesc from './endpoints.json';

@Controller()
export class ApiController {
  constructor() {}

  @Get()
  getEndpoints() {
    const endpoints = endpointsDesc;
    return endpoints;
  }
}
