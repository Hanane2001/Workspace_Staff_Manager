//*** Tous les variables globales ***
const Btnclose = document.getElementById('closeModal');
const BtnAddWorkers = document.getElementById('addWorkerBtn');
const WorkersContainer = document.getElementById('unassignedStaff');
const AddEmploy = document.getElementById('employeeModal');

const EmployePhotoPreview = document.getElementById('photoPreview');
const EmployeExperience = document.getElementById('addExperience');
const ExperienceContainer = document.getElementById('experiencesContainer');
const BtnCancelEmploye = document.getElementById('cancelEmployee');
const BtnAddEmploye = document.getElementById('AddEmployee');

const PlaceReception = ["RoomConferenceID", "RoomReceptionID", "RoomStaffID"];
const PlaceServer = ["RoomConferenceID", "RoomServerID", "RoomStaffID"];
const PlaceSecurity = ["RoomConferenceID", "RoomSecurityID", "RoomStaffID"];
const PlaceManager = ["RoomConferenceID", "RoomReceptionID", "RoomServerID", "RoomSecurityID", "RoomStaffID", "RoomArchiveID"];
const PlaceCleaning = ["RoomConferenceID", "RoomReceptionID", "RoomServerID", "RoomSecurityID", "RoomStaffID"];
const PlaceOther = ["RoomConferenceID", "RoomStaffID"];

const Add_Employee_Btn_archive = document.getElementById('add-employee-btn-archive');
const Add_Employee_Btn_staff = document.getElementById('add-employee-btn-staff');
const Add_Employee_Btn_server = document.getElementById('add-employee-btn-server');
const Add_Employee_Btn_reception = document.getElementById('add-employee-btn-reception');
const Add_Employee_Btn_security = document.getElementById('add-employee-btn-security');
const Add_Employee_Btn_conference = document.getElementById('add-employee-btn-conference');
const AssignModal = document.getElementById('assignModal');
const BtnCloseAssignModal = document.getElementById('closeAssignModal');

const RoomConferenceID = document.getElementById('RoomConference'); 
const RoomReceptionID = document.getElementById('RoomReception');  
const RoomServerID  = document.getElementById('RoomServer'); 
const RoomSecurityID = document.getElementById('RoomSecurity');  
const RoomStaffID  = document.getElementById('RoomStaff'); 
const RoomArchiveID = document.getElementById('RoomArchive'); 

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

let RoleCleaning = [];
let RoleManager = [];
let RoleServerIT = [];
let RoleSecurity = [];
let RoleOther = [];
let RoleReception = [];

let Workers = JSON.parse(localStorage.getItem("Workers")) || [];

//*** fonction qui affiche formule d'ajouter un employe ***
function AfficherFormuleWorkers() {
    BtnAddWorkers.addEventListener('click', () => {
        AddEmploy.classList.remove('hidden');
    });
    Btnclose.addEventListener('click', () => {
        AddEmploy.classList.add('hidden');
    });
}
AfficherFormuleWorkers();

// function SauvgarderEmploye(){
//     return localStorage.setItem('workers', JSON.stringify(Workers))
// }
// SauvgarderEmploye();

//*** fonction qui donne tous les experiences d'un employe ***
function getAllExperiences() {
        const fields = ExperienceContainer.querySelectorAll('.experience-field');
        let experiences = [];

        fields.forEach(field => {
            const expInput = field.querySelector('.experience-input').value.trim();
            const startDate = field.querySelector('.start-date').value;
            const endDate = field.querySelector('.end-date').value;

            if (expInput) {
            experiences.push({
                poste: expInput,
                start: startDate,
                end: endDate
            });
        }
        });
        return experiences;
}

//*** fonction qui valide une formule ***
function validateForm() {
    const employeeForm = document.getElementById('employeeForm');
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const experiences = getAllExperiences();
        const EmployeInfo = {
            id: workerIdCounter.toString(),
            EmployeName: document.getElementById('employeeName').value.trim(),
            EmployeRole: document.getElementById('employeeRole').value.trim(),
            EmployePhotoUrl: document.getElementById('employeePhoto').value.trim(),
            EmployeEmail: document.getElementById('employeeEmail').value.trim(),
            EmployePhone: document.getElementById('employeePhone').value.trim(),
            EmployeExperiences: experiences,
            EmployeLocation: null
        };
        workerIdCounter++;
        //*** fonction qui assigner a chambre ***
        function assignRooms(role) {
            switch(role) {
                case "manager": 
                    return PlaceManager;
                case "receptionist":
                    return PlaceReception;
                case "technician":
                    return PlaceServer;
                case "security":
                    return PlaceSecurity;
                case "cleaning":
                    return PlaceCleaning;
                default:
                    return PlaceOther;
            }
        }

    EmployeInfo.rooms = assignRooms(EmployeInfo.EmployeRole);

        let EmployeNameRe = /^[a-zA-ZÀ-ÿ\s]{2,30}$/;
        let EmployeEmailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let EmployePhoneRe = /^[0-9]{10}$/;

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

        EmployeInfo.EmployePhotoUrl = getImageUrl(EmployeInfo.EmployePhotoUrl);
        
        Workers.push(EmployeInfo);

        localStorage.setItem("Workers", JSON.stringify(Workers));
        alert("User added!!!");
        AfficherEmployer(Workers);

        AddEmploy.classList.add('hidden');
        employeeForm.reset();
        resetExperienceForm();

        //*** fonction qui stock chaque role dans un tableau ***
        function getRole() {
            if (EmployeInfo.EmployeRole === 'manager') {
                RoleManager.push(EmployeInfo);
                console.log(RoleManager);
            }
            else if (EmployeInfo.EmployeRole === 'receptionist') {
                RoleReception.push(EmployeInfo);
                console.log(RoleReception);
            }
            else if (EmployeInfo.EmployeRole === 'technician') {
                RoleServerIT.push(EmployeInfo);
            }
            else if (EmployeInfo.EmployeRole === 'security') {
                RoleSecurity.push(EmployeInfo);
            }
            else if (EmployeInfo.EmployeRole === 'cleaning') {
                RoleCleaning.push(EmployeInfo);
            }
            else {
                RoleOther.push(EmployeInfo);
            }
        }
        getRole();
    });
}

validateForm();

//*** fonction Afficher les employes dans sidebar left ***
function AfficherEmployer(Workers) {
    if (!WorkersContainer) return;
    WorkersContainer.innerHTML = '';

    const unassignedWorkers = Workers.filter(worker => !worker.EmployeLocation);
    if (unassignedWorkers.length === 0) {
        WorkersContainer.innerHTML = '<p class="text-gray-500 text-center py-4">No unassigned employees</p>';
        return;
    }

    unassignedWorkers.forEach(data => {
        const workerElement = document.createElement('div');
        workerElement.className = 'Worker-Field flex items-center shadow-xl mb-[2%] p-[2%] bg-white rounded-lg';
        workerElement.innerHTML = `
            <img class="rounded-full w-12 h-12 m-2 object-cover" src="${getSafeImageUrl(data.EmployePhotoUrl)}" alt="${data.EmployeName}">
            <div class="ml-2 flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 truncate">${data.EmployeName}</p>
                <p class="text-xs text-gray-500 capitalize">${data.EmployeRole}</p>
            </div>
            <button type="button" class="view-profile px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm mr-2">
                <i class="fas fa-eye mr-1"></i>View
            </button>
            <button type="button" class="remove-worker px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                <i class="fas fa-times mr-1"></i>Remove
            </button>
        `;
        WorkersContainer.appendChild(workerElement);
        
        workerElement.querySelector('.view-profile').addEventListener('click', () => {
            AfficheProfile(data);
        });
        
        workerElement.querySelector('.remove-worker').addEventListener('click', () => {
            removeWorker(data.id);
        });
    });
}

//*** fonction qui supprime un employe ***
function removeWorker(workerId) {
    if (confirm("Are you sure you want to remove this employee?")) {
        Workers = Workers.filter(worker => worker.id !== workerId);
        localStorage.setItem("Workers", JSON.stringify(Workers));
        AfficherEmployer(Workers);
        initializeZoneDisplays();
    }
}

function initializeZoneDisplays() {
    const zones = ['conference', 'reception', 'server', 'security', 'staff', 'archive'];
    zones.forEach(zone => updateZone(zone));
}
initializeZoneDisplays();

//*** fonction fais le mise a jour de zone
function updateZone(zone) {
    const zoneElement = document.querySelector(`[data-zone="${zone}"]`);
    const employeesContainer = zoneElement.querySelector('.zone-employees');
    const workersInZone = Workers.filter(worker => worker.EmployeLocation === zone);
    
    employeesContainer.innerHTML = '';
    
    workersInZone.forEach(worker => {
        const employeeElement = document.createElement('div');
        employeeElement.className = 'zone-worker flex flex-col items-center p-2 cursor-pointer hover:bg-gray-50 rounded';
        employeeElement.innerHTML = `
            <img class="rounded-full w-12 h-12 mb-1 object-cover" src="${getImageUrl(worker.EmployePhotoUrl)}" alt="${worker.EmployeName}">
            <span class="text-xs text-center font-medium truncate w-full">${worker.EmployeName}</span>
            <span class="text-xs text-gray-500 capitalize">${worker.EmployeRole}</span>
        `;
        
        employeeElement.addEventListener('click', () => {
            AfficheProfile(worker);
        });
        
        employeesContainer.appendChild(employeeElement);
    });
}


//*** fonction qui close formule d'ajouter employe ***
function CancelFormulaire() {
    BtnCancelEmploye.addEventListener('click', () => {
        AddEmploy.classList.add('hidden');
    });
}
CancelFormulaire();

EmployeExperience.addEventListener('click', () => {
    addExperienceForm();
});

function resetExperienceForm() {
    ExperienceContainer.innerHTML = '';
    addExperienceForm();
}

//*** fonction qui designer formule de experience ***
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
            <input type="text" class="experience-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Position and company">
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" class="start-date w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
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

//*** fonction qui incrementer le nombre d'experience ***
function updateExperienceNumbers() {
    const experienceFields = ExperienceContainer.querySelectorAll('.experience-field');
    experienceFields.forEach((field, index) => {
        const title = field.querySelector('h4');
        const experienceNumber = index + 1;
        title.textContent = `Experience ${experienceNumber}`;
        field.setAttribute('data-experience-id', experienceNumber);
    });
}

//*** fonction qui afficher le formule d'ajouter les employe avec un zone ou chambre ***
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

//*** fonction tester la validation d'un image ***
function isValidImageUrl(url) {
    if (!url || url.trim() === '') return false;
    const imagePattern = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
    return imagePattern.test(url);
}

function getImageUrl(url) {
    if (isValidImageUrl(url)) {
        return url;
    } else {
        return 'https://i.pinimg.com/1200x/01/85/e4/0185e4c0175af1347a02a9a814ede0e2.jpg';
    }
}

//*** fonction afficher profile employe ***
function AfficheProfile(worker) {
    ProfileName.textContent = worker.EmployeName;
    ProfileRole.textContent = worker.EmployeRole;
    ProfileEmail.textContent = worker.EmployeEmail;
    ProfilePhone.textContent = worker.EmployePhone;
    ProfileLocation.textContent = worker.EmployeLocation ? `Assigned to: ${getZoneName(worker.EmployeLocation)}` : "Not assigned";
    const safePhotoUrl = getImageUrl(worker.EmployePhotoUrl);
    ProfilePhoto.innerHTML = `<img src="${safePhotoUrl}" alt="${worker.EmployeName}" class="w-full h-full object-cover rounded-full">`;
    
    ProfileExperiences.innerHTML = '';
    if (worker.EmployeExperiences && worker.EmployeExperiences.length > 0) {
        worker.EmployeExperiences.forEach(exp => {
            const li = document.createElement('li');
            li.textContent = `${exp.poste} (${exp.start || 'Unknown'} - ${exp.end || 'Present'})`;
            ProfileExperiences.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No professional experience';
        li.className = 'text-gray-500';
        ProfileExperiences.appendChild(li);
    }
    ProfileModal.classList.remove('hidden');
}

//*** fonction qui donne le nom de chambre ***
function getZoneName(zone) {
    const zoneNames = {
        'conference': 'Conference Room',
        'reception': 'Reception',
        'server': 'Server Room',
        'security': 'Security Room',
        'staff': 'Staff Room',
        'archive': 'Archives Room'
    };
    return zoneNames[zone] || zone;
}
AfficherEmployer(Workers);

document.getElementById('employeePhoto').addEventListener('input', function() {
    const url = this.value.trim();
    if (isValidImageUrl(url)) {
        EmployePhotoPreview.innerHTML = `<img src="${url}" alt="Preview" class="w-full h-full object-cover rounded-full">`;
    } else {
        EmployePhotoPreview.innerHTML = '<i class="fas fa-user text-gray-400 text-2xl"></i>';
    }
});

BtnCloseProfileModal.addEventListener('click', () => {
    ProfileModal.classList.add('hidden');
});

BtnCloseProfile.addEventListener('click', () => {
    ProfileModal.classList.add('hidden');
});
addExperienceForm();