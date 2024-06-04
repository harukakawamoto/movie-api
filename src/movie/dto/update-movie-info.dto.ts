import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieInfoDto } from './create-movie-info.dto';

export class UpdateMovieInfoDao extends PartialType(CreateMovieInfoDto) {}
