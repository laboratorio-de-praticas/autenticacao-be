import { UserAuthenticated } from './user-authenticated';

export interface UserAuthenticatedRequest extends Request {
  user: UserAuthenticated;
}
