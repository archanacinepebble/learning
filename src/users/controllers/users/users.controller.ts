import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dtos';
import { FilterDto } from 'src/users/dtos/Filter.dto';
import { UpdateUserDto } from 'src/users/dtos/updateUser.dtos';
import { UsersService } from 'src/users/services/users/users.service';


@Controller('users')
export class UsersController {
    constructor(private userService : UsersService){
    }
    @Get()
    getUsers() {
      return this.userService.findUsers();
     }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
      return this.userService.createUsers(createUserDto);
    }

    @Put(':id')
    async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
     ) {
      await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number ) {
      await this.userService.deleteUser(id);
    }

    @Get('by/raw/query')
    getUsersByRawQuery() {
       return this.userService.findUsersByRawQuery();
    }

    @Post('pagination')
    getUsersByPaginations(@Body() filterDto: FilterDto) {
      return this.userService.findUsersByPaginations(filterDto);
    }

}

