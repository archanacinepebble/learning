import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    ){

    }
    findUsers() {
        return this.userRepository.find();
    }

    createUsers(userDetails: CreateUserParams) {

        const newUser = this.userRepository.create({ ...userDetails, createdAt: new Date()});
        return this.userRepository.save(newUser);

    }
    updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, {...updateUserDetails});

    }

    deleteUser(id: number) {
        return this.userRepository.delete(id);
    
        }
}
