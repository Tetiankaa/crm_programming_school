import { ManagerEntity } from '../../../database/entities/manager.entity';
import { BaseManagerResDto } from '../dto/res/base-manager.res.dto';
import { TimeHelper } from '../../../common/helpers/time.helper';

export class ManagerMapper {
  public static toDto(entity: ManagerEntity): BaseManagerResDto {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      surname: entity.surname,
      is_active: entity.is_active,
      last_login: TimeHelper.getDate(entity.last_login),
      user_role: entity.user_role,
    };
  }
}
