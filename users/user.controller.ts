import { 
    Body,
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    Param, 
    Post,
    Query,
    Put,
    Patch,
    UseGuards
} from '@nestjs/common';
import { 
    ApiBadRequestResponse, 
    ApiBody, 
    ApiForbiddenResponse, 
    ApiOkResponse, 
    ApiOperation, 
    ApiTags 
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import  UserResource from "./resources/user.resource";
import CreateUserRequest from './request/create-user.request';
import UpdateUserRequest from './request/update-user.request';
import  ChangePasswordRequest  from "./request/change-password.request";
import ResultPagedResource from 'src/common/resources/result-paged.resource';

@ApiTags('User')
@Controller('user')
export class UserController {
    public constructor(
        private userService: UserService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('')
    @HttpCode(200)
    @ApiOperation({ description: 'Create customer' })
    @ApiBody({ type: CreateUserRequest, required: true })
    @ApiOkResponse({ description: 'OK', type: UserResource })
    @ApiForbiddenResponse({ description: 'Unauthenticated admin' })
    @ApiBadRequestResponse({ description: 'User schema is invalid' })
    public create(@Body() request: CreateUserRequest): Promise<UserResource> {
        return this.userService.create(
            request.name,
            request.email,
            request.role,
            request.password,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:userId')
    @HttpCode(200)
    @ApiOperation({ description: 'Update user' })
    @ApiBody({ type: UpdateUserRequest, required: true })
    @ApiOkResponse({ description: 'OK', type: UserResource })
    @ApiForbiddenResponse({ description: 'Unauthenticated admin' })
    @ApiBadRequestResponse({ description: 'User schema is invalid' })
    public update(
        @Param('userId') userId: string,
        @Body() request: UpdateUserRequest
    ): Promise<UserResource> {
        return this.userService.update(
            userId,
            request.name
        );
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:userId')
    @HttpCode(200)
    @ApiBody({ type: ChangePasswordRequest, required: true })
    @ApiOperation({ description: 'Remove user' })
    @ApiOkResponse({ description: 'OK', type: UserResource })
    @ApiForbiddenResponse({ description: 'Unauthenticated admin' })
    public patch(
        @Param('userId') userId: string,
        @Body() request: ChangePasswordRequest
    ): Promise<UserResource> {
        return this.userService.patch(
            userId,
            request.password
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:userId')
    @HttpCode(200)
    @ApiOperation({ description: 'Remove user' })
    @ApiOkResponse({ description: 'OK', type: UserResource })
    @ApiForbiddenResponse({ description: 'Unauthenticated admin' })
    public delete(
        @Param('userId') userId: string
    ): Promise<UserResource> {
        return this.userService.delete(
            userId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:userId')
    @HttpCode(200)
    @ApiOperation({ description: 'Get customer by id' })
    @ApiOkResponse({ description: 'OK', type: UserResource })
    @ApiForbiddenResponse({ description: 'Unauthenticated admin' })
    public get(
        @Param('userId') userId: string,
    ): Promise<UserResource> {
        return this.userService.get(
            userId
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(200)
    @ApiOperation({ description: 'Get all user' })
    @ApiOkResponse({ description: 'OK', type: ResultPagedResource })
    @ApiForbiddenResponse({ description: 'Unauthenticated admin' })
    public getAll(
        @Query("page") page: number,
        @Query("limit") limit: number
    ): Promise<ResultPagedResource<UserResource[]>> {
        return this.userService.getAll(
            page,
            limit
        );
    }
}
