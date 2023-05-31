import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserEntity } from '../../../user/application/entities/user.entity';
import { UserService } from '../../../user/application/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.verifyUserLogin(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
