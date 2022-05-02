import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Users } from './entities/users.entity';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Get('all')
  getAllUsers() {
    return this.userServices.findAll();
  }

  @Get('current')
  getMe(@GetUser() user: Users) {
    return user;
  }

  @Get('search')
  searchUsers(@Query() query) {
    return this.userServices.search(query);
  }

  @Get(':uuid')
  getEachUser(@Param('uuid') uuid) {
    return this.userServices.findByUuid(uuid);
  }

  @Patch()
  editUser(@GetUser('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userServices.updateById(id, dto);
  }

  @Delete(':uuid')
  deleteUser(@Param('uuid') uuid) {
    return this.userServices.removeByUuid(uuid);
  }
}
