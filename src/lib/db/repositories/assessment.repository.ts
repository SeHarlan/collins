import { Assessment, AssessmentDocument } from '../models/assessment.model';
import { connectDB } from '../connection';
import { AssessmentData } from '../schemas/assessment.schema';

export class AssessmentRepository {
  /** Create a new assessment */
  static async create(data: AssessmentData): Promise<AssessmentDocument> {
    await connectDB();
    const assessment = new Assessment(data);
    return assessment.save();
  }
}
