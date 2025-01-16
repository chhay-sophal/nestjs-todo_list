import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
    
    @Post('logout')
    async logout(@Request() req) {
      return req.logout();
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
// curl http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBoYWwiLCJzdWIiOjEsImlhdCI6MTczNzAxNzI3NSwiZXhwIjoxNzM3MDE3MzM1fQ.bxZPW22i6hTRPArozalpwP6_gAuZtRW8EyfsOoLiC3s"