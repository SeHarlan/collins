import { Types } from 'mongoose';
import {
  Assessment,
  AssessmentDocument,
  AssessmentData,
} from '../models/assessment.model';
import { connectDB } from '../connection';

export class AssessmentRepository {
  /**
   * Create a new assessment
   */
  static async create(data: AssessmentData): Promise<AssessmentDocument> {
    await connectDB();
    const assessment = new Assessment(data);
    return assessment.save();
  }

  /**
   * Find an assessment by ID
   */
  static async findById(id: string): Promise<AssessmentDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return Assessment.findById(id).exec();
  }

  /**
   * Find assessment by user ID
   */
  static async findByUserId(
    userId: string,
  ): Promise<AssessmentDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }
    return Assessment.findOne({ userId }).exec();
  }

  /**
   * Find all assessments
   */
  static async findAll(): Promise<AssessmentDocument[]> {
    await connectDB();
    return Assessment.find().exec();
  }

  /**
   * Update an assessment
   */
  static async update(
    id: string,
    data: Partial<AssessmentData>,
  ): Promise<AssessmentDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return Assessment.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  /**
   * Update assessment by user ID
   */
  static async updateByUserId(
    userId: string,
    data: Partial<AssessmentData>,
  ): Promise<AssessmentDocument | null> {
    await connectDB();
    if (!Types.ObjectId.isValid(userId)) {
      return null;
    }
    return Assessment.findOneAndUpdate({ userId }, data, { new: true }).exec();
  }

  /**
   * Delete an assessment
   */
  static async delete(id: string): Promise<boolean> {
    await connectDB();
    if (!Types.ObjectId.isValid(id)) {
      return false;
    }
    const result = await Assessment.findByIdAndDelete(id).exec();
    return result !== null;
  }

  /**
   * Delete assessment by user ID
   */
  static async deleteByUserId(userId: string): Promise<boolean> {
    await connectDB();
    if (!Types.ObjectId.isValid(userId)) {
      return false;
    }
    const result = await Assessment.findOneAndDelete({ userId }).exec();
    return result !== null;
  }

  /**
   * Find or create an assessment by user ID
   */
  static async findOrCreate(
    userId: string,
    data?: Partial<Omit<AssessmentData, 'userId'>>,
  ): Promise<AssessmentDocument> {
    await connectDB();

    const existingAssessment = await Assessment.findOne({ userId }).exec();
    if (existingAssessment) {
      return existingAssessment;
    }

    const newAssessment = new Assessment({
      userId,
      ...data,
    });
    return newAssessment.save();
  }
}
