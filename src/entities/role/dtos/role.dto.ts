export class RoleDto {
  name: string;
  description: string;
}

export class AddPermissionsDto {
  module: string;
  permissions: string[];
}
