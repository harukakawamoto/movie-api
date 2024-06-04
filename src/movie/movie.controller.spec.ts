// src/movie/movie.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CreateMovieInfoDto } from './dto/create-movie-info.dto';
import { UpdateMovieInfoDao } from './dto/update-movie-info.dto';
import { PrismaService } from '../../prisma/prisma.service';

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;
  let prisma: PrismaService;

  const fixedDate = new Date('2023-01-01T00:00:00Z');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieService,
        MovieService,
        PrismaService,
        {
          provide: PrismaService,
          useValue: {
            movieInfo: {
              create: jest.fn().mockReturnValue(
                Promise.resolve({
                  movieId: 1,
                  movieName: 'Inception',
                  screeningTime: 148,
                  startTime: fixedDate,
                  overview: 'A mind-bending thriller',
                  thumbnail: 'inception.jpg',
                }),
              ),
              findMany: jest.fn().mockReturnValue(
                Promise.resolve([
                  {
                    movieId: 1,
                    movieName: 'Inception',
                    screeningTime: 148,
                    startTime: fixedDate,
                    overview: 'A mind-bending thriller',
                    thumbnail: 'inception.jpg',
                  },
                ]),
              ),
              findUnique: jest.fn().mockReturnValue(
                Promise.resolve({
                  movieId: 1,
                  movieName: 'Inception',
                  screeningTime: 148,
                  startTime: fixedDate,
                  overview: 'A mind-bending thriller',
                  thumbnail: 'inception.jpg',
                }),
              ),
              update: jest.fn().mockReturnValue(
                Promise.resolve({
                  movieId: 1,
                  movieName: 'Inception Updated',
                  screeningTime: 150,
                  startTime: fixedDate,
                  overview: 'An updated mind-bending thriller',
                  thumbnail: 'inception_updated.jpg',
                }),
              ),
              delete: jest.fn().mockReturnValue(
                Promise.resolve({
                  movieId: 1,
                  movieName: 'Inception',
                  screeningTime: 148,
                  startTime: fixedDate,
                  overview: 'A mind-bending thriller',
                  thumbnail: 'inception.jpg',
                }),
              ),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const createMovieDto: CreateMovieInfoDto = {
        movieName: 'Inception',
        screeningTime: 148,
        startTime: fixedDate,
        overview: 'A mind-bending thriller',
        thumbnail: 'inception.jpg',
      };

      const result = await controller.create(createMovieDto);
      expect(result).toEqual({
        movieId: 1,
        ...createMovieDto,
      });
      expect(prisma.movieInfo.create).toHaveBeenCalledWith({
        data: createMovieDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        {
          movieId: 1,
          movieName: 'Inception',
          screeningTime: 148,
          startTime: fixedDate,
          overview: 'A mind-bending thriller',
          thumbnail: 'inception.jpg',
        },
      ]);
      expect(prisma.movieInfo.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single movie', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual({
        movieId: 1,
        movieName: 'Inception',
        screeningTime: 148,
        startTime: fixedDate,
        overview: 'A mind-bending thriller',
        thumbnail: 'inception.jpg',
      });
      expect(prisma.movieInfo.findUnique).toHaveBeenCalledWith({
        where: { movieId: 1 },
      });
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const updateMovieDto: UpdateMovieInfoDao = {
        movieName: 'Inception Updated',
        screeningTime: 150,
        startTime: fixedDate,
        overview: 'An updated mind-bending thriller',
        thumbnail: 'inception_updated.jpg',
      };

      const result = await controller.update('1', updateMovieDto);
      expect(result).toEqual({
        movieId: 1,
        ...updateMovieDto,
      });
      expect(prisma.movieInfo.update).toHaveBeenCalledWith({
        where: { movieId: 1 },
        data: updateMovieDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a movie', async () => {
      const result = await controller.delete('1');
      expect(result).toEqual({
        movieId: 1,
        movieName: 'Inception',
        screeningTime: 148,
        startTime: fixedDate,
        overview: 'A mind-bending thriller',
        thumbnail: 'inception.jpg',
      });
      expect(prisma.movieInfo.delete).toHaveBeenCalledWith({
        where: { movieId: 1 },
      });
    });
  });
});
