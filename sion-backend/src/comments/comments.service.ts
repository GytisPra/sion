import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuctionsService } from '../auctions/auctions.service';
import { UserEntity } from '../users/serializers/users.serializer';
import { createCommentDto } from './dto/createComment.dto';
import { Comment } from './comment.entity';
import { NotEnoughKarmaPoints } from '../utils/exceptions/notEnoughKarmaPoints.exception';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private readonly auctionService: AuctionsService,
  ) {}

  public async createComment(
    createCommentBody: createCommentDto,
    user: UserEntity,
  ) {
    if (user.karmaPoints < 15) {
      throw new NotEnoughKarmaPoints(user.karmaPoints);
    }

    const auction = await this.auctionService.getAuctionById(
      createCommentBody.auctionId,
    );

    const newComment = await this.commentRepository.create({
      comment: createCommentBody.comment,
      auction,
      user,
    });

    await this.commentRepository.save(newComment);

    return newComment;
  }
}
