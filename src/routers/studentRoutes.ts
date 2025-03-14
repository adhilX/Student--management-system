import {Router} from 'express';
import { getStudents, createStudent ,deleteStudent , updateStudent} from "../controllers/studentsController.js";

const router = Router();

router.get('/',getStudents);
router.post('/',createStudent);
router.delete('/:id',deleteStudent);
router.put('/:id',updateStudent);
export default router;
