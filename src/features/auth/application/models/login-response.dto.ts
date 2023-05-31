import { UserEntity } from '../../../user/application/entities/user.entity';

export class LoginResponseDto {
  user: UserEntity;
  token: string;

  constructor(user: UserEntity, token: string) {
    this.user = user;
    this.token = token;
  }
}
