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
import { EmployeeDto } from './dtos/employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/create')
  async createEmployee(@Body() body: EmployeeDto) {
    try {
      const createdEmployee: any = await this.employeeService.create(body);
      const successRequest = new SuccessPostMessage();
      successRequest.data = createdEmployee._doc;
      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get('/list')
  async getEmployees() {
    try {
      const EmployeeList = await this.employeeService.list();
      const successRequest = new SuccessPostMessage();
      successRequest.data = EmployeeList;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Get(':id')
  async getEmployee(@Param('id') id: string) {
    try {
      const employee: any = await this.employeeService.findById(id);
      const successRequest = new SuccessPostMessage();
      successRequest.data = employee._doc;

      return successRequest;
    } catch (e) {
      const errorException = new DataErrorMessage();
      errorException.errorData = e;

      return errorException;
    }
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: string) {
    try {
      const deletedEmployee = await this.employeeService.delete(id);
      const successRequest = new SuccessDeleteMessage();
      successRequest.data = { _id: id };

      if (deletedEmployee.deletedCount === 0) {
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
  async updateEmployee(@Param('id') id: string, @Body() body: EmployeeDto) {
    try {
      const patchedEmployee = await this.employeeService.update(id, body);
      const successRequest = new SuccessPostMessage();
      const modifiedData = {
        updatedEmployee: patchedEmployee.nModified,
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
