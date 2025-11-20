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



// const roleRestrictions = {
//     'receptionist': ['reception'],
//     'technician': ['server'],
//     'security': ['security'],
//     'cleaning': ['no-archive'],
//     'manager': [],
//     'other': []
// };
// const newEmployee = {
//     id: Date.now(),
//     name,
//     role,
//     photo,
//     email,
//     phone,
//     experiences,
//     location: null
// };

// function SauvgarderEmploye(){
//     return localStorage.setItem('workers', JSON.stringify(Workers))
// }
// SauvgarderEmploye();

function validateForm() {
    employeeModal.addEventListener('submit', (e) => {
        e.preventDefault();
        const EmployeInfo = {
            EmployeName: document.getElementById('employeeName').value.trim(),
            EmployeRole: document.getElementById('employeeRole').value.trim(),
            EmployePhotoUrl: document.getElementById('employeePhoto').value.trim(),
            EmployeEmail: document.getElementById('employeeEmail').value.trim(),
            EmployePhone: document.getElementById('employeePhone').value.trim()
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
        alert("Utilisateur ajouté !");
        AfficherEmployer(Workers);
    });
}
validateForm();

function AfficherEmployer(Workers) {
    if (!WorkersContainer) return;
    WorkersContainer.innerHTML = '';
    Workers.forEach(data => {
        WorkersContainer.innerHTML += `<div class="flex items-center shadow-xl mb-[2%]">
                    <img class="rounded-full w-[20%] m-2" src="${data.EmployePhotoUrl}">
                    <div class="ml-2 flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-800 truncate">${data.EmployeName}</p>
                        <p class="text-xs text-gray-500 capitalize">${data.EmployeRole}</p>
                    </div>
                </div>`
        localStorage.setItem("Workers", JSON.stringify(Workers));
    });
}
AfficherEmployer(Workers);

function CancelFormulaire() {
    BtnCancelEmploye.addEventListener('click', () => {
        AddEmploy.classList.add('hidden');
    });
}
CancelFormulaire();

function addExperienceForm() {
    const experienceCount = ExperienceContainer.children.length;
    const experienceField = document.createElement('div');
    experienceField.className = 'experience-field mb-4 p-4 border border-gray-200 rounded-lg';
    experienceField.innerHTML = `
        <div class="mb-3">
            <input type="text" class="experience-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Poste et entreprise">
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                <input type="date" class="start-date w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                <input type="date" class="end-date w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
        </div>
        <div class="flex justify-end">
            <button type="button" class="remove-experience px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                <i class="fas fa-times mr-1"></i>Supprimer
            </button>
        </div>`;
    ExperienceContainer.appendChild(experienceField);
    experienceField.querySelector('.remove-experience').addEventListener('click', function () {
        if (ExperienceContainer.children.length > 1) {
            ExperienceContainer.removeChild(experienceField);
        }
    });
}
