const form = document.getElementById('studentForm')
const studentList = document.getElementById('studentList')
const submitButton = document.querySelector('#studentForm button');

let editingStudentId = null
document.addEventListener('DOMContentLoaded', fetchStudent);


form.addEventListener('submit',async(e)=>{
    e.preventDefault()


    const studentData = {
        name : document.getElementById('name').value,
        age : document.getElementById('age').value,
        email : document.getElementById('email').value,
        course : document.getElementById('course').value,
    }
    console.log(studentData)

    if(!editingStudentId){
     await fetch(`/students`,{
        method:'POST',
        headers :{'Content-Type' : 'application/json'},
        body: JSON.stringify(studentData)
     })
    }
    form.reset();
    fetchStudent()
})

async function  fetchStudent() {
    const response = await fetch('/students')
    if(!response.ok) throw new Error('Failed to fetch students')
    const students = await response.json()

    displayStudens(students)
}

function displayStudens(students){
    studentList.innerHTML = ""

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <button onclick="editStudent('${student._id}', '${student.name}', '${student.age}', '${student.email}', '${student.course}')">✏️ Edit</button>
                <button onclick="deleteStudent('${student._id}')">❌ Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}
async function deleteStudent(id){
    const conformDelete = confirm('Do You want to delete this student')
    if(!conformDelete)return
    try {
        const response = await fetch(`/students/${id}`,{
            method : 'DELETE'
        })
        if(response.ok){
            alert('student deleted succssfully')
            fetchStudent()
        }
    } catch (error) {
        
    }
}

function editStudent(id , name , age , email , course){
    document.getElementById('name').value = name;
    document.getElementById('age').value = age;
    document.getElementById('email').value = email;
    document.getElementById('course').value = course;
    editingStudentId = id;
 submitButton.textContent = 'Update Student'
}

fetchStudent()