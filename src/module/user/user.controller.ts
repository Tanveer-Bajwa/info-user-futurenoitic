import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser: any = { ...createUserDto, password: hashedPassword };
    console.log(newUser);
    // const secretKey = 'yourSecretanjanjsandKey'; // Replace with your own secret key
    // const options = {
    //   expiresIn: '1h',
    // };

    // const token = jwt.sign(createUserDto, secretKey, options);
    // return token;

    return this.userService.create(createUserDto);
    // return  this.userService.create(createUserDto);

  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
