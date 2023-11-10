import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Connection } from 'mysql2';
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

    findUsersByPaginations(page: number) {
        if(!page) page = 0;
        let query = 'SELECT * FROM users';
        let start = (page-1)*this.resultPerPage ;
        let end = (page)*(this.resultPerPage-1) + this.resultPerPage;
        query += " LIMIT "+start+","+end;
        return this.connection.query(query);
    }
}
