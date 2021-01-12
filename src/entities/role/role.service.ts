import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { PermissionDto } from './dtos/permission.dto';
import { RoleDto } from './dtos/role.dto';
import { Permission, PermissionDocument } from './models/permission.schema';
import { Role, RoleDocument } from './models/role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  //====== Roles ======//
  async addRoleToUser(roleid: string, userid: string): Promise<any> {
    const updatedUser = await this.userModel.updateOne(
      { _id: userid },
      { role: roleid },
    );

    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${userid}" not found.`);
    }

    return updatedUser;
  }

  //====== Permissions ======//
  async createPermission(createPermission: PermissionDto): Promise<Permission> {
    const createdPermission = new this.permissionModel(createPermission);

    return createdPermission.save();
  }

  async addPermissionToRole(roleId: string, body: any): Promise<Permission> {
    try {
      const permissionsNoFalse = body.permissions.filter((i) => i !== false);

      const permssiobByModuleInRole = await this.roleModel.aggregate([
        {
          $lookup: {
            from: 'permissions',
            localField: 'permissions',
            foreignField: '_id',
            as: 'populedPermissions',
          },
        },
        {
          $unwind: {
            path: '$populedPermissions',
          },
        },
        {
          $match: {
            'populedPermissions.module': body.module,
          },
        },
        {
          $addFields: {
            name: '$populedPermissions.name',
            module: '$populedPermissions.module',
            slug: '$populedPermissions.slug',
            _id: '$populedPermissions._id',
          },
        },
        {
          $project: {
            permissions: 0,
            populedPermissions: 0,
          },
        },
        {
          $match: {
            _id: {
              $nin: [...permissionsNoFalse],
            },
          },
        },
      ]);

      // Remove permissions that does not appear in incoming array
      await this.roleModel.updateOne(
        { _id: roleId },
        {
          $pull: {
            permissions: {
              $in: [...permssiobByModuleInRole],
            },
          },
        },
      );

      const updatedRole = await this.roleModel.updateOne(
        { _id: roleId },
        {
          $addToSet: {
            permissions: { $each: permissionsNoFalse },
          },
        },
      );
      return updatedRole;
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }

  public async permissionListByModule(module: string): Promise<Permission[]> {
    const permissions = await this.permissionModel.find({ module });
    return permissions;
  }

  //====== Roles ======//

  async create(createRolDto: RoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRolDto);
    return createdRole.save();
  }

  async list(): Promise<Role[]> {
    return this.roleModel.find().populate('permissions').exec();
  }

  async findById(id): Promise<Role> {
    return this.roleModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.roleModel.deleteOne({ _id: id }).exec();
  }

  async update(id: string, updateTurnDto: RoleDto) {
    return this.roleModel.updateOne({ _id: id }, updateTurnDto).exec();
  }
}
