import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/decorators/require-permissions.decorator';
import { Permissions } from 'src/enums/permissions.enum';
import { DataErrorMessage } from 'src/message-handling/data-error-message';
import { SuccessDeleteMessage } from 'src/message-handling/success-delete.message';
import { SuccessPostMessage } from 'src/message-handling/success-post.message';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dtos/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/create')
  @RequirePermissions(Permissions.CREATE_EMPLOYEE)
  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  async createCustomer(@Body() body: CustomerDto) {
    try {
      const createdCustomer: any = await this.customerService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdCustomer._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get('/list')
  @RequirePermissions(Permissions.READ_EMPLOYEE)
  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  async getCustomers(@Query() queryParams) {
    try {
      const CustomerList = await this.customerService.list(queryParams);
      const successRequest = new SuccessPostMessage();
      successRequest.data = CustomerList;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get(':id')
  // @RequirePermissions(Permissions.READ_EMPLOYEE)
  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  async getCustomer(@Param('id') id: string) {
    try {
      const customer: any = await this.customerService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = customer._doc;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @RequirePermissions(Permissions.DELETE_EMPLOYEE)
  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    try {
      const deletedCustomer = await this.customerService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };

      if (deletedCustomer.deletedCount === 0) {
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

  @RequirePermissions(Permissions.UPDATE_EMPLOYEE)
  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch(':id')
  async updateCustomer(@Param('id') id: string, @Body() body: CustomerDto) {
    try {
      const patchedCustomer = await this.customerService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedEmployee: patchedCustomer.nModified,
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
