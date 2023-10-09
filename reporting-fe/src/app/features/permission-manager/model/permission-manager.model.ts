
export class Role {
  roleId: number;
  name: string;
  permissions: Permission[] = [];

}
export class Permission {
  id: number;
  description: string;
  name: string;

}
