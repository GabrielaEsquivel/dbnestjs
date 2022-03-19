import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CREATED_CUSTOMER } from 'src/common/constants/sendgrid.constant';
import { UserEntity, ROLE } from 'src/auth/user.entity';
import { UserRepository } from './user.repository';
import UserResource from './resources/user.resource';
import ResultPagedResource from 'src/common/resources/result-paged.resource';
@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }
 
    public async create(
        name: string,
        email: string,
        rol: string,
        password: string,
        
    ): Promise<UserResource> {

        const user: UserEntity = new UserEntity();
        user.name = name; 
        user.email = email;
        user.password = password;
        user.role = this.getRol(rol);
        if(user.role!=ROLE.ROLE_CLIENTE) user.isValid = true; 
        await this.userRepository.save(user);
        await this.sendGridService.send({
            to: user.email,
            subject: "",
            template: CREATED_CUSTOMER,
            data: {
                email: user.email,
                password: password,
                subject: 'Cuenta creada en Aro Administrativo'
            }
         });

        return plainToClass(UserResource, user);
    }

    public async update(
        userId: string,
        name: string,
    ): Promise<UserResource> {
        const user: UserEntity = await this.userRepository.findOne({
            where: { id: userId, deleted: false }
        });
        if (!user) {
            throw new NotFoundException(`Not found user with id ${userId}`);
        }

        user.name = name; 
        await this.userRepository.save(user);

        return plainToClass(UserResource, user);
    }

    public async patch(
        userId: string,
        password: string,
    ): Promise<UserResource> {
        const user: UserEntity = await this.userRepository.findOne({
            where: { id: userId, deleted: false }
        });
        if (!user) {
            throw new NotFoundException(`Not found user with id ${userId}`);
        }

        user.password = password; 
        user.beforeInsert(); 
        await this.userRepository.save(user);
        this.sendGridService.send({
            to: user.email,
            subject: "",
            template: CREATED_CUSTOMER,
            data: {
                email: user.email,
                password: password,
                subject: 'Cambio de contraseña exitoso'
            }
         });

        return plainToClass(UserResource, user);
    }
    public async get(
        userId: string
    ): Promise<UserResource> {
        const user: UserEntity = await this.userRepository.findOne({
            where: { id: userId, deleted: false }
        });
        if (!user) {
            throw new NotFoundException(`Not found user with id ${userId}`);
        }

        return plainToClass(UserResource, user);
    }

    public async validateUser(
        userId: string
    ): Promise<UserResource> {
        const user: UserEntity = await this.userRepository.findOne({
            where: { id: userId, deleted: false }
        });
        if (!user) {
            throw new NotFoundException(`Not found user with id ${userId}`);
        }
        user.isValid = true; 
        this.userRepository.save(user); 
        return plainToClass(UserResource, user);
    }

    public async delete(
        userId: string, 
    ): Promise<UserResource> {
        const user: UserEntity = await this.userRepository.findOne({
            where: { id: userId, deleted: false }
        });
        if (!user) {
            throw new NotFoundException(`Not found user with id ${userId}`);
        }

        user.deleted = true;
        user.deletedAt = new Date();
        await this.userRepository.save(user);

        return plainToClass(UserResource, user);

    }

    public async getAll(
        page: number,
        limit: number
    ): Promise<ResultPagedResource<UserResource[]>> {
        const [results, count] = <[UserEntity[], number]>await this.userRepository.findAndCount({
            where: {deleted: false },
            order: { createdAt: 'DESC' }
        });
        return {
            elements: results.map((user: UserEntity) => plainToClass(UserResource, user)),
            totalElements: count
        }
    }
}
