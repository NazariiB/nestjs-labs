import { User } from "src/user/entities/user.entity";
import { DeepPartial } from "typeorm";

export class CreateSafeAreaDto {
  id: number;
  userId: DeepPartial<User>;
  name: string;
  is_working: boolean;
}
