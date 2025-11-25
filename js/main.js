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
const BtnCloseAssign = document.getElementById('cancelAssign');

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

const ROLE_MANAGER = 'manager';
const ROLE_RECEPTIONIST = 'receptionist';
const ROLE_TECHNICIAN = 'technician';
const ROLE_SECURITY = 'security';
const ROLE_CLEANING = 'cleaning';
const ROLE_OTHER = 'other';

let Workers = JSON.parse(localStorage.getItem("Workers")) || [];
let IdWorkerInCrement = Workers.length > 0 ? Math.max(...Workers.map(w => parseInt(w.id) || 0)) + 1 : 1;
let ZoneN = null;

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

//*** fonction qui donne tous les experiences d'un employe ***
function getAllExperiences() {
    const exp = ExperienceContainer.querySelectorAll('.Experience');
    let experiences = [];

    exp.forEach(str => {
        const expInput = str.querySelector('.experience-input').value.trim();
        const startDate = str.querySelector('.start-date').value;
        const endDate = str.querySelector('.end-date').value;

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

function isValidDate(DateStart, DateFin) {
    return new Date(DateStart) < new Date(DateFin);
}

//*** fonction tester la validation d'un date ***
function validateExperienceDates(experiences) {
    for (let exp of experiences) {

        if (!exp.start || !exp.end) {
            alert("enter the date");
            return false;
        }

        if (!isValidDate(exp.start, exp.end)) {
            alert(`End date must be after start date`);
            return false;
        }
    }
    return true;
}


//*** fonction tester la validation d'un image ***
function isValidImageUrl(url) {
    if (!url || url.trim() === '') return false;
    const imageP = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
    return imageP.test(url);
}

//*** fonction donne url de image ***
function getImageUrl(url) {
    if (isValidImageUrl(url)) {
        return url;
    } else {
        return 'https://i.pinimg.com/1200x/01/85/e4/0185e4c0175af1347a02a9a814ede0e2.jpg';
    }
}


//*** fonction qui valide une formule ***
function validateForm() {
    const employeeForm = document.getElementById('employeeForm');
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const experiences = getAllExperiences();
        const EmployeInfo = {
            id: IdWorkerInCrement.toString(),
            EmployeName: document.getElementById('employeeName').value.trim(),
            EmployeRole: document.getElementById('employeeRole').value.trim(),
            EmployePhotoUrl: document.getElementById('employeePhoto').value.trim(),
            EmployeEmail: document.getElementById('employeeEmail').value.trim(),
            EmployePhone: document.getElementById('employeePhone').value.trim(),
            EmployeExperiences: experiences,
            EmployeLocation: null
        };
        IdWorkerInCrement++;
        
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

        //*** Rejex ***
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
        if(!validateExperienceDates(EmployeInfo.EmployeExperiences)){
            return;
        }

        EmployeInfo.EmployePhotoUrl = getImageUrl(EmployeInfo.EmployePhotoUrl);
        document.getElementById('employeePhoto').addEventListener('input', function() {
            const url = this.value.trim();
            if (isValidImageUrl(url)) {
                EmployePhotoPreview.innerHTML = `<img src="${url}" alt="Preview" class="w-full h-full object-cover rounded-full">`;
            } else if(url === "") { 
                EmployePhotoPreview.innerHTML = '<i class="fas fa-user text-gray-400 text-2xl"></i>';
            } else {
                EmployePhotoPreview.innerHTML = `<img src="https://i.pinimg.com/1200x/01/85/e4/0185e4c0175af1347a02a9a814ede0e2.jpg" alt="Default" class="w-full h-full object-cover rounded-full">`;
            }
        });

        Workers.push(EmployeInfo);
        localStorage.setItem("Workers", JSON.stringify(Workers));
        alert("User added!!!");
        AfficherEmployer(Workers);

        AddEmploy.classList.add('hidden');
        employeeForm.reset();
        AddMoreExp();
        updateZoneVisuals();
        
    });
}

validateForm();

//*** fonction Afficher les employes dans sidebar left ***
function AfficherEmployer(Workers) {
    if (!WorkersContainer) return;
    WorkersContainer.innerHTML = '';

    const NoAssign = Workers.filter(worker => !worker.EmployeLocation);
    if (NoAssign.length === 0) {
        WorkersContainer.innerHTML = '<p class="text-gray-500 text-center py-4">No unassigned employees</p>';
        return;
    }

    NoAssign.forEach(data => {
        const workerElement = document.createElement('div');
        workerElement.className = 'Worker-Field flex items-center shadow-xl mb-[2%] p-[2%] bg-white rounded-lg';
        workerElement.innerHTML = `
            <img class="rounded-full w-12 h-12 max-lg:w-10 max-lg:h-10 m-2 object-cover" src="${getImageUrl(data.EmployePhotoUrl)}" alt="${data.EmployeName}">
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
    if (confirm("Are you sure you want remove this employee?")) {
        Workers = Workers.filter(worker => worker.id !== workerId);
        localStorage.setItem("Workers", JSON.stringify(Workers));
        AfficherEmployer(Workers);
        initializeZone();
        updateZoneVisuals();
    }
}

//*** fonction fais le mise a jour de zone
function updateZone(zone) {
    const zoneElement = document.querySelector(`[data-zone="${zone}"]`);
    const employeesContainer = zoneElement.querySelector('.zone-employees');
    const workersInZone = Workers.filter(worker => worker.EmployeLocation === zone);
    
    employeesContainer.innerHTML = '';
    
    workersInZone.forEach(worker => {
        const employeeElement = document.createElement('div');
        employeeElement.className = 'zone-worker flex flex-col h-auto w-20 max-md:h-15 max-md:w-10 items-center p-2 cursor-pointer hover:bg-gray-50 rounded';
        employeeElement.innerHTML = `<button class="remove-from-zone" data-worker-id="${worker.id}">
                <i class="fas fa-times"></i>
            </button>
            <img class="rounded-full w-12 h-12 max-lg:w-10 max-lg:h-10 mb-1 object-cover" src="${getImageUrl(worker.EmployePhotoUrl)}" alt="${worker.EmployeName}">
            <span class="text-xs text-center font-medium truncate w-full">${worker.EmployeName}</span>
            <span class="text-xs text-gray-500 capitalize">${worker.EmployeRole}</span>`;
        
        employeeElement.addEventListener('click', () => {
            AfficheProfile(worker);
        });

        employeeElement.querySelector('.remove-from-zone').addEventListener('click', (e) => {
            e.stopPropagation();
            removeWorkerFromZone(worker.id, zone);
        });
        
        employeesContainer.appendChild(employeeElement);
    });
    updateZoneVisuals();
}

function initializeZone() {
    const zones = ['conference', 'reception', 'server', 'security', 'staff', 'archive'];
    zones.forEach(zone => updateZone(zone));
    updateZoneVisuals();
}

//*** fonction pour supprime un employe d'une zone ***
function removeWorkerFromZone(workerId, zone) {
    if (confirm("Remove this employee from this zone?")) {
        const workerIndex = Workers.findIndex(w => w.id === workerId);
        if (workerIndex === -1) return;
        Workers[workerIndex].EmployeLocation = null;
        localStorage.setItem("Workers", JSON.stringify(Workers));
        updateZone(zone);
        AfficherEmployer(Workers);
        updateZoneVisuals();
    }
}

//*** fonction pour mise a jour visuelle dans des zones ***
function updateZoneVisuals() {
    const zones = document.querySelectorAll('.drop-zone');
    zones.forEach(zone => {
        const employeesCount = zone.querySelectorAll('.zone-worker').length;
        const isRequired = zone.dataset.required === "true";
        const maxCapacity = parseInt(zone.dataset.max);
        zone.classList.remove('zone-empty');
        if (isRequired && employeesCount === 0) {
            zone.classList.add('zone-empty');
        }
        const addButton = zone.querySelector('.add-employee-btn');
        if (addButton) {
            if (employeesCount >= maxCapacity) {
                addButton.style.backgroundColor = '#9ca3af';
                addButton.style.cursor = 'not-allowed';
                addButton.onclick = null;
            } else {
                addButton.style.backgroundColor = '';
                addButton.style.cursor = 'pointer';
            }
        }
    });
}

//*** fonction qui close formule d'ajouter employe ***
function CancelFormulaire() {
    BtnCancelEmploye.addEventListener('click', () => {
        AddEmploy.classList.add('hidden');
        AddMoreExp();
    });
}
CancelFormulaire();

EmployeExperience.addEventListener('click', () => {
    addExperienceForm();
});

function AddMoreExp() {
    ExperienceContainer.innerHTML = '';
    addExperienceForm();
}

//***fonction qui designer formule de experience ***
function addExperienceForm() {    
    const experienceCount = ExperienceContainer.children.length + 1;
    const experienceF = document.createElement('div');
    experienceF.className = 'Experience mb-4 p-4 border border-gray-200 rounded-lg';
    experienceF.setAttribute('data-experience-id', experienceCount);
    experienceF.innerHTML = `
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

    ExperienceContainer.appendChild(experienceF);
    experienceF.querySelector('.remove-experience').addEventListener('click', function () {
        if (ExperienceContainer.children.length > 1) {
            ExperienceContainer.removeChild(experienceF);
            updateExperienceNumbers();
        }
    });
}

//*** fonction qui incrementer le nombre d'experience ***
function updateExperienceNumbers() {
    const experienceFl = ExperienceContainer.querySelectorAll('.Experience');
    experienceFl.forEach((str, index) => {
        const title = str.querySelector('h4');
        const experienceNumber = index + 1;
        title.textContent = `Experience ${experienceNumber}`;
        str.setAttribute('data-experience-id', experienceNumber);
    });
}

//*** fonction qui afficher le formule d'ajouter les employe avec un zone ou chambre ***
function AfficherFormuleAssign() {
    const buttons = [Add_Employee_Btn_archive, Add_Employee_Btn_staff, Add_Employee_Btn_server, Add_Employee_Btn_reception, Add_Employee_Btn_security, Add_Employee_Btn_conference];
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const zone = btn.dataset.zone;
            const zoneElement = document.querySelector(`[data-zone="${zone}"]`);
            const employeesCount = zoneElement.querySelectorAll('.zone-worker').length;
            const maxCapacity = parseInt(zoneElement.dataset.max);
            if (employeesCount >= maxCapacity) {
                alert(`This zone have a maximum capacity of ${maxCapacity} employees`);
                return;
            }
            ZoneN = zone;
            AssignModal.classList.remove('hidden');
            document.getElementById('assignModalTitle').textContent = `Assign employee to ${getZoneName(zone)}`;
            AfficheEmployeeDisponible(ZoneN);
        });
    });
    
    BtnCloseAssignModal.addEventListener('click', () => {
        AssignModal.classList.add('hidden');
    });
    BtnCloseAssign.addEventListener('click', () => {
        AssignModal.classList.add('hidden');
    });
}

//*** focntion pour affiche dynamiquement les employes qui possible travaille dans un zone
function AfficheEmployeeDisponible(zone) {
    const EmpPoss = document.getElementById('EmployeeDisponible');
    EmpPoss.innerHTML = '';
    
    const NoAssign = Workers.filter(worker => 
        !worker.EmployeLocation && isWorkerIncludeForZone(worker, zone)
    );
    
    if (NoAssign.length === 0) {
        EmpPoss.innerHTML = '<p class="text-gray-500 text-center py-4">No employees found</p>';
        return;
    }
    
    NoAssign.forEach(worker => {
        const employeeElement = document.createElement('div');
        employeeElement.className = 'flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50';
        employeeElement.innerHTML = `<img class="rounded-full w-10 h-10 mr-3 object-cover" src="${getImageUrl(worker.EmployePhotoUrl)}" alt="${worker.EmployeName}">
            <div class="flex-1">
                <p class="font-medium text-gray-800">${worker.EmployeName}</p>
                <p class="text-sm text-gray-500 capitalize">${worker.EmployeRole}</p>
            </div>
        `;
        
        employeeElement.addEventListener('click', () => {
            assignWorkerToZone(worker.id, zone);
            AssignModal.classList.add('hidden');
        });
        
        EmpPoss.appendChild(employeeElement);
    });
}

//*** fonction pour tester est ce que un employe possible entre zone ou non
function isWorkerIncludeForZone(worker, zone) {
    switch(zone) {
        case 'reception':
            return worker.EmployeRole === ROLE_RECEPTIONIST || worker.EmployeRole === ROLE_MANAGER;
        case 'server':
            return worker.EmployeRole === ROLE_TECHNICIAN || worker.EmployeRole === ROLE_MANAGER;
        case 'security':
            return worker.EmployeRole === ROLE_SECURITY || worker.EmployeRole === ROLE_MANAGER;
        case 'archive':
            return worker.EmployeRole !== ROLE_CLEANING;
        case 'staff':
        case 'conference':
            return true;
        default:
            return true;
    }
}

//*** fonction pour assign un employe a zone
function assignWorkerToZone(workerId, zone) {
    const workerIndex = Workers.findIndex(w => w.id === workerId);
    if (workerIndex === -1) return;
    Workers[workerIndex].EmployeLocation = zone;
    localStorage.setItem("Workers", JSON.stringify(Workers));
    updateZone(zone);
    AfficherEmployer(Workers);
    updateZoneVisuals();
}

AfficherFormuleAssign();

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
initializeZone();

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


// let data1 = [
//     {
//         "prenom" : "Hamza",
//         "nom" : "kamal",
//         "email": "hamza@gmail.com",
//         "salaire" : 10000
//     },
//         {
//         "prenom" : "Zineb",
//         "nom" : "kamili",
//         "email": "zineb@gmail.com",
//         "salaire" : 15000
//     },
//         {
//         "prenom" : "Mouad",
//         "nom" : "Aabilla",
//         "email": "mouad@gmail.com",
//         "salaire" : 9800
//     },
//         {
//         "prenom" : "Amine",
//         "nom" : "zemrani",
//         "email": "amine@gmail.com",
//         "salaire" : 23000
//     },
//         {
//         "prenom" : "Siham",
//         "nom" : "Miloud",
//         "email": "siham@gmail.com",
//         "salaire" : 37000
//     }
// ]

// function AfficheEmployeSalaire(){
//     return data1.filter(w=>w.salaire >= 10000);
// }
// console.log(AfficheEmployeSalaire());

// const FloorPlan = document.getElementById('FloorPlan');

// function Affiche(){
//     let st = data1.filter(w=>w.salaire >= 10000);
//     // console.log(st);
//     st.forEach((e)=>{
//         FloorPlan.textContent += e.prenom;
//     })
// }

// Affiche();