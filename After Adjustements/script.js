const database = {
    students: [
        { id: "S101", name: "ABDULLAH SAEED", pass: "123", status: "Green" },
        { id: "S102", name: "John Doe", pass: "123", status: "Amber" },
        { id: "S103", name: "Jane Smith", pass: "123", status: "Red" },
        { id: "S104", name: "Michael Chen", pass: "123", status: "Green" },
        { id: "S105", name: "Sarah Jenkins", pass: "123", status: "Green" },
        { id: "S106", name: "Omar Farooq", pass: "123", status: "Amber" },
        { id: "S107", name: "Emily Davis", pass: "123", status: "Red" },
        { id: "S108", name: "Liam Wilson", pass: "123", status: "Green" },
        { id: "S109", name: "Sophia Martinez", pass: "123", status: "Amber" }
    ],
    supervisors: [
        { id: "PS1", name: "Dr. Smith", pass: "456", assigned: ["S101", "S102", "S103"] },
        { id: "PS2", name: "Dr. Brown", pass: "456", assigned: ["S104", "S105", "S106"] },
        { id: "PS3", name: "Dr. Taylor", pass: "456", assigned: ["S107", "S108", "S109"] }
    ],
    seniorTutor: { id: "ST1", name: "Prof. Williams", pass: "789" }
};

// --- PERSISTENCE ---
let reports = JSON.parse(localStorage.getItem('pulse_reports')) || [];
let meetings = JSON.parse(localStorage.getItem('pulse_meetings')) || [];
let reviews = JSON.parse(localStorage.getItem('pulse_reviews')) || [];

let currentUser = null, selectedRole = "", selectedEmojiValue = "", selectedStars = 0;

// --- LOGIN LOGIC ---
function showLoginForm(role) {
    selectedRole = role;
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('login-title').innerText = role.toUpperCase() + " Login";
}

function handleLogin() {
    const userVal = document.getElementById('username').value, passVal = document.getElementById('password').value;
    const user = (selectedRole === 'student') ? database.students.find(s => s.id === userVal && s.pass === passVal) :
                 (selectedRole === 'supervisor') ? database.supervisors.find(p => p.id === userVal && p.pass === passVal) :
                 (userVal === database.seniorTutor.id && passVal === database.seniorTutor.pass) ? database.seniorTutor : null;

    if (user) { 
        currentUser = user; 
        if(selectedRole === 'student') loadBoard('student-board', 'Student Board');
        else if(selectedRole === 'supervisor') loadBoard('supervisor-board', 'Supervisor Board');
        else if(selectedRole === 'senior') loadBoard('senior-tutor-board', 'ST Board');
    } else alert("Invalid Credentials");
}

function loadBoard(boardId, title) {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById(boardId).classList.remove('hidden');
    document.getElementById('home-icon').classList.remove('hidden');
    document.getElementById('page-title').innerText = title;
    
    if(boardId === 'student-board') 
        document.getElementById('user-details-box').innerHTML = `<h2>Welcome, ${currentUser.name}</h2><p>ID: ${currentUser.id} | Status: ${currentUser.status}</p>`;
    else if(boardId === 'supervisor-board')
        document.getElementById('sup-details-box').innerHTML = `<h2>Welcome, ${currentUser.name}</h2><p>Staff ID: ${currentUser.id}</p>`;
    else
        document.getElementById('st-details-box').innerHTML = `<h2>Welcome, ${currentUser.name}</h2><p>Senior Tutor | Oversight</p>`;
}

// --- SHARED ACTIONS ---
function showActionForm(type) {
    document.getElementById('report-form').classList.toggle('hidden', type !== 'report');
    document.getElementById('meeting-form').classList.toggle('hidden', type !== 'meeting');
}

function selectEmoji(el, emoji) {
    document.querySelectorAll('.emoji-selector span').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
    selectedEmojiValue = emoji;
}

function submitReport() {
    const text = document.getElementById('report-text').value;
    if(!text || !selectedEmojiValue) return alert("Complete the form");
    reports.push({ studentId: currentUser.id, content: text, emoji: selectedEmojiValue });
    localStorage.setItem('pulse_reports', JSON.stringify(reports));
    alert("Report Sent!");
    document.getElementById('report-form').classList.add('hidden');
}

function submitMeeting() {
    const date = document.getElementById('meeting-date').value, reason = document.getElementById('meeting-reason').value;
    if(!date || !reason) return alert("Fill all fields");
    meetings.push({ studentId: currentUser.id, meetingDate: date, reason: reason });
    localStorage.setItem('pulse_meetings', JSON.stringify(meetings));
    alert("Meeting Requested!");
    document.getElementById('meeting-form').classList.add('hidden');
}

// --- SUPERVISOR SPECIFIC ---
function showSupAction(type) {
    document.getElementById('sup-view-students').classList.toggle('hidden', type !== 'view-students');
    document.getElementById('sup-meeting-form').classList.toggle('hidden', type !== 'arrange-meeting');
    if(type === 'view-students') renderTable('student-table-container', currentUser.assigned);
}

function renderTable(containerId, idList) {
    let html = `<table><tr><th>Name</th><th>ID</th><th>Status</th></tr>`;
    idList.forEach(sid => {
        const s = database.students.find(stud => stud.id === sid);
        html += `<tr><td>${s.name}</td><td>${s.id}</td><td class="status-${s.status}">${s.status}</td></tr>`;
    });
    document.getElementById(containerId).innerHTML = html + `</table>`;
}

function lookupStudent() {
    const id = document.getElementById('lookup-id').value;
    if(!currentUser.assigned.includes(id)) return alert("Not your student");
    showHistory(id, 'student-history-result');
}

function submitSupMeeting() {
    const date = document.getElementById('sup-meeting-date').value, sid = document.getElementById('sup-meeting-sid').value;
    if(!date || !sid) return alert("Fill all fields");
    meetings.push({ studentId: sid, meetingDate: date, reason: "Supervisor Set" });
    localStorage.setItem('pulse_meetings', JSON.stringify(meetings));
    alert("Meeting Set!");
}

// --- SENIOR TUTOR SPECIFIC ---
function showSTAction(type) {
    document.getElementById('st-view-students').classList.toggle('hidden', type !== 'view-all-students');
    document.getElementById('st-review-supervisors').classList.toggle('hidden', type !== 'review-supervisors');
    if(type === 'view-all-students') renderSTStudentTable();
    if(type === 'review-supervisors') renderSTSupervisorTable();
}

function renderSTStudentTable() {
    let html = `<table><tr><th>Name</th><th>ID</th><th>Status</th><th>PS</th></tr>`;
    database.students.forEach(s => {
        const ps = database.supervisors.find(p => p.assigned.includes(s.id));
        html += `<tr><td>${s.name}</td><td>${s.id}</td><td class="status-${s.status}">${s.status}</td><td>${ps ? ps.name : 'N/A'}</td></tr>`;
    });
    document.getElementById('all-students-table-container').innerHTML = html + `</table>`;
}

function renderSTSupervisorTable() {
    let html = `<table><tr><th>ID</th><th>Supervisor</th><th>Count</th></tr>`;
    database.supervisors.forEach(p => {
        html += `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.assigned.length}</td></tr>`;
    });
    document.getElementById('supervisors-table-container').innerHTML = html + `</table>`;
}

function stLookupStudent() {
    const id = document.getElementById('st-lookup-id').value;
    const exists = database.students.some(s => s.id === id);
    if(!exists) return alert("Invalid Student ID");
    showHistory(id, 'st-student-history-result');
}

function showHistory(id, resId) {
    const s = database.students.find(stud => stud.id === id);
    const sReports = reports.filter(r => r.studentId === id);
    const sMeetings = meetings.filter(m => m.studentId === id);
    let res = document.getElementById(resId);
    res.classList.remove('hidden');
    res.innerHTML = `<h4>History: ${s.name}</h4><hr>
        <p>Reports: ${sReports.map(r => r.emoji + " " + r.content).join(', ') || 'None'}</p>
        <p>Meetings: ${sMeetings.map(m => m.meetingDate).join(', ') || 'None'}</p>`;
}

function selectStars(n) {
    selectedStars = n;
    document.querySelectorAll('.star-rating span').forEach((s, i) => s.classList.toggle('active', i < n));
}

function submitSupReview() {
    const id = document.getElementById('review-sup-id').value;
    if(!id || selectedStars === 0) return alert("Fill all fields");
    reviews.push({ supId: id, stars: selectedStars });
    localStorage.setItem('pulse_reviews', JSON.stringify(reviews));
    alert("Review Submitted!");
}

function logout() { location.reload(); }

// --- HELP MODAL LOGIC ---
function toggleHelp() {
    const modal = document.getElementById('help-modal');
    modal.classList.toggle('hidden');
}