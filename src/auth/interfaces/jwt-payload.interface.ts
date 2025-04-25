import { ExternalUserAuthenticated } from './external-user-authenticated';
import { UserAuthenticated } from './user-authenticated';

export type JwtPayload = UserAuthenticated | ExternalUserAuthenticated;
