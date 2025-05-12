import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { JwtauthGuard } from 'src/auth/jwt.auth.guard';
import { createDestinationDto } from './dto/create-destination.dto';

@Controller('destination')
@UseGuards(JwtauthGuard)
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Post()
  create(@Request() req, @Body() createDestinationDto: createDestinationDto) {
    return this.destinationService.create(
      req.user.userId,
      createDestinationDto,
    );
  }
}
