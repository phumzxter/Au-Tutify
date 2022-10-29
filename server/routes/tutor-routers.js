import express from 'express';
import { apply, getTutor, updateProfile, getTeaching, getTutees, createCourse, logIn, signUp, deleteCourse } from '../routes-controllers/tutor-controller.js';

const router = express.Router();

router.get('/tutees', getTutees);
router.get('/teaching', getTeaching);
router.post('/teaching', createCourse);
router.post('/login', logIn);
router.post('/signup', signUp);
router.delete('/delete/:courseid', deleteCourse);
router.patch('/profile/update/:userid', updateProfile);
router.get('/tutor/:id', getTutor);
router.patch('/apply/:courseid', apply);

export default router;
