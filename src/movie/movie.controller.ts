import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieInfoDto } from './dto/create-movie-info.dto';
import { UpdateMovieInfoDao } from './dto/update-movie-info.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Post()
  create(@Body() createMovieInfoDto: CreateMovieInfoDto) {
    return this.movieService.create(createMovieInfoDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieInfoDto: UpdateMovieInfoDao,
  ) {
    return this.movieService.update(+id, updateMovieInfoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(+id);
  }
}
