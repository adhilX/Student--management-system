import { Request, Response } from 'express';
import { getAllStudents, createNewStudent, deleteStudentById, updateStudentById } from '../services/studentServices.js';
import { Student } from '../models/student.Model.js';

// Get all students
export const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students' });
    }
};

// Create a student
export const createStudent = async (req: Request, res: Response) :Promise<any>=> {
    try {
        const { name, age, email, course } = req.body;  
        const studentExists = await Student.findOne({ email });
        if (studentExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }  
        const student = await createNewStudent(name, age, email, course);
        res.status(201).json(student);
    } catch (error :any) {
        res.status(400).json({ error: error.message });
        console.log(error);     
    }
};

// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteStudentById(id);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a student
export const updateStudent = async (req: Request, res: Response):Promise <any> => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedStudent = await updateStudentById(id, updatedData);

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};