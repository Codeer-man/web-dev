import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../entities/user.entities';

//* check auth user role version

// uniques identifier for storing  and retriving roles requirement as metadata in the routes handlers

export const USER_ROLE = 'roles';

//roles decorates marks the routes with the role that are allowed to access them
//role guard reads the metadata and checks if the user has permission

export const Roles = (...role: UserRole[]) => SetMetadata(USER_ROLE, role);
