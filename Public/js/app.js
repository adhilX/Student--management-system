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
   let response;

    if(editingStudentId){
         response = await fetch( `/students/${editingStudentId}`,{
            method: 'PUT',
            headers :{'Content-Type' : 'application/json'},
            body : JSON.stringify(studentData)
        })

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Student updated successfully!"
            });
            
            editingStudentId = null;
            submitButton.textContent = 'Add Student';
            
        } else {
         Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to save student. Please try again."
            });
        
            return
        }
        
        console.log(response)
    
    }else{
        console.log('uyhgjjjjjjjjjj')
        
         response = await fetch(`/students`,{
            method:'POST',
            headers :{'Content-Type' : 'application/json'},
            body: JSON.stringify(studentData)
         })
         const responseDATA = await response.json()
         if (response.ok) {
          await Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Student add successfully!"
            });
        }else{
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: responseDATA.error || "Failed to add student. Please try again."
            });
        
        }
    }
    form.reset();
  await fetchStudent();
})

async function  fetchStudent() {
    const response = await fetch('/students')
    if(!response.ok) throw new Error('Failed to fetch students')
    const students = await response.json()

    displayStudents(students)
}

function displayStudents(students){
    studentList.innerHTML = ""

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <button class="edit-btn" onclick="editStudent('${student._id}', '${student.name}', '${student.age}', '${student.email}', '${student.course}')">✏️ Edit</button>
                <button class="delete-btn" onclick="deleteStudent('${student._id}')">❌ Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}
async function deleteStudent(id) {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;
    try {
        const response = await fetch(`/students/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Student deleted successfully.",
            });
            fetchStudent(); 
        } 
        
    } catch (error) {
        console.error("Error deleting student:", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again.",
        });
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

