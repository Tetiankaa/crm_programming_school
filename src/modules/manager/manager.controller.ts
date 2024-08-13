import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('managers')
@ApiTags('Managers')
export class ManagerController {

  constructor() {
  }
}
