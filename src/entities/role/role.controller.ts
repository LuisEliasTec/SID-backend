import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DataErrorMessage } from 'src/message-handling/data-error-message';
import { SuccessDeleteMessage } from 'src/message-handling/success-delete.message';
import { SuccessPostMessage } from 'src/message-handling/success-post.message';
import { PermissionDto } from './dtos/permission.dto';
import { AddPermissionsDto, RoleDto } from './dtos/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Patch('/add/permission/:id')
  async addPermissionToRole(
    @Param('id') id: string,
    @Body() body: AddPermissionsDto,
  ) {
    try {
      const createdPermission: any = await this.roleService.addPermissionToRole(
        id,
        body.permissions,
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

  @Post('/create/permission')
  async createTurnPermission(@Body() body: PermissionDto) {
    try {
      const createdPermission: any = await this.roleService.createPermission(
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

  //====== Roles ======//
  @Post('/create')
  async createTurn(@Body() body: RoleDto) {
    try {
      const createdTurn: any = await this.roleService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdTurn._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get('/list')
  async getTurns() {
    try {
      const TurnList = await this.roleService.list();
      const successRequest = new SuccessPostMessage();
      successRequest.data = TurnList;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get(':id')
  async getTurn(@Param('id') id: string) {
    try {
      const turn: any = await this.roleService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = turn._doc;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Delete(':id')
  async deleteTurn(@Param('id') id: string) {
    try {
      const deletedTurn = await this.roleService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };

      if (deletedTurn.deletedCount === 0) {
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
  async updateTurn(@Param('id') id: string, @Body() body: RoleDto) {
    try {
      const patchedTurn = await this.roleService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedTurn: patchedTurn.nModified,
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
