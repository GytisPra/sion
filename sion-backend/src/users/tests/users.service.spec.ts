import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';
import { UserEntity } from '../serializers/users.serializer';

import { CreateUserDto } from '../dto/createUser.dto';

import { plainUser } from '../../utils/mocks/users/plainUser';
import { UserNotFound } from '../../utils/exceptions/userNotFound.exception';
import { ResetPasswordStarted } from '../../utils/exceptions/resetPasswordStarted.exception';

jest.mock('bcrypt');

export type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};

const repositoryMockFactory: () => Partial<UsersRepository> = jest.fn(() => ({
  getByEmail: jest.fn(),
  createEntity: jest.fn(),
  get: jest.fn(),
}));

describe('The UsersService', () => {
  let usersService: UsersService;
  let usersRepositoryMock: MockType<UsersRepository>;
  let bcryptCompare: jest.Mock;

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersRepository),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepositoryMock = module.get(getRepositoryToken(UsersRepository));
  });

  afterEach(() => jest.clearAllMocks());

  describe('when the service is called', () => {
    it('should be defined', () => {
      expect(usersService).toBeDefined();
    });
  });

  describe('when getting a user by email', () => {
    let user: UserEntity;
    beforeEach(() => {
      user = plainToClass(UserEntity, plainUser);
    });

    it('should return a user if the email is succesfully matched', async () => {
      usersRepositoryMock.getByEmail.mockResolvedValue(user);

      expect(await usersService.getByEmail(user.email)).toEqual(user);
    });

    it('should throw an error if the email is not succesfully matched', async () => {
      usersRepositoryMock.getByEmail.mockResolvedValue(undefined);

      await expect(usersService.getByEmail(user.email)).rejects.toThrow(
        new UserNotFound(user.email),
      );
    });
  });

  describe('when creating a user', () => {
    let user: UserEntity;

    beforeEach(() => {
      user = plainToClass(UserEntity, plainUser);
    });

    it('should return a user if the user is succesfully created', async () => {
      const createUserBody: CreateUserDto = {
        email: plainUser.email,
        firstname: plainUser.firstname,
        lastname: plainUser.lastname,
        password: plainUser.password,
        username: plainUser.username,
        dateOfBirth: plainUser.dateOfBirth,
      };

      usersRepositoryMock.createEntity.mockResolvedValue(user);

      const newUser = await usersService.create(createUserBody);

      expect(newUser).toEqual(user);
    });
  });

  describe('when getting a user by id', () => {
    let user: UserEntity;

    beforeEach(() => {
      user = plainToClass(UserEntity, plainUser);
    });

    it('should return the user if id matches', async () => {
      usersRepositoryMock.get.mockResolvedValue(user);
      await expect(usersService.get(user.id)).resolves.toEqual(user);
    });

    it('should throw an error if id does not match', async () => {
      usersRepositoryMock.get.mockResolvedValue(undefined);

      await expect(usersService.get(user.id)).rejects.toThrow(
        new UserNotFound(user.id),
      );
    });
  });

  describe('when getting a user if refresh token matches', () => {
    let user: UserEntity;

    describe('and the user is matched', () => {
      beforeEach(() => {
        user = plainToClass(UserEntity, plainUser);
        bcryptCompare.mockReturnValue(true);
      });

      it('should return the user if resetPasswordToken not found', async () => {
        usersRepositoryMock.get.mockResolvedValue(user);

        const fetchedUser = await usersService.getUserIfRefreshTokenMatches(
          user.currentHashedRefreshToken,
          user.id,
        );
        expect(fetchedUser).toEqual(user);
      });

      it('should throw error if isResetPasswordStarted equals true', async () => {
        usersRepositoryMock.get.mockResolvedValue(
          plainToClass(UserEntity, {
            ...plainUser,
            isResetPasswordStarted: true,
          }),
        );

        await expect(
          usersService.getUserIfRefreshTokenMatches(
            user.currentHashedRefreshToken,
            user.id,
          ),
        ).rejects.toThrow(new ResetPasswordStarted(user.email, user.id));
      });
    });
  });
});
