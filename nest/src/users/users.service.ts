import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';


@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) { }

    
  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({
        email,
    })
  }
}