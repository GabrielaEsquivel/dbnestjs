import { ApiProperty } from '@nestjs/swagger';
import {  IsNotEmpty, IsString } from 'class-validator';

export default class ChangePasswordRequest {
  

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    public password: string;
}; 
