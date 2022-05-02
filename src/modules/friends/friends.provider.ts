import { Friends } from './entities/friends.entity';
import { FRIEND_REPOSITORY } from '../../core/constants';

export const friendsProviders = [
  {
    provide: FRIEND_REPOSITORY,
    useValue: Friends,
  },
];
