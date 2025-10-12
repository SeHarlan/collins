import { NextRequest, NextResponse } from 'next/server';
import { AssessmentSchema } from '@/lib/db/schemas/assessment.schema';
import {
  successResponse,
  errorResponse,
  serverErrorResponse,
} from '@/lib/api/utils/response';
import { AssessmentCreateResponse } from '@/lib/api/assessments';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = AssessmentSchema.parse(body);

    // TODO: Save to database using your assessment repository
    // const assessment = await assessmentRepository.create(validatedData);

    // For now, just return success with proper typing
    const responseData: AssessmentCreateResponse = {
      message: 'Assessment saved successfully',
      // assessmentId: assessment._id.toString(), // Uncomment when database is connected
    };

    return successResponse(responseData, 201);
  } catch (error) {
    console.error('Failed to save assessment:', error);

    if (error instanceof Error) {
      return errorResponse(error.message, 400);
    }

    return serverErrorResponse('Failed to save assessment', error);
  }
}
