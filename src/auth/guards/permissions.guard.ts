import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from 'src/entities/role/models/permission.schema';
import { UserService } from 'src/entities/user/user.service';
import { Permissions } from 'src/enums/permissions.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Permissions[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const foundUser = await this.userService.findById(user.userId);

    if (!foundUser) {
      return false;
    }

    return requiredRoles.some((role: string) =>
      foundUser
        .get('role')
        .get('permissions')
        .some((i: Permission) => i.slug === role),
    );
  }
}
