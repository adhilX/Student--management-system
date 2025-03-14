import { Request, Response } from 'express';
import {Student} from '../models/student.Model.js';
import { promises } from 'dns';

//get all students

export const getStudents = async (req: Request, res: Response) => {
    try {
      const students = await Student.find();
      res.status(200).json(students); 
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students' });
    }
  };

//create a student
  export const createStudent = async (req: Request, res: Response) => {
    try {
        console.log('dddddd')
        const { name, age, email, course } = req.body;
        console.log(name, age, email, course);
       const valideEmail = await Student.findOne({ email });

        // if(valideEmail) return res.status(400).json({ error: "Email already exists" });

        const newStudent = new Student({ name, age, email, course });
        await newStudent.save();
        
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: "Error creating student" });
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
        res.status(400).json({ error: "Error deleting student" });
    }
}

export const updateStudent = async (req : Request, res : Response):Promise<void> => {
    try {
        const id = req.params.id;
        const { name, age, email, course } = req.body;
        if(!id) {
            res.status(400).json({ error: "Student ID is required" })
            return;
        }
        const updatedStudent = { name, age, email, course };
     const updateStudent = await Student.findByIdAndUpdate(id, updatedStudent, { new: true });

     if(!updateStudent){
         res.status(400).json({ error: "Student not found" });return;
    } 
        
    
        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        
    }
}  