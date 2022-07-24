import './App.css';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import StudentService from './api/studentApi';
import Pagination from './component/Pagination';
import CustomAlert from './component/Alert';
import StudentModal from './component/StudentModal';

function App() {

      const [data, setData] = useState(null);

      const [student, setStudent] = useState({});

      const [page, setPage] = useState({
            pageNum: 0,
            pageSize: 5
            })

      const [modalShow, setModalShow] = useState(false);

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

      useEffect(() => {
          StudentService.getStudentsPaged(page.pageNum, page.pageSize).then((response)=>{
                  setData(response.data)
                  console.log(response)
            })
      }, [page]);

      function onClickItem(student){
          setStudent(student)
          setModalShow(true)
          setStudentModalState("Edit")
      }

      function onAddNewItem(e){
          setStudent()
          setModalShow(true)
          setStudentModalState("Create")
      }

  if(!data) return <>Error!</>;

  return (
    <div className="App">
        <Container>
            <div className="mb3" style={{"display":"flex", "justifyContent": "left"}}>
                  <Button className="add-student" 
                    onClick={() => onAddNewItem()} 
                    style={{marginBottom:"5pt", marginTop: "5pt", marginRight: "5pt"}}>
                         Add Student
                    </Button>
                    <Button className="add-student" 
                    onClick={() => onAddNewItem()} 
                    style={{marginBottom:"5pt", marginTop: "5pt"}}>
                         Update Course
                    </Button>
                    <div className='filter' style={{marginLeft: "auto", marginTop: "10pt"}}>
                         <label htmlFor='studentFilter'>course filter</label>
                         <select>
                              <option defaultChecked>select course</option>
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
                                                            <a href="# " onClick={() => onClickItem(student)}>
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
                        <></>
                  }
            </tbody>
          </Table>
          <Pagination page={page} setPage={setPage} lastPage={data.totalPages}/> 
        </Container>
        <StudentModal alertState={alertState} show={modalShow} onHide={() => setModalShow(false)} student={student} setStudent={setStudent} studentModalState={studentModalState}/>
        <CustomAlert alertState={alertState} onHide={()=> setAlertShow(false)}/>
    </div>
  );
}

export default App;