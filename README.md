# Student Catalog Spring Boot Application

Rest API for Student Catalog Application

## Description

Rest API for Student Catalog Application. User can get, add, update or remove students.
Additionally, user can also register course for student.

## Getting Started
* Clone from https://github.com/rhmnlm/student-spring-application

## Dependencies
* Java 8
* Maven 3.6.+
* MySQL 5.7

## Installing
* write ``mvn clean install`` in terminal to install all dependencies
* Set up mysql and configure setting (port, username, password) in spring boot application's application.yml file

## Executing program

* Run the program by simply type in
```
mvn spring-boot:run
```


## APIs

A Postman Collection can be found in src\main\resources\schoolapplication.postman_collection.json

###Student APIs

#### /students/lists
````
* Description: get lists of students 
* Method: GET
* Params: int pageNum, int pageSize
* Return: Page<Student>
````

#### /students/{id}
````
* Description: get a student by id
* Method: GET
* Path Variable: student's id (Integer)
* Return: Student
````

#### /students/course/{id}
````
* Description: get lists of students registerd under the course id
* Method: GET
* Path Variable: course's id (Integer)
* Return: Page\<Student>
````

#### /students/add
````
* Description: add a new student
* Method: POST
* RequestBody: Student
* Return: Student
````

#### /students/{studentId}/courses
````
* Description: register a course for student
* Method: POST
* PathVariable: studentId
* RequestBody: Course
* Return: Student
````

#### students/{studentId}/courses/drop
````
* Description: drop a course for student
* Method: POST
* PathVariable: studentId
* RequestBody: Course
* Return: Student
````


#### /students/update/{id}
````
* Description: update a student by id
* Method: PUT
* PathVariable: studentId
* RequestBody: Student
* Return: Student
````

#### /students/delete
````
* Description: delete a student
* Method: DELETE
* RequestBody: Student
* Return: Student
````

###Course APIs

#### /course/lists
````
* Description: get lists of course 
* Method: GET
* Params: int pageNum, int pageSize
* Return: Page<Course>
````
#### /course/{id}
````
* Description: get a course by id
* Method: GET
* PathVariable: courseId
* Return: Course
````
#### /course/add
````
* Description: add a course
* Method: POST
* RequestBody: Course
* Return: Course
````
#### /course/update/{id}
````
* Description: update a course
* Method: PUT
* Pathvariable: courseId
* RequestBody: Course
* Return: Course
````
#### /course/delete
````
* Description: delete a course
* Method: DELETE
* RequestBody: Course
* Return: Course
````

## Help

Any advice for common problems or issues.
```
contact https://github.com/rhmnlm
```