import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import CourseService from '../api/courseApi';

function CourseRow(props){

    const { index , course, courseChanged, setCourseChanged, alertState } = props;

    const {alertContent, setAlertContent, setAlertShow} = alertState;

    const [editMode, setEditMode] = useState(false)
    const [courseToUpdate, setCourseToUpdate] = useState(course);


    function onSaveClick(){
        CourseService.updateCourse(courseToUpdate.id, courseToUpdate).
        then((response)=>{
            setAlertContent({
                ...alertContent,
                title: "Success",
                type: "Success",
                message: "Successfully updated the course"
            })
            setCourseChanged(!courseChanged)
        })
        setEditMode(false)
        setAlertShow(true)
    }

    function onCancelClick(){
        setCourseToUpdate(course)
        setEditMode(false)
    }

    function onEditClick(){
        setEditMode(true)
    }

    function onDeleteCourse(course){

        let coursetodelete = {
             id: course.id,
             name: course.name
        }

        CourseService.deleteCourse(coursetodelete)
        .then(()=>{
             setAlertContent({
                   ...alertContent,
                   title: "Success",
                   type: "Success",
                   message: "Successfully deleted the course"
             })
             setCourseChanged(!courseChanged);
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
        setCourseToUpdate({
            ...courseToUpdate,
            [e.target.name] : e.target.value
        }  
        )
    }

    return(
        <tr key={index}>
            <td>{index + 1}</td>
            <td>
                {editMode?
                    <input type="text" name={"name"} onChange={onInputChange} value={courseToUpdate.name}></input>
                    :
                    <>
                        {course.name}
                    </>
                }
            </td>
            <td style={{display:"flex", justifyContent:"center"}}>
                {editMode?
                    <>
                        <Button style={{marginRight:"3pt"}} onClick={onSaveClick}>Save</Button>
                        <Button style={{marginRight:"3pt"}} onClick={onCancelClick}>Cancel</Button>
                    </>
                    :
                    <Button style={{marginRight:"3pt"}} onClick={onEditClick}>Edit</Button>
                }
                <Button style={{marginRight:"3pt"}} onClick={()=>{onDeleteCourse(course)}}>Delete</Button>
            </td>
        </tr>
    )

}

export default CourseRow;