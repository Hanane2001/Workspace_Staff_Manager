const Btnclose = document.getElementById('closeModal');
const BtnAddWorkers = document.getElementById('addWorkerBtn');
const WorkersContainer = document.getElementById('unassignedStaff');
const AddEmploy = document.getElementById('employeeModal');

function AfficherFormuleWorkers(){
    BtnAddWorkers.addEventListener('click', ()=>{
        AddEmploy.classList.remove('hidden');
    });
    Btnclose.addEventListener('click',()=>{
        AddEmploy.classList.add('hidden');
    })
}
AfficherFormuleWorkers();

const EmployeName = document.getElementById('employeeName');
const EmployeRole = document.getElementById('employeeRole');
const EmployePhotoUrl = document.getElementById('employeePhoto');
const EmployePhotoPreview = document.getElementById('photoPreview');
const EmployeEmail = document.getElementById('employeeEmail');
const EmployePhone = document.getElementById('employeePhone');
const EmployeExperience = document.getElementById('addExperience');
const ExperienceContainer = document.getElementById('experiencesContainer');
const BtnCancelEmploye = document.getElementById('cancelEmployee');

let Workers = [
    {
        name : "hanane",
        role : "manager",
        photoContent: "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg"
    },
    {
        name : "ahmed",
        role : "technician",
        photoContent: "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg"
    },
    {
        name : "said",
        role : "security",
        photoContent: "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg"
    }
];
