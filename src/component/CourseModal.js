import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


import CourseService from '../api/courseApi'
import CourseRow from './CourseRow';

function CourseModal(props){

    const {alertState, show, onHide} = props;
    const {courses, setCourses, courseChanged, setCourseChanged} = props;
    const {alertContent, setAlertContent, setAlertShow} = alertState;
    const [addMode, setAddMode] = useState(false);

    const [courseToAdd, setCourseToAdd] = useState();

    function onAddCourse(){

        //validation

        // const validated = validate(course)

        const validated = true;
        
        if(validated){
            CourseService.addNewCourse(courseToAdd)
                .then((response)=>{
                    console.log(response)
                    let addedcourse = courses;
                    addedcourse.push(response);
                    setCourses(addedcourse);
                    setCourseChanged(!courseChanged);
                    setAlertContent({
                        ...alertContent,
                        title: "Success",
                        type: "Success",
                        message: "Successfully added a course"
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

            //   studentModalState === "Create" ?
            //         StudentService.addNewStudent(student)
            //         .then(()=>{
            //               setAlertContent({
            //                     ...alertContent,
            //                     title: "Success",
            //                     type: "Success",
            //                     message: "Successfully added a student"
            //               })

            //               setAlertShow(true)
            //         })
            //         .catch((error)=>{
            //               setAlertContent({
            //                     ...alertContent,
            //                     title: "Error",
            //                     type: "Fail",
            //                     message: "There's something wrong in the server"
            //               })

            //               setAlertShow(true)
            //         })
            //         :
            //         StudentService.updateStudent(student)
            //         .then(()=>{
            //               setAlertContent({
            //                     ...alertContent,
            //                     title: "Success",
            //                     type: "Success",
            //                     message: "Successfully update the student"
            //               })
            //               setAlertShow(true)
            //         })
            //         .catch((error)=>{
            //               setAlertContent({
            //                     ...alertContent,
            //                     title: "Error",
            //                     type: "Fail",
            //                     message: "There's something wrong in the server"
            //               })

            //               setAlertShow(true)
            //         })
        }
        setAddMode(false)
        
  }

    function onInputChange(e){
        //e.target.value && e.target.id
        setCourseToAdd({
              ...courseToAdd,
              [e.target.name]: e.target.value
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
                         Courses
                        </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container>
                         <Row className='mb-3 mt-3'>
                            <table id="modalTable">
                                <thead>
                                    <th style={{width:"10%"}}>No.</th><th style={{width:"60%"}}>Name</th><th style={{width:"30%"}}>Action</th>
                                </thead>
                                <tbody>
                                    {courses.map((course, index)=>{
                                    return(
                                            <CourseRow index={index} course={course} courseChanged={courseChanged} setCourseChanged={setCourseChanged} alertState={alertState}
                                            />
                                        )
                                    })}
                                    <tr>{addMode===false ? 
                                            <td colSpan={3} align="center" onClick={()=>setAddMode(true)}>
                                                Add new course
                                            </td>
                                            :
                                            <>
                                                <td></td>
                                                <td><input type={"text"} name="name" onChange={(e)=>onInputChange(e)}></input></td>
                                                <td align="center">
                                                    <Button style={{marginRight:"3pt"}} onClick={()=>onAddCourse()}>Save</Button>
                                                    <Button style={{marginRight:"3pt"}} onClick={()=>setAddMode(false)}>Cancel</Button>
                                                </td>
                                            </>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                              
                         </Row>
                    </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={onHide}>Back to listings</Button>
                  </Modal.Footer>
            </Modal>
    )
}

export default CourseModal