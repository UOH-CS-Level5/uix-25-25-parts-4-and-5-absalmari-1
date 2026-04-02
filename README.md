[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/kvr7AJrz)


# StudentPulse | University of Hull Prototype

## Project Overview
### This is part 4 from 001_PORT:Individual UI/UX Portfolio: 
We chose to implement Case B. StudentPulse is a functional front-end web interface designed to facilitate and enhance the interaction sequence between students, personal supervisors, and senior tutors at the University of Hull. This project focuses on delivering an effective user flow for monitoring student well-being and academic support through a responsive and accessible design.

## Objectives
As we have discussed in the report portfolio there are 3 customers: 
### Student
- Should be able to book a meeting with their supervisor
- Should be able to report their feelings at fixed time intervals

### Personal Supervisor (PS)
- Should be able to book meetings with his students
- Should be able to review their status

### Senior Tutor (ST)
- Should be able to see the status of the students
- Should be able to see how the supervisors and students are interacting with each other

## Implementation Techniques
Built with semantic HTML5, responsive CSS3 custom properties, vanilla ES6 for logic, FontAwesome icons, and a mock database to simulate backend interactions.

## Repository Structure
* `index.html`: The core structure and single-page application (SPA) views.
* `style.css`: The visual design, color contrast management, and responsiveness rules.
* `script.js`: The interaction logic, login authentication simulation, and LocalStorage handling.
* `logo3.jpeg`: Official University of Hull branding.

## Setup & Installation
No specialized server or compiler is required to run this prototype.
1. Clone the repository to your local machine.
2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, or Edge).


## Customer Journey Map (CJM)

| Role | Journey Type | Steps (Navigation & Action) |
| :--- | :--- | :--- |
| **Student** | Self-Reporting | Home Page → Select "Student" → Enter Credentials → Open Student Panel → Select "Self-Reporting" → Input mood/progress data → Submit. |
| **Student** | Requesting Meeting | Home Page → Select "Student" → Enter Credentials → Open Student Panel → Select "Arrange a Meeting" → Input Date/Reason → Confirm. |
| **PS** | Monitoring | Home Page → Select "PS" → Enter Credentials → Open PS Panel → Select "View Student States" → View traffic-light list → Analyze. |
| **PS** | Arrange Meeting | Home Page → Select "PS" → Enter Credentials → Open PS Panel → Select "Arrange a Meeting" → Choose Student and slot → Submit. |
| **Senior Tutor** | Reviewing & Monitoring | Home Page → Select "ST" → Enter Credentials → Open ST Panel → Select "View Student States" or "Review Supervisors" → Monitor oversight & status. |

## 📊 Test Data

The prototype utilizes a simulated backend environment to demonstrate the functionality of the interface without an external server. This data is stored within a constant object named `database` located at the beginning of the **`script.js`** file.

### **1. Student Test Accounts**
These accounts are used to simulate student interactions, such as self-reporting and requesting appointments.

| Student ID | Name | Password | status |
| :--- | :--- | :--- | :--- |
| S101 | ABDULLAH SAEED | 123 | Green |
| S102 | John Doe | 123 | Amber |
| S103 | Jane Smith | 123 | Red |
| S104 | Michael Chen | 123 | Green |
| S105 | Sarah Jenkins | 123 | Green |
| S106 | Omar Farooq | 123 | Amber |
| S107 | Emily Davis | 123 | Red |
| S108 | Liam Wilson | 123 | Green |
| S109 | Sophia Martinez | 123 | Amber |

---

### **2. Personal Supervisor (PS) Test Accounts**
These credentials allow for the demonstration of student monitoring and triage from a supervisor's perspective.

| Staff ID | Name | Password | Assigned Students |
| :--- | :--- | :--- | :--- |
| PS1 | Dr. Smith | 456 | S101, S102, S103 |
| PS2 | Dr. Brown | 456 | S104, S105, S106 |
| PS3 | Dr. Taylor | 456 | S107, S108, S109 |

---

### **3. Senior Tutor (ST) Test Account**
This account provides administrative oversight to review supervisor performance and global student status.

| Staff ID | Name | Password |
| :--- | :--- | :--- |
| ST1 | Prof. Williams | 789 |