import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DataErrorMessage } from 'src/message-handling/data-error-message';
import { SuccessDeleteMessage } from 'src/message-handling/success-delete.message';
import { SuccessPostMessage } from 'src/message-handling/success-post.message';
import { AddPermissionsDto, RoleDto } from './dtos/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  //====== Users ======//
  @Patch('/:roleid/add-to-user/:userid')
  async addRoleToUser(
    @Param('roleid') roleid: string,
    @Param('userid') userid: string,
  ) {
    try {
      const createdPermission: any = await this.roleService.addRoleToUser(
        roleid,
        userid,
      );

      const successRequest = new SuccessPostMessage();
      successRequest.data = createdPermission._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  //====== Permissions =======//
  @Patch('/add/permission/:id')
  async addPermissionToRole(
    @Param('id') id: string,
    @Body() body: AddPermissionsDto,
  ) {
    try {
      const createdPermission: any = await this.roleService.addPermissionToRole(
        id,
        body,
      );

      const successRequest = new SuccessPostMessage();
      successRequest.data = createdPermission._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get('permission/list/:module')
  async permissionListByModule(@Param('module') module: string) {
    try {
      const createdPermission: any = await this.roleService.permissionListByModule(
        module,
      );

      const successRequest = new SuccessPostMessage();
      successRequest.data = createdPermission;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  //====== Roles ======//
  @Post('/create')
  async createRole(@Body() body: RoleDto) {
    try {
      const createdRole: any = await this.roleService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdRole._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get('/list')
  async getRoles(@Query('searchTerm') searchTerm: string) {
    try {
      const RoleList = await this.roleService.list(searchTerm);
      const successRequest = new SuccessPostMessage();
      successRequest.data = RoleList;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get(':id')
  async getRole(@Param('id') id: string) {
    try {
      const role: any = await this.roleService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = role._doc;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    try {
      const deletedRole = await this.roleService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };

      if (deletedRole.deletedCount === 0) {
        successRequest.customMessage = 'zero';
      }

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();

      if (e.kind === 'ObjectId') {
        errorException.message = e.reason.message;
      } else {
        errorException.errorData = e;
      }

      return errorException;
    }
  }

  @Patch(':id')
  async updateRole(@Param('id') id: string, @Body() body: RoleDto) {
    try {
      const patchedRole = await this.roleService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedRole: patchedRole.nModified,
        requestedId: id,
      };

      successRequest.data = modifiedData;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }
}
