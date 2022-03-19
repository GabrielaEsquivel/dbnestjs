
// this document contains the database module where you config the user
// paswd, port, name db and all the necessary data to connect to your db
// this module extract the data from the config service file 
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { UserEntity } from '../auth/user.entity';
import { DocumentEntity } from "../documents/document.entity";
import { CustomerEntity } from "../customer/customer.entity";
// import all entities classes
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: configService.get<string>('database.type'),
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.name'),
                synchronize: configService.get<boolean>('database.synchronize'),
                //dropSchema: true,
                entities: [
                    UserEntity,
                    DocumentEntity,
                    CustomerEntity,
                    // all entities imported
                ],
                
            } as TypeOrmModuleOptions)
        } as TypeOrmModuleAsyncOptions)
    ]
})

export class DatabaseModule { }