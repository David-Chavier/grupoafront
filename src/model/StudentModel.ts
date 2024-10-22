export interface CreateStudentModel {
    name: string;
    cpf: string;
    academicRegistration: string;
    email:string;
}

export interface StudentModel extends CreateStudentModel {
    id: string;
}

export type UpdateStudentModel = Omit<StudentModel, 'academicRegistration'>
