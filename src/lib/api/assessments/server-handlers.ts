import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, errorResponse, serverErrorResponse, successResponse, unauthorizedResponse } from "../utils/response";
import { AssessmentCreateRequest, AssessmentCreateResponse } from "./types";
import { AssessmentSchema } from "@/lib/db/schemas/assessment.schema";
import { getRequiredAuthId } from "@/lib/auth/server";
import { AssessmentRepository } from "@/lib/db/repositories/assessment.repository";
import { API_MESSAGES } from "@/constants/apiMessages";
import { handleErrorResponse } from "../utils/handleErrors";
import { UserRepository } from "@/lib/db/repositories/user.repository";

export const createAssessment = async (request: NextRequest): Promise<NextResponse<ApiResponse<AssessmentCreateResponse>>> => { 
  try {
    // Require authentication and get the authenticated user
    const authId = await getRequiredAuthId(request);
    // Get or create the user in the database
    
    const body: AssessmentCreateRequest = await request.json();

    if(body.authUser.privyId !== authId) {
      throw new Error('Authenticated user mismatch');
    }
    
    const dbUser = await UserRepository.findOrCreate(body.authUser);

    const assessmentData = {
      ...body.assessment,
      userId: dbUser.id,
    };
    // Validate the request body
    const validatedAssessment = AssessmentSchema.parse(assessmentData);
    
    // Save to database using the assessment repository
    const assessment = await AssessmentRepository.create(validatedAssessment);

    const responseData: AssessmentCreateResponse = {
      assessmentId: assessment.id,
    };

    return successResponse(responseData, 201);
  } catch (error) {
    console.error('Failed to save assessment:', error);
    return handleErrorResponse(error);
  }
}