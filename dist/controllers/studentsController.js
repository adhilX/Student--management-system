import { Student } from '../models/student.Model.js';
//get all students
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching students' });
    }
};
//create a student
export const createStudent = async (req, res) => {
    try {
        console.log('dddddd');
        const { name, age, email, course } = req.body;
        console.log(name, age, email, course);
        const newStudent = new Student({ name, age, email, course });
        await newStudent.save();
        res.status(201).json(newStudent);
    }
    catch (error) {
        res.status(400).json({ error: "Error creating student" });
    }
};
export const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        // if(!id) return res.status(400).json({ error: "Student ID is required" });
        await Student.findByIdAndDelete(id);
        res.status(200).json({ message: "Student deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ error: "Error deleting student" });
    }
};
