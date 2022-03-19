import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserRepository,
    ]),
   
  ],
  controllers: [UserController],
  providers: [UserService, SendGridService]
})
export class UserModule {}
