import { Patient } from "./patient";

export interface EditPatientResponse {
  success: boolean;
  message: string;
  patient: Patient;
}