import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

class SignInDto {
    username: string;
    password: string;
  }

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}

// FOR TESTING
// $ # GET /profile
// $ curl http://localhost:3000/auth/profile
// {"statusCode":401,"message":"Unauthorized"}

// $ # POST /auth/login
// $ curl -X POST http://localhost:3000/auth/login -d '{"username": "phal", "password": "password"}' -H "Content-Type: application/json"
// {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."}

// $ # GET /profile using access_token returned from previous step as bearer code
// $ curl http://localhost:3000/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
// {"sub":1,"username":"phal","iat":...,"exp":...}