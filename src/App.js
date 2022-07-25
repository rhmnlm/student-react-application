import './App.css';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import StudentService from './api/studentApi';
import CourseService from './api/courseApi'
import Pagination from './component/Pagination';
import CustomAlert from './component/Alert';
import StudentModal from './component/StudentModal';
import CourseModal from './component/CourseModal';

function App() {

      const [data, setData] = useState(null);

      const [student, setStudent] = useState({});

      const [page, setPage] = useState({
            pageNum: 0,
            pageSize: 5
            })

      const [courses, setCourses] = useState([])
      const [courseChanged, setCourseChanged] = useState(false);
      const [courseFilteredStudentMode, setCourseFilteredStudentMode] = useState(false);
      const [selected, setSelected] = useState("Select Course");

      const [studentChanged, setStudentChanged] = useState(false);
      const [studentModalShow, setStudentModalShow] = useState(false);
      const [courseModalShow, setCourseModalShow] = useState(false);

      const [alertShow, setAlertShow] = useState(false);

      const [alertContent, setAlertContent] = useState({
            title: "",
            type: "",
            message: ""
      })

      const alertState = {
            alertContent, setAlertContent, alertShow, setAlertShow
      }

      const [studentModalState, setStudentModalState] = useState("Create");

      //lists of students, update via page changes
      useEffect(() => {
      
            if(courseFilteredStudentMode){
                  StudentService.getStudentByCourseId(courseFilteredStudentMode, page.pageNum, page.pageSize)
                  .then((response)=>{
                        setData(response.data)
                        console.log(response)
                  })
            }
            else{
                  StudentService.getStudentsPaged(page.pageNum, page.pageSize).then((response)=>{
                        setData(response.data)
                        console.log(response)
                  })
            }
          
      }, [page, courseFilteredStudentMode, studentChanged, courseChanged]);

      useEffect(()=>{
            CourseService.getAllCourses(0, 100).then((response)=>{
                  setCourses(response.data.content)
                  console.log(response.data.content)
            })
      },[courseChanged])

      function onClickStudent(student){
          setStudent(student)
          setStudentModalShow(true)
          setStudentModalState("Edit")
      }

      function onAddStudent(e){
          setStudent()
          setStudentModalShow(true)
          setStudentModalState("Create")
      }

      function onViewAndAddCourse(e){
            setCourseModalShow(true)
      }

      function onSelectFilter(e){
            if(e.target.value === "Select Course")
                  setCourseFilteredStudentMode(false)
            else{
                  var selectedIndex = e.target.options.selectedIndex;
                  var courseId= e.target.options[selectedIndex].getAttribute('courseid');
                  setCourseFilteredStudentMode(courseId)
            }
            setSelected(e.target.value)

      }

  if(!data) return <>Error!</>;

  return (
    <div className="App">
        <Container>
            <div className="mb3" style={{"display":"flex", "justifyContent": "left"}}>
                  <Button className="add-student" 
                    onClick={() => onAddStudent()} 
                    style={{marginBottom:"5pt", marginTop: "5pt", marginRight: "5pt"}}>
                         Add Student
                    </Button>
                    <Button className="add-student" 
                    onClick={() => onViewAndAddCourse()} 
                    style={{marginBottom:"5pt", marginTop: "5pt"}}>
                         View/Update Course
                    </Button>
                    <div className='filter' style={{marginLeft: "auto", marginTop: "10pt"}}>
                         <label htmlFor='studentFilter'>course filter</label>
                         <select onChange={onSelectFilter} id={"filter"} value={selected}>
                              <option key={100} value="Select Course">select course</option>
                              {courses? courses.map(course=>{
                                    return(
                                          <option key={course.id} courseid={course.id} value={course.name}>{course.name}</option>
                                    )
                              })
                              :
                              <></>
                              }
                         </select>
                    </div>
                    
            </div>
            <Table striped bordered hover>
                  <thead>
                        <tr>
                              <th>No.</th> <th>First Name</th> <th>Last Name</th> <th>Registered Course</th>
                        </tr>
                  </thead>
            <tbody>
                  {data.content ?
                        <>
                              {data.content.map((student, index)=>{
                                    return(
                                          <>
                                                <tr key={index}>
                                                      <td> {(page.pageNum * page.pageSize) + index + 1}</td>
                                                      <td>
                                                            <a href="# " onClick={() => onClickStudent(student)}>
                                                                  {student.firstname}
                                                            </a>
                                                      </td>
                                                      <td>{student.lastname}</td>
                                                      <td>
                                                            {student.courseRegistered.map(course =>{
                                                                 return(
                                                                      <>
                                                                           {course.name} ,
                                                                      </>
                                                                 )
                                                            })}
                                                       </td>
                                                </tr>
                                          </>
                                    )
                              })}
                        </>
                        :
                        null
                  }
            </tbody>
          </Table>
          <Pagination page={page} setPage={setPage} lastPage={data.totalPages}/> 
        </Container>
        <StudentModal alertState={alertState} show={studentModalShow} onHide={() => setStudentModalShow(false)} student={student} setStudent={setStudent} courses={courses}
            studentModalState={studentModalState} studentChanged={studentChanged} setStudentChanged={setStudentChanged}/>
        <CustomAlert alertState={alertState} onHide={()=> setAlertShow(false)}/>
        <CourseModal alertState={alertState} show={courseModalShow} onHide={()=>setCourseModalShow(false)} courses={courses} setCourses={setCourses} setCourseChanged={setCourseChanged} courseChanged={courseChanged}/>
    </div>
  );
}

export default App;