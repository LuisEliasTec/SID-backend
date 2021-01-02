import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { PermissionsGuard } from './auth/guards/permissions.guard';
import { UserPermission } from './enums/permission/user-permission.enum';
import { RequirePermissions } from './decorators/require-permissions.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  @RequirePermissions(
    UserPermission.UPDATE,
    UserPermission.CREATE,
    UserPermission.READ,
    UserPermission.DELETE,
  )
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
