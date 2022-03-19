import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export default class CreateUserRequest {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    public name: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    public role: string;

    @ApiProperty({ type: String })
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    public password: string;
}; 
