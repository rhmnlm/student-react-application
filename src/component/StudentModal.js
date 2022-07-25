import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import StudentService from '../api/studentApi'
import { useState } from 'react';

function StudentModal(props){

      const {student, setStudent, onHide, show, studentModalState, alertState} = props;
      const {studentChanged, setStudentChanged} = props;
      const {courses} = props;

      const {alertContent, setAlertContent, setAlertShow} = alertState;

      const [formValidation , setFormValidation] = useState({
            firstname: true,
            lastname: true,
            coursetoadd: true
      })

      const [addCourseMode, setAddCourseMode] = useState(false);
      const [courseToAdd, setCourseToAdd] = useState({
            id: "",
            name: "Select Course"
      });

      function onSaveClick(student){

            //validation

            const validated = validate(student)
            
            if(validated){
                  studentModalState === "Create" ?
                        StudentService.addNewStudent(student)
                        .then(()=>{
                              setStudentChanged(!studentChanged)
                              setAlertContent({
                                    ...alertContent,
                                    title: "Success",
                                    type: "Success",
                                    message: "Successfully added a student"
                              })

                              setAlertShow(true)
                        })
                        .catch((error)=>{
                              setAlertContent({
                                    ...alertContent,
                                    title: "Error",
                                    type: "Fail",
                                    message: "There's something wrong in the server"
                              })

                              setAlertShow(true)
                        })
                        :
                        StudentService.updateStudent(student, student.id)
                        .then(()=>{
                              setStudentChanged(!studentChanged)
                              setAlertContent({
                                    ...alertContent,
                                    title: "Success",
                                    type: "Success",
                                    message: "Successfully update the student"
                              })
                              setAlertShow(true)
                        })
                        .catch((error)=>{
                              setAlertContent({
                                    ...alertContent,
                                    title: "Error",
                                    type: "Fail",
                                    message: "There's something wrong in the server"
                              })

                              setAlertShow(true)
                        })
                  onHide();
            }
            
      }

      function onDeleteClick(student){

          let studenttodelete = {
               id: student.id
          }

          StudentService.deleteStudent(studenttodelete)
          .then((response)=>{
               setStudentChanged(!studentChanged)
               setAlertContent({
                     ...alertContent,
                     title: "Success",
                     type: "Success",
                     message: "Successfully deleted the student"
               })
               setAlertShow(true)
         })
         .catch((error)=>{
               setAlertContent({
                     ...alertContent,
                     title: "Error",
                     type: "Fail",
                     message: "There's something wrong in the server"
               })

               setAlertShow(true)
         })
         onHide();
      }

      function onInputChange(e){
            //e.target.value && e.target.id
            setStudent({
                  ...student,
                  [e.target.name]: e.target.value
            })
      }

      //TODO
      function validate(student){

            let validfirstname = false
            let validlastname = false

            if(student)
                  if(student.firstname)
                    validfirstname = true

            if(student)
                  if(student.lastname)
                    validlastname = true

            setFormValidation(
                  {
                        ...formValidation,
                        firstname: validfirstname,
                        lastname: validlastname
                  }
            )
            
            if(validfirstname && validlastname)
                  return true;
            
            return false;
      }

      function validate(courseToAdd){
            let courseAdded = false

            if(courseToAdd)
                  if(courseToAdd.name !== "Select Course")
                        courseAdded = true
            
            setFormValidation(
                  {
                        ...formValidation,
                        coursetoadd: courseAdded
                  }
            )

            if(courseAdded)
                  return true;
            
            return false;
      }

      function dropCourse(course){
            console.log("dropping course...")
            StudentService.removeCourseForStudent(student.id, course)
            .then((response)=>{
                  setStudentChanged(!studentChanged)
                  setAlertContent({
                        ...alertContent,
                        title: "Success",
                        type: "Success",
                        message: "Successfully remove " + course.name 
                  })
                  setAlertShow(true)
                  setStudent(response.data)
            })
            .catch((error)=>{
                  setAlertContent({
                        ...alertContent,
                        title: "Error",
                        type: "Fail",
                        message: "There's something wrong in the server"
                  })

                  setAlertShow(true)
            })
      }

      function registerCourse(){
            console.log("registering course...")

            const validated = validate(courseToAdd)

            if(validated){
                  StudentService.registerCourseForStudent(student.id, courseToAdd)
                        .then((response)=>{
                              setStudentChanged(!studentChanged)
                              setAlertContent({
                                    ...alertContent,
                                    title: "Success",
                                    type: "Success",
                                    message: "Successfully added " + courseToAdd.name 
                              })
                              setAlertShow(true)
                              setStudent(response.data)
                        })
                        .catch((error)=>{
                              setAlertContent({
                                    ...alertContent,
                                    title: "Error",
                                    type: "Fail",
                                    message: "There's something wrong in the server. Student already registered for this course?"
                              })

                              setAlertShow(true)
                        })
            }
      }

      function onSelectCourse(e){
            var selectedIndex = e.target.options.selectedIndex;
            var courseId= e.target.options[selectedIndex].getAttribute('courseid');
            setCourseToAdd({
                  id: courseId,
                  name: e.target.value
            })
      }

      return(
            <Modal
                  onHide={onHide}
                  show={show}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  backdrop="static"
                  keyboard={false}
                  className="student-modal"
            >
                  <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        {studentModalState? studentModalState : 'undefined'} student
                        </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container>
                         <Row className='mb-3'>
                              <Col md={6}>
                                   <label className="form-label" htmlFor="code"><b>First Name*</b></label>
                                   <input placeholder={student? student.firstname : 'Enter first name'} type="text" name="firstname" className="form-control" onChange={(e)=>onInputChange(e)}/>
                                   <small className="form-text" style={{display:`${formValidation.firstname? 'none': ''}`,color:'red'}}>Code cannot be empty</small>
                              </Col>
                              <Col md={6}>
                                   <label className="form-label" htmlFor="name"><b>Last Name*</b></label>
                                   <input placeholder={student? student.lastname : 'Enter last name'} type="text" name="lastname" className="form-control" onChange={(e)=>onInputChange(e)}/>
                                   <small className=" form-text" style={{display:`${formValidation.lastname? 'none': ''}`, color:'red'}}>Name cannot be empty</small>
                              </Col>
                         </Row>
                         {
                              studentModalState === "Edit" ?
                              <>
                                    <Row>
                                          <Col>
                                          <b>Registered Courses</b>
                                          </Col>
                                    </Row>
                                    <Row className='mb-3'>
                                          <table id="modalTable">
                                                <thead>
                                                      <th style={{width:"10%"}}>No.</th><th style={{width:"50%"}}>Name</th><th style={{width:"30%"}}>Action</th>
                                                </thead>
                                                <tbody>
                                                      {student.courseRegistered.map((course, index)=>{
                                                            return(
                                                                  <tr>
                                                                        <td>{index+1}</td>
                                                                        <td>{course.name}</td>
                                                                        <td align="center">
                                                                              <Button style={{marginRight:"3pt"}} onClick={()=>{dropCourse(course)}}>Remove</Button>
                                                                        </td>
                                                                  </tr>
                                                            )
                                                      })}
                                                      <tr>{addCourseMode===false ? 
                                                            <td colSpan={3} align="center" onClick={()=>setAddCourseMode(true)}>
                                                                  Register a course
                                                            </td>
                                                            :
                                                            <>
                                                                  <td colSpan={2} align="center">
                                                                        <select onChange={onSelectCourse} id={"filter"} value={courseToAdd.name}>
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
                                                                        <small className="form-text" style={{display:`${formValidation.coursetoadd? 'none': ''}`,color:'red'}}>Please select a course to be added</small>
                                                                  </td>
                                                                  <td align="center">
                                                                        <Button style={{marginRight:"3pt"}} onClick={registerCourse}>Add</Button>
                                                                        <Button style={{marginRight:"3pt"}} onClick={()=>setAddCourseMode(false)}>Cancel</Button>
                                                                  </td>
                                                            </>
                                                      }
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </Row>
                              </>
                              :
                              null
                         }
                         
                    </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={()=>onDeleteClick(student)}>Delete</Button>
                  <Button onClick={()=>onSaveClick(student)}>Save</Button>
                  </Modal.Footer>
            </Modal>
      )
}

export default StudentModal