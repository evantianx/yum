import { ArgsType, Field, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './createRestaurant.dto';

@ArgsType()
export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @Field(() => Number)
  id: number;
}
