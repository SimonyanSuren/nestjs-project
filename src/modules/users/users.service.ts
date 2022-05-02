import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Sequelize, Op } from 'sequelize';
import { Users } from './entities/users.entity';
import { USER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof Users,
  ) {}

  async findAll() {
    const users = await this.userRepository.findAll({});
    if (!users.length) {
      return { msg: 'Users do not exist' };
    }
    return { count: users.length, users };
  }

  async findOneByEmail(email) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findByUuid(uuid) {
    const user = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateById(id, dto) {
    const user = await this.userRepository.update(dto, {
      returning: true,
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }

  async removeByUuid(uuid) {
    const user = await this.userRepository.findOne({
      where: {
        uuid,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    user.destroy();
    return user;
  }

  async search(searchtext) {
    const { name, lastname, minAge, maxAge } = searchtext;
    const user = await this.userRepository.findAll({
      where: {
        age: {
          [Op.between]: [minAge, maxAge],
        },
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn(
              'concat',
              Sequelize.col('name'),

              Sequelize.col('lastname'),
            ),
            {
              [Op.iLike]: {
                [Op.any]: [`%${name}%`, `%${lastname}%`],
              },
            },
          ),
        ],
      },
    });
    if (!user.length) {
      throw new NotFoundException();
    }
    return user;
  }
}
