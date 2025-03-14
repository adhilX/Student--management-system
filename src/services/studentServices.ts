import axios from 'axios';
import { Student , IStudent } from '../models/student.Model.js';

class StudentService{
    private externalApiUrl = 'http://localhost:5000/api/students';


// fetch students from external API
async fetchExternalStudents(): Promise<IStudent[]>{
    try {
        const response = await axios.get(this.externalApiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching external students', error);
        throw new Error('Error fetching external students');
    }
}
// fetch students from database
async getAllStudents(): Promise<IStudent[]>{
    return await Student.find();
}
}

export const studentService = new StudentService();

