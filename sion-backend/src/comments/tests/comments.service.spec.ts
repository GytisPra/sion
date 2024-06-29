import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

import { AuctionsService } from '../../auctions/auctions.service';
import { CommentsService } from '../comments.service';
import { Comment } from '../../comments/comment.entity';
import { createCommentDto } from '../../comments/dto/createComment.dto';
import { UserEntity } from '../../users/serializers/users.serializer';
import { plainToClass } from 'class-transformer';
import { Auction } from '../../auctions/auction.entity';
import { plainAuction } from '../../utils/mocks/auctions/plainAuction';
import { plainUser } from '../../utils/mocks/users/plainUser';

describe('The CommentsService', () => {
  let commentsService: CommentsService;

  const mockedAuctionsService = {
    getAuctionById: jest.fn(),
  };

  const mockedCommentsRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockedCommentsRepository,
        },
        {
          provide: AuctionsService,
          useValue: mockedAuctionsService,
        },
      ],
    }).compile();

    commentsService = await module.get(CommentsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('When the service is called', () => {
    it('should be defined', () => {
      expect(commentsService).toBeDefined();
    });
  });

  describe('When posting a comment.', () => {
    let userOne: UserEntity;
    let auction: Auction;

    beforeEach(() => {
      auction = plainToClass(Auction, plainAuction);
      userOne = plainToClass(UserEntity, plainUser);
    });

    it('should return a new comment', async () => {
      const createCommentBody: createCommentDto = {
        auctionId: faker.datatype.uuid(),
        comment: 'asf',
      };

      mockedCommentsRepository.create = jest.fn().mockResolvedValue(
        plainToClass(Comment, {
          id: 1,
          comment: createCommentBody.comment,
          auction: auction,
          user: userOne,
        }),
      );

      const newComment = await commentsService.createComment(
        createCommentBody,
        userOne,
      );

      expect(newComment).toEqual(
        plainToClass(Comment, {
          id: 1,
          comment: createCommentBody.comment,
          auction: auction,
          user: userOne,
        }),
      );
    });
  });
});
