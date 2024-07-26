import { User } from 'src/users/entities/user.entity';

export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}
