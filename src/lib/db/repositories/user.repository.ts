import { User, UserDocument } from '../models/user.model';
import { connectDB } from '../connection';
import { AuthUser } from '@/lib/auth';

export class UserRepository {
  static async findOrCreate(authUser: AuthUser): Promise<UserDocument> {
    await connectDB();
    const user = await User.findOne({ privyId: authUser.privyId });
    if (!user) {
      return User.create(authUser);
    }
    return user;
  }
}
