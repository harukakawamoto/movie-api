// src/movie/movie.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('MovieService', () => {
  let service: MovieService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService, PrismaService],
    }).compile();

    service = module.get<MovieService>(MovieService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const movieDto = {
        movieName: 'Inception',
        screeningTime: 148,
        startTime: new Date(),
        overview: 'A mind-bending thriller',
        thumbnail: 'inception.jpg',
      };

      jest.spyOn(prisma.movieInfo, 'create').mockResolvedValue({
        movieId: 1,
        ...movieDto,
      });

      expect(await service.create(movieDto)).toEqual({
        movieId: 1,
        ...movieDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const movies = [
        {
          movieId: 1,
          movieName: 'Inception',
          screeningTime: 148,
          startTime: new Date(),
          overview: 'A mind-bending thriller',
          thumbnail: 'inception.jpg',
        },
      ];

      jest.spyOn(prisma.movieInfo, 'findMany').mockResolvedValue(movies);

      expect(await service.findAll()).toEqual(movies);
    });
  });

  describe('findOne', () => {
    it('should return a single movie', async () => {
      const movie = {
        movieId: 1,
        movieName: 'Inception',
        screeningTime: 148,
        startTime: new Date(),
        overview: 'A mind-bending thriller',
        thumbnail: 'inception.jpg',
      };

      jest.spyOn(prisma.movieInfo, 'findUnique').mockResolvedValue(movie);

      expect(await service.findOne(1)).toEqual(movie);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updateMovieDto = {
        movieName: 'Inception Updated',
        screeningTime: 150,
        startTime: new Date(),
        overview: 'An updated mind-bending thriller',
        thumbnail: 'inception_updated.jpg',
      };

      jest.spyOn(prisma.movieInfo, 'update').mockResolvedValue({
        movieId: 1,
        ...updateMovieDto,
      });

      expect(await service.update(1, updateMovieDto)).toEqual({
        movieId: 1,
        ...updateMovieDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a movie', async () => {
      const movie = {
        movieId: 1,
        movieName: 'Inception',
        screeningTime: 148,
        startTime: new Date(),
        overview: 'A mind-bending thriller',
        thumbnail: 'inception.jpg',
      };

      jest.spyOn(prisma.movieInfo, 'delete').mockResolvedValue(movie);

      expect(await service.delete(1)).toEqual(movie);
    });
  });
});
