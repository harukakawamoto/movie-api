import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMovieInfoDto } from './dto/create-movie-info.dto';
import { UpdateMovieInfoDao } from './dto/update-movie-info.dto';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  // get all movie information
  findOne(movieId: number) {
    return this.prisma.movieInfo.findUnique({
      where: { movieId },
    });
  }

  // get movie information based on the movie_id
  findAll() {
    return this.prisma.movieInfo.findMany();
  }

  // create movie information
  create(createMovieInfoDto: CreateMovieInfoDto) {
    return this.prisma.movieInfo.create({
      data: createMovieInfoDto,
    });
  }

  // update movie information based on the movie_id
  update(movieId: number, updateMovieInfoDto: UpdateMovieInfoDao) {
    return this.prisma.movieInfo.update({
      where: { movieId },
      data: updateMovieInfoDto,
    });
  }

  // delete movie information based on the movie_id
  delete(movieId: number) {
    return this.prisma.movieInfo.delete({
      where: { movieId },
    });
  }
}
