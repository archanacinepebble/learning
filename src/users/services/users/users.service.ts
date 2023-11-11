import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Connection } from 'mysql2';
import { FilterDto } from 'src/users/dtos/Filter.dto';
@Injectable()
export class UsersService {

    resultPerPage = 1;

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        @InjectConnection() private readonly connection: Connection
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

    findUsersByRawQuery() {
        return this.connection.query('SELECT * FROM users;');
    }

    findUsersByPaginations(filterDto: FilterDto) {
        let query = 'SELECT * FROM users';
        query += " ORDER BY createdAt "+filterDto.order+" LIMIT "+filterDto.offset+","+filterDto.limit;
        return this.connection.query(query);
    }
}
