import { SetMetadata } from '@nestjs/common';
import { Permissions } from '../enums/permissions.enum';

export const RequirePermissions = (...permissions: Permissions[]) =>
  SetMetadata('permissions', permissions);
