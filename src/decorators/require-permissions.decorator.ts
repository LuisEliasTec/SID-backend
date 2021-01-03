import { SetMetadata } from '@nestjs/common';
import { UserPermission } from '../enums/permission/user-permission.enum';

export const RequirePermissions = (...permissions: UserPermission[]) =>
  SetMetadata('user-permissions', permissions);
