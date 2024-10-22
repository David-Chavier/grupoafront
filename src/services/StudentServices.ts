import { CreateStudentModel, StudentModel, UpdateStudentModel } from "@/model/StudentModel";
import { Api } from "./Api";

export async function getStudents() {
    const request = await Api.get<StudentModel[]>("/Student");

    return request.data;
}

export async function getStudentById(id: string) {
    const request = await Api.get<StudentModel>(`/Student/${id}`);

    return request.data;
}

export async function createStudent(student: CreateStudentModel) {
    const request = await Api.post("/Student", student);

    return request.data;
}

export async function updateStudent(student: UpdateStudentModel) {
    const response = await Api.put("/Student", student);

    return response.data;
}

export async function deleteStudent(id: string) {
    const response = await Api.delete(`/Student/${id}`);

    return response.data;
}