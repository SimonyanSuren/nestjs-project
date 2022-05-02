import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { friendsProviders } from './friends.provider';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService, ...friendsProviders],
})
export class FriendsModule {}
