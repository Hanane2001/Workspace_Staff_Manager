const Btnclose = document.getElementById('closeModal');
const BtnAddWorkers = document.getElementById('addWorkerBtn');
const WorkersContainer = document.getElementById('unassignedStaff');
const AddEmploy = document.getElementById('employeeModal');

function AfficherFormuleWorkers() {
    BtnAddWorkers.addEventListener('click', () => {
        AddEmploy.classList.remove('hidden');
    });
    Btnclose.addEventListener('click', () => {
        AddEmploy.classList.add('hidden');
    });
}
AfficherFormuleWorkers();

// const EmployeName = document.getElementById('employeeName').value.trim();
// const EmployeRole = document.getElementById('employeeRole').value.trim();
// const EmployePhotoUrl = document.getElementById('employeePhoto').value.trim();
const EmployePhotoPreview = document.getElementById('photoPreview');
// const EmployeEmail = document.getElementById('employeeEmail').value.trim();
// const EmployePhone = document.getElementById('employeePhone').value.trim();
const EmployeExperience = document.getElementById('addExperience');
const ExperienceContainer = document.getElementById('experiencesContainer');
const BtnCancelEmploye = document.getElementById('cancelEmployee');
const BtnAddEmploye = document.getElementById('AddEmployee');


let Workers = JSON.parse(localStorage.getItem("Workers")) || [];

// function SauvgarderEmploye(){
//     return localStorage.setItem('workers', JSON.stringify(Workers))
// }
// SauvgarderEmploye();

function validateForm() {
    employeeModal.addEventListener('submit', (e) => {
        e.preventDefault();
        const experiences = getAllExperiences();

        const EmployeInfo = {
            EmployeName: document.getElementById('employeeName').value.trim(),
            EmployeRole: document.getElementById('employeeRole').value.trim(),
            EmployePhotoUrl: document.getElementById('employeePhoto').value.trim(),
            EmployeEmail: document.getElementById('employeeEmail').value.trim(),
            EmployePhone: document.getElementById('employeePhone').value.trim(),
            EmployeExperiences: experiences,
            EmployeLocation: null
        };
        let EmployeNameRe = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
        let EmployeEmailRe = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
        let EmployePhoneRe = /^[0-9]{9}$/;

        if (EmployeInfo.EmployeName === "" || EmployeInfo.EmployeEmail === "" || EmployeInfo.EmployeRole === "") {
            alert("Fill in all the fields!");
            return;
        }

        if (!EmployeNameRe.test(EmployeInfo.EmployeName)) {
            alert('Name can contain only letters and spaces');
            return;
        }

        if (!EmployeEmailRe.test(EmployeInfo.EmployeEmail)) {
            alert('Please enter a valid email address');
            return;
        }
        if (!EmployePhoneRe.test(EmployeInfo.EmployePhone)) {
            alert('Enter a valid 10-digit number');
            return;
        }
        Workers.push(EmployeInfo);

        localStorage.setItem("Workers", JSON.stringify(Workers));
        alert("User added!!!");
        AfficherEmployer(Workers);

    });
    function getAllExperiences() {
        const fields = ExperienceContainer.querySelectorAll('.experience-field');
        let experiences = [];

        fields.forEach(field => {
            const expInput = field.querySelector('.experience-input').value.trim();
            const startDate = field.querySelector('.start-date').value;
            const endDate = field.querySelector('.end-date').value;

            experiences.push({
                poste: expInput,
                start: startDate,
                end: endDate
            });
        });

        return experiences;
    }

}
validateForm();

function AfficherEmployer(Workers) {
    if (!WorkersContainer) return;
    WorkersContainer.innerHTML = '';
    Workers.forEach(data => {
        WorkersContainer.innerHTML += `<div class="Worker-Field flex items-center shadow-xl mb-[2%] p-[2%]">
                    <img class="rounded-full w-[20%] m-2" src="${data.EmployePhotoUrl}">
                    <div class="ml-2 flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-800 truncate">${data.EmployeName}</p>
                        <p class="text-xs text-gray-500 capitalize">${data.EmployeRole}</p>
                    </div>
                    <button type="button" class="Modifier-Worker px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                        <i class="fas fa-times mr-1"></i>Modifier
                    </button>
                </div>`;
        localStorage.setItem("Workers", JSON.stringify(Workers));
    });
}
AfficherEmployer(Workers);
// let WorkersProf = document.querySelectorAll('.Worker-Field');

function CancelFormulaire() {
    BtnCancelEmploye.addEventListener('click', () => {
        AddEmploy.classList.add('hidden');
    });
}
CancelFormulaire();

EmployeExperience.addEventListener('click', () => {
    addExperienceForm();
});

function addExperienceForm() {
    const experienceCount = ExperienceContainer.children.length + 1;
    const experienceField = document.createElement('div');
    experienceField.className = 'experience-field mb-4 p-4 border border-gray-200 rounded-lg';
    experienceField.setAttribute('data-experience-id', experienceCount);
    experienceField.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <h4 class="text-lg font-medium">Experience ${experienceCount}</h4>
            <button type="button" class="remove-experience px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                <i class="fas fa-times mr-1"></i>remove
            </button>
        </div>
        <div class="mb-3">
            <input type="text" class="experience-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Poste et entreprise">
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                <input type="date" class="start-date w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                <input type="date" class="end-date w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
        </div>`;

    ExperienceContainer.appendChild(experienceField);
    experienceField.querySelector('.remove-experience').addEventListener('click', function () {
        if (ExperienceContainer.children.length > 1) {
            ExperienceContainer.removeChild(experienceField);
            updateExperienceNumbers();
        }
    });
}
function updateExperienceNumbers() {
    const experienceFields = ExperienceContainer.querySelectorAll('.experience-field');
    experienceFields.forEach((field, index) => {
        const title = field.querySelector('h4');
        const experienceNumber = index + 1;
        title.textContent = `Experience ${experienceNumber}`;
        field.setAttribute('data-experience-id', experienceNumber);
    });
}

const Add_Employee_Btn_archive = document.getElementById('add-employee-btn-archive');
const Add_Employee_Btn_staff = document.getElementById('add-employee-btn-staff');
const Add_Employee_Btn_server = document.getElementById('add-employee-btn-server');
const Add_Employee_Btn_reception = document.getElementById('add-employee-btn-reception'); 
const Add_Employee_Btn_security = document.getElementById('add-employee-btn-security'); 
const Add_Employee_Btn_conference = document.getElementById('add-employee-btn-conference');
const AssignModal = document.getElementById('assignModal');
const BtnCloseAssignModal = document.getElementById('closeAssignModal');
// const AfficheNamesWorkerContainer = document.querySelector('.container');

function AfficherFormuleAssign() {
    Add_Employee_Btn_archive.addEventListener('click', () => {
        AssignModal.classList.remove('hidden');
    });
    Add_Employee_Btn_staff.addEventListener('click', () => {
        AssignModal.classList.remove('hidden');
    });
    Add_Employee_Btn_server.addEventListener('click', () => {
        AssignModal.classList.remove('hidden');
    });
    Add_Employee_Btn_security.addEventListener('click', () => {
        AssignModal.classList.remove('hidden');
    });
    Add_Employee_Btn_reception.addEventListener('click', () => {
        AssignModal.classList.remove('hidden');
    });
    Add_Employee_Btn_conference.addEventListener('click', () => {
        AssignModal.classList.remove('hidden');
    });
    BtnCloseAssignModal.addEventListener('click', () => {
        AssignModal.classList.add('hidden');
    });
}
AfficherFormuleAssign();

const ProfileModal = document.getElementById('profileModal');
const BtnCloseProfileModal = document.getElementById('closeProfileModal');
const ProfilePhoto = document.getElementById('profilePhoto');
const ProfileName = document.getElementById('profileName');
const ProfileRole = document.getElementById('profileRole');
const ProfileEmail = document.getElementById('profileEmail');
const ProfilePhone = document.getElementById('profilePhone');
const ProfileLocation = document.getElementById('profileLocation');
const ProfileExperiences = document.getElementById('profileExperiences');
const BtnCloseProfile = document.getElementById('closeProfile');

