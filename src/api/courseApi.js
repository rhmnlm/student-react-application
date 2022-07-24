import axios from 'axios';

const BASE_API = "http://localhost:8120/";
const COURSE_API = BASE_API + "course/"

class CourseService {

     getAllCourses(pageNumber, pageSizes){
          return axios.get(COURSE_API + "lists",
          {
               params: {
                         pageNum: pageNumber,
                         pageSize: pageSizes
                    }
          });
     }

     getCourseById(courseId){
          return axios.get(COURSE_API + courseId)
     }

     addNewCourse(course){
          return axios.post(COURSE_API + "add",
          course)
     }

     updateCourse(courseId, course){
          return axios.put(COURSE_API + "update/" + courseId,
          course)
     }

     deleteCourse(course){
          return axios.delete(COURSE_API + "delete",
          course)
     }

}

export default new CourseService();