import { Request, Response } from 'express';
import {Student} from '../models/student.Model.js';

//get all students
export const getStudents = async (req: Request, res: Response): Promise<void> => {
    try {
      const students = await Student.find();
      res.status(200).json(students); 
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students' });
    }
  };

//create a student
export const createStudent = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('dddddd')
        const { name, age, email, course } = req.body;
        console.log(name, age, email, course);

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            res.status(400).json({ error: "Email already exists" });
            return;
        }
    
        const newStudent = new Student({ name, age, email, course });
        await newStudent.save();
        
        res.status(201).json(newStudent);
    } catch (error) {
        console.error("Create Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void>=> {
    try {
        const id = req.params.id;
        if(!id) {
         res.status(400).json({ error: "Student ID is required" });
         return;
        }
        await Student.findByIdAndDelete(id);
         res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Internal Server Error" });    }
}

export const updateStudent = async (req : Request, res : Response):Promise<void> => {
    try {
        // console.log('dddddd')
        const id = req.params.id;
        const { name, age, email, course } = req.body;

        const updatedStudent = { name, age, email, course };
     const updatedStudentRecord = await Student.findByIdAndUpdate(id, updatedStudent, { new: true });

     if(!updatedStudentRecord){
         res.status(400).json({ error: "Student not found" });return;
    } 
        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
            }
}  