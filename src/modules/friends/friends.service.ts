import { Injectable, Inject } from '@nestjs/common';
import { Friends } from './entities/friends.entity';
import { FriendDto } from './dto/friend.dto';
import { FRIEND_REPOSITORY } from 'src/core/constants';
import { Op } from 'sequelize';

@Injectable()
export class FriendsService {
  constructor(
    @Inject(FRIEND_REPOSITORY)
    private readonly friendRepository: typeof Friends,
  ) {}

  async createRequest(userId, friendDto: FriendDto) {
    const alreadyDoneRequest = await this.friendRepository.findAll({
      where: {
        [Op.or]: [
          { [Op.and]: [{ userId: userId }, { friendId: friendDto.friendId }] },
          { [Op.and]: [{ userId: friendDto.friendId }, { friendId: userId }] },
        ],
      },
    });

    if (alreadyDoneRequest.length) {
      return { msg: 'Request already sent.' };
    }
    return await this.friendRepository.create(
      { userId, friendId: friendDto.friendId },
      { returning: true },
    );
  }

  async findAll(id) {
    const friends = await this.friendRepository.findAll({
      where: { [Op.or]: [{ userId: id }, { friendId: id }], status: true },
    });
    if (!friends.length) {
      return { sumsg: 'There are no friends yet' };
    }
    return { count: friends.length, friends };
  }

  async findAllRequests(id) {
    const requests = await this.friendRepository.findAll({
      where: { friendId: id, status: false },
    });
    if (!requests.length) {
      return { msg: 'There are no friend requeste yet' };
    }
    return requests;
  }

  async updateRequest(id, friendDto: FriendDto) {
    return await this.friendRepository.update(
      { status: true },
      { where: { userId: friendDto.friendId, friendId: id }, returning: true },
    );
  }

  async removeFriend(id, friendDto: FriendDto) {
    const friend = await this.friendRepository.findOne({
      where: {
        [Op.or]: [
          { userId: friendDto.friendId, friendId: id },
          { userId: id, friendId: friendDto.friendId },
        ],
        status: true,
      },
    });
    friend.destroy();
    return friend;
  }

  async removeRequest(id, friendDto) {
    const friendRequest = await this.friendRepository.findOne({
      where: { friendId: id, userId: friendDto.friendId, status: false },
    });
    if (!friendRequest) {
      return { msg: 'No requests to remove.' };
    }
    friendRequest.destroy();
    return friendRequest;
  }
}
