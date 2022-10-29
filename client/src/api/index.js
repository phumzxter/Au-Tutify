import Axios from 'axios';

//tutor
// const tutorAPI = Axios.create({ baseURL: 'https://tutify-2.herokuapp.com/tutor' });
const tutorAPI = Axios.create({ baseURL: 'http://localhost:1001/tutor' });

tutorAPI.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export async function fetchTutorCourses() {
  const response = await tutorAPI.get('/teaching');
  return response.data;
}
export async function fetchTutees() {
  const response = await tutorAPI.get('/tutees');
  return response.data;
}
export const getTutor = (id) => tutorAPI.get(`/tutor/${id}`);
export const createCourse = (newCourse) => tutorAPI.post('/teaching', newCourse);
export const logIn = (formData) => tutorAPI.post('/login', formData);
export const signUp = (formData) => tutorAPI.post('/signup', formData);
export const deleteCourse = (courseid) => tutorAPI.delete(`/delete/${courseid}`);
export const updateProfile = (userid, profile) => tutorAPI.patch(`/profile/update/${userid}`, profile); //patch(`/posts/${id}`, updatedPost);
export const apply = (courseid) => tutorAPI.patch(`/apply/${courseid}`);

//tutee
// const tuteeAPI = Axios.create({ baseURL: 'https://tutify-2.herokuapp.com/tutee' });
const tuteeAPI = Axios.create({ baseURL: 'http://localhost:1001/tutee' });

tuteeAPI.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});
export async function fetchRequestedCourses() {
  const response = await tuteeAPI.get('/requests');
  return response.data;
}
export async function fetchTutors() {
  const response = await tuteeAPI.get('/tutors');
  return response.data;
}
export const createRequest = (newCourse) => tuteeAPI.post('/requests', newCourse);
export const tuteeLogin = (formData) => tuteeAPI.post('/login', formData);
export const tuteeSignup = (formData) => tuteeAPI.post('/signup', formData);
export const enroll = (courseid) => tuteeAPI.patch(`/enroll/${courseid}`);
export const enroll2 = (courseid) => tuteeAPI.patch(`/enroll2/${courseid}`, tuteeid);
export const withdraw = (courseid) => tuteeAPI.patch(`/withdraw/${courseid}`);
export const deleteRequest = (courseid) => tuteeAPI.delete(`/delete/${courseid}`);
