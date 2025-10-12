import { Types } from 'mongoose';
import {
  User,
  UserDocument,
  UserData,
  UserWithVirtuals,
  UserWithPortfolioAssets,
  UserAssessmentPopulation,
  UserPortfolioPopulation,
  UserPortfolioWithAssetsPopulation,
} from '../models/user.model';
import { connectDB } from '../connection';

export class UserRepository {
  /**
   * Create a new user
   */
  static async create(data: Omit<UserData, ''>): Promise<UserDocument> {
    await connectDB();
    const user = new User(data);
    return user.save();
  }

  /**
   * Find a user by ID
   */
  static async findById(id: string): Promise<UserDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return User.findById(id).exec();
  }

  /**
   * Find a user by Privy ID
   */
  static async findByPrivyId(privyId: string): Promise<UserDocument | null> {
    await connectDB();
    return User.findOne({ privyId }).exec();
  }

  /**
   * Find a user by email
   */
  static async findByEmail(email: string): Promise<UserDocument | null> {
    await connectDB();
    return User.findOne({ email }).exec();
  }

  /**
   * Update a user
   */
  static async update(
    id: string,
    data: Partial<Omit<UserData, ''>>,
  ): Promise<UserDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return User.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  /**
   * Find all users
   */
  static async findAll(): Promise<UserDocument[]> {
    await connectDB();
    return User.find().exec();
  }

  /**
   * Get user count
   */
  static async getCount(): Promise<number> {
    await connectDB();
    return User.countDocuments().exec();
  }

  //TODO - there will probably be some security considerations around deleting users
  /**
   * Delete a user
   */
  // static async delete(id: string): Promise<boolean> {
  //   await connectDB();
  //   if (!Types.ObjectId.isValid(id)) {
  //     return false;
  //   }
  //   const result = await User.findByIdAndDelete(id).exec();
  //   return result !== null;
  // }

  //TODO - modify this based on how privy returns data and our users schema
  /**
   * Find or create a user by Privy ID
   */
  static async findOrCreate(
    privyId: string,
    data?: Partial<Omit<UserData, 'privyId'>>,
  ): Promise<UserDocument> {
    await connectDB();

    const existingUser = await User.findOne({ privyId }).exec();
    if (existingUser) {
      return existingUser;
    }

    const newUser = new User({
      privyId,
      ...data,
    });
    return newUser.save();
  }

  /**
   * Find user by ID with assessment and portfolios
   */
  static async findByIdWithVirtuals(
    id: string,
  ): Promise<UserWithVirtuals | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return User.findById(id)
      .populate(UserAssessmentPopulation)
      .populate(UserPortfolioPopulation)
      .exec() as unknown as Promise<UserWithVirtuals | null>;
  }

  /**
   * Find user by ID with assessment and portfolios (with assets)
   */
  static async findByIdWithPortfolioAssets(
    id: string,
  ): Promise<UserWithPortfolioAssets | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return User.findById(id)
      .populate(UserAssessmentPopulation)
      .populate(UserPortfolioWithAssetsPopulation)
      .exec() as unknown as Promise<UserWithPortfolioAssets | null>;
  }
}
