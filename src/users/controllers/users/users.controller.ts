import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dtos';
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

}

