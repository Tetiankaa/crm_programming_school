import { EUserRole } from '../../../database/entities/enums/user-role.enum';

export interface IJwtPayload {
  manager_id: string;
  role: EUserRole;
}
