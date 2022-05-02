import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator/getUser.decorator';

@UseGuards(JwtGuard)
@Controller('friend')
export class FriendsController {
  constructor(private readonly friendServices: FriendsService) {}

  @Post('sendRequest')
  sendFriendRequest(@Body() friendDto, @GetUser() user) {
    return this.friendServices.createRequest(user.id, friendDto);
  }

  @Get('all')
  findAllFriends(@GetUser() user) {
    return this.friendServices.findAll(user.id);
  }

  @Get('requests')
  findRequests(@GetUser() user) {
    return this.friendServices.findAllRequests(user.id);
  }

  @Patch('approveRequest')
  approveRequest(@GetUser() user, @Body() friendDto) {
    return this.friendServices.updateRequest(user.id, friendDto);
  }

  @Delete('removeFriend')
  removeFriend(@GetUser() user, @Body() friendDto) {
    return this.friendServices.removeFriend(user.id, friendDto);
  }

  @Delete('removeFriendRequest')
  removeRequest(@GetUser() user, @Body() friendDto) {
    return this.friendServices.removeRequest(user.id, friendDto);
  }
}
