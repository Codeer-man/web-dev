import { Injectable, UseGuards } from '@nestjs/common';
import { createDestinationDto } from './dto/create-destination.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DestinationService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createDestinationDto: createDestinationDto) {
    return this.prisma.destination.create({
      data: {
        ...createDestinationDto,
        travelDate: new Date(createDestinationDto.travelDate).toISOString(),
        userId,
      },
    });
  }
}
