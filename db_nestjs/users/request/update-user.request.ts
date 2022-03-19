import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateUserRequest {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    public name: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    public role: string;
}
