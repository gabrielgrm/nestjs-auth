import { Injectable, Scope } from '@nestjs/common';
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, Subjects } from '@casl/prisma';
import { Post, Roles, User } from '@prisma/client';

export type PermActions = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type PermissionResource = Subjects<{ User: User; Post: Post }> | 'all';

export type AppAbility = PureAbility<[PermActions, PermissionResource]>;

export type DefinePermissions = {
  user: User;
  builder: (builder: AbilityBuilder<AppAbility>) => void;
};

const rolePermissionsMap: Record<Roles, DefinePermissions> = {
  ADMIN: {
    user: {} as User,
    builder: ({ can }) => {
      can('manage', 'all');
    },
  },
  EDITOR: {
    user: {} as User,
    builder: ({ can }) => {
      can('read', 'all');
      can('update', 'Post', { authorId: {} as User['id'] });
      can('create', 'Post', { authorId: {} as User['id'] });
    },
  },
  WRITER: {
    user: {} as User,
    builder: ({ can }) => {
      can('read', 'all');
      can('update', 'Post', { authorId: {} as User['id'] });
      can('create', 'Post', { authorId: {} as User['id'] });
    },
  },
  READER: {
    user: {} as User,
    builder: ({ can }) => {
      can('read', 'all');
    },
  },
};

@Injectable({ scope: Scope.REQUEST })
export class CaslAbilityService {
  ability: AppAbility;

  createForUser(user: User) {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
    rolePermissionsMap[user.role].builder(builder);
    this.ability = builder.build();
    return this.ability;
  }
}
