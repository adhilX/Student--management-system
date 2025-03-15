import { Student , IStudent} from '../models/student.Model.js';

// Fetch all students
export const getAllStudents = async () => {
    return await Student.find();
};

// Create a new student
export const createNewStudent = async (name: string, age: number, email: string, course: string):Promise<IStudent> => {
    const newStudent = new Student({ name, age, email, course });
    return await newStudent.save();
};

// Delete a student by ID
export const deleteStudentById = async (id: string) => {
    return await Student.findByIdAndDelete(id);
};

// Update student details
export const updateStudentById = async (id: string, updatedData: any) => {
    return await Student.findByIdAndUpdate(id, updatedData, { new: true });
};
