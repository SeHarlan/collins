import { AuthUser } from "@/lib/auth/types";
import { AssessmentData } from "@/lib/db/schemas/assessment.schema";

export interface AssessmentCreateRequest {
  assessment: Partial<AssessmentData>;
  authUser: AuthUser;
}

export interface AssessmentCreateResponse { 
  assessmentId: string;
}

