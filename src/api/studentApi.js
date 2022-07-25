import axios from 'axios';

const BASE_API = "http://localhost:8120/";

const STUDENT_API = BASE_API + "students/"

class StudentService {

     getStudentsPaged(pageNumber, pageSizes){
          return axios.get(STUDENT_API + "lists",
               {
                    params: {
                              pageNum: pageNumber,
                              pageSize: pageSizes
                         }
               }
          )
     }

     getStudentById(id){
          return axios.get(STUDENT_API + id)
     }

     addNewStudent(student){
          return axios.post(STUDENT_API + "add",
          student
          )
     }

     updateStudent(student, id){
          return axios.put(STUDENT_API + "update/" + id,
          student
          )
     }

     deleteStudent(student){
          return axios.delete(STUDENT_API + "delete",
          {
               data: student
          }
          )
     }

     registerCourseForStudent(studentId, course){
          return axios.post(STUDENT_API + studentId + "/courses",
          course
          )
     }

     removeCourseForStudent(studentId, course){
          return axios.post(STUDENT_API + studentId + "/courses/drop",
          course
          )
     }

     getStudentByCourseId(courseId, pageNumber, pageSizes){
          return axios.get(STUDENT_API + "course/" + courseId,
               {
                    params: {
                              pageNum: pageNumber,
                              pageSize: pageSizes
                         }
               }
          )
     }

}

export default new StudentService();

