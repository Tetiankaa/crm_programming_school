import { EUserRole } from '../../../database/entities/enums/user-role.enum';

export interface IUserData {
  userId: string;
  role: EUserRole;
  deviceId: string;
  email: string;
}
