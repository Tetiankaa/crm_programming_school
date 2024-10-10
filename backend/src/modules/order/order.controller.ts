import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ApiAuth } from '../../common/decorators/api-auth.decorator';
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-res.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { QueryReqDto } from '../pagination/dto/req/query.req.dto';
import { PaginationResDto } from '../pagination/dto/res/pagination.res.dto';
import { CommentReqDto } from './dto/req/comment.req.dto';
import { GroupReqDto } from './dto/req/group.req.dto';
import { UpdateOrderReqDto } from './dto/req/update-order.req.dto';
import { CourseResDto } from './dto/res/course.res.dto';
import { CourseFormatResDto } from './dto/res/course-format.res.dto';
import { CourseTypeResDto } from './dto/res/course-type.res.dto';
import { GroupResDto } from './dto/res/group.res.dto';
import { OrderResDto } from './dto/res/order.res.dto';
import { OrderStatusResDto } from './dto/res/order-status.res.dto';
import { OrderPermissionGuard } from './guards/order-permission.guard';
import { OrderService } from './services/order.service';

@Controller('orders')
@ApiTags('Orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiPaginatedResponse(OrderResDto)
  @ApiOperation({
    description:
      'Fetches a paginated list of orders. Supports ordering by various fields.',
  })
  public async getAll(
    @Query() query: QueryReqDto,
  ): Promise<PaginationResDto<OrderResDto>> {
    return await this.orderService.getAll(query);
  }

  @Post(':id/addComment')
  @UseGuards(OrderPermissionGuard)
  @ApiAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'Comment created successfully',
    type: OrderResDto,
  })
  @ApiOperation({ description: 'Adds comments to specific orders.' })
  public async saveComment(
    @CurrentUser() userData: IUserData,
    @Body() comment: CommentReqDto,
    @Param('id') id: string,
  ): Promise<OrderResDto> {
    return await this.orderService.saveComment(userData, comment, id);
  }

  @Get('groups')
  @ApiAuth()
  @ApiOkResponse({
    description: 'Groups fetched successfully.',
    type: [GroupResDto],
  })
  @ApiOperation({
    description: 'Fetches a list of all groups',
  })
  public async getAllGroups(): Promise<GroupResDto[]> {
    return await this.orderService.getAllGroups();
  }

  @Post('groups')
  @ApiAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiCreatedResponse({
    description: 'Group created successfully',
    type: GroupResDto,
  })
  @ApiOperation({
    description: 'Adds a new group item.',
  })
  public async saveGroup(@Body() group: GroupReqDto): Promise<GroupResDto> {
    return await this.orderService.saveGroup(group);
  }

  @Get('statuses')
  @ApiAuth()
  @ApiOkResponse({
    description: 'Statuses fetched successfully.',
    type: [OrderStatusResDto],
  })
  @ApiOperation({
    description: 'Fetches a list of all statuses',
  })
  public async getAllStatuses(): Promise<OrderStatusResDto[]> {
    return await this.orderService.getAllStatuses();
  }

  @Get('courses')
  @ApiAuth()
  @ApiOkResponse({
    description: 'Courses fetched successfully.',
    type: [CourseResDto],
  })
  @ApiOperation({
    description: 'Fetches a list of all courses',
  })
  public async getAllCourses(): Promise<CourseResDto[]> {
    return await this.orderService.getAllCourses();
  }

  @Get('course-formats')
  @ApiAuth()
  @ApiOkResponse({
    description: 'Course formats fetched successfully.',
    type: [CourseFormatResDto],
  })
  @ApiOperation({
    description: 'Fetches a list of all course formats',
  })
  public async getAllCourseFormats(): Promise<CourseFormatResDto[]> {
    return await this.orderService.getAllCourseFormats();
  }

  @Get('course-types')
  @ApiAuth()
  @ApiOkResponse({
    description: 'Course types fetched successfully.',
    type: [CourseTypeResDto],
  })
  @ApiOperation({
    description: 'Fetches a list of all course types',
  })
  public async getAllCourseTypes(): Promise<CourseTypeResDto[]> {
    return await this.orderService.getAllCourseTypes();
  }

  @Patch(':id')
  @UseGuards(OrderPermissionGuard)
  @ApiAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({
    description: 'Order updated successfully',
    type: OrderResDto,
  })
  @ApiOperation({ description: 'Updates order based on ID parameter.' })
  public async updateOrder(
    @CurrentUser() userData: IUserData,
    @Param('id') id: string,
    @Body() dto: UpdateOrderReqDto,
  ): Promise<OrderResDto> {
    return await this.orderService.updateOrder(userData, id, dto);
  }
}
