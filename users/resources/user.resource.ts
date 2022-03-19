import { ApiProperty } from '@nestjs/swagger';

export default class UserResource {
    @ApiProperty({ type: String })
    public name: string;

    @ApiProperty({ type: String })
    public role: string;

    @ApiProperty({ type: String })
    public email: string;

    @ApiProperty({ type: String })
    public id: string;
    
    @ApiProperty({ type: String })
    public password: string;

    
    
}
    