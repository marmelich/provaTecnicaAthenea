import { Patient } from "./patient";

export interface CreatePatientResponse {
  success: boolean;
  message: string;
  patient: Patient;
}