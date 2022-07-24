import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import StudentService from '../api/studentApi'
import { useState } from 'react';

function StudentModal(props){

      const {student, setStudent, onHide, show, studentModalState, alertState} = props;

      const {alertContent, setAlertContent, setAlertShow} = alertState;

      const [formValidation , setFormValidation] = useState({
            firstname: true,
            lastname: true
      })

      function onSaveClick(student){

            //validation

            const validated = validate(student)
            
            if(validated){
                  studentModalState === "Create" ?
                        StudentService.addNewStudent(student)
                        .then(()=>{
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
                        StudentService.updateStudent(student)
                        .then(()=>{
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
          .then(()=>{
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
      }

      function onInputChange(e){
            //e.target.value && e.target.id
            setStudent({
                  ...student,
                  [e.target.id]: e.target.value
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
                        firstname: validfirstname,
                        lastname: validlastname
                  }
            )
            
            if(validfirstname && validlastname)
                  return true;
            
            return false;
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
                                   <input placeholder={student? student.firstname : 'Enter first name'} type="text" id="firstname" className="form-control" onChange={(e)=>onInputChange(e)}/>
                                   <small className="form-text" style={{display:`${formValidation.firstname? 'none': ''}`,color:'red'}}>Code cannot be empty</small>
                              </Col>
                              <Col md={6}>
                                   <label className="form-label" htmlFor="name"><b>Last Name*</b></label>
                                   <input placeholder={student? student.lastname : 'Enter last name'} type="text" id="lastname" className="form-control" onChange={(e)=>onInputChange(e)}/>
                                   <small className=" form-text" style={{display:`${formValidation.lastname? 'none': ''}`, color:'red'}}>Name cannot be empty</small>
                              </Col>
                         </Row>
                         <Row>
                              <Col>
                                   <b>Registered Courses</b>
                              </Col>
                         </Row>
                         <Row className='mb-3'>
                              <Col>
                              {`[Registered course]`}
                              </Col>
                         </Row>
                         <Row>
                              <Col md={6}>Add course</Col> <Col md={6}>Remove course</Col>
                         </Row>
                         <Row>
                              <Col md={6}>
                              <select>
                                   <option>
                                        Mathematic
                                   </option>
                              </select>
                              </Col>
                              <Col md={6}>
                              <select>
                                   <option>
                                        Mathematic
                                   </option>
                              </select>
                              </Col>
                         </Row>
                    </Container>
                        <div className="mb-3">
                              
                              
                        </div>
                        <div className="mb-3">
                              
                        </div>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={()=>onDeleteClick(student)}>Delete</Button>
                  <Button onClick={()=>onSaveClick(student)}>Save</Button>
                  </Modal.Footer>
            </Modal>
      )
}

export default StudentModal