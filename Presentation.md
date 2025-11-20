# HR Application Prototype Presentation

This document outlines the workflow and features of the HR Application prototype, with slides dedicated to the work of each team member.

---

## Slide 1: Introduction (Amira Mubarak Al-Amiri)

**Title:** HRConnect: Streamlining HR for Modern Businesses

**Introduction:**
- Welcome to the presentation of our HR Application prototype.
- My name is Amira Mubarak Al-Amiri, and I served as the Project Lead and UI/UX Designer.
- My focus was on creating a cohesive and intuitive user experience across the entire application, from the public-facing pages to the internal dashboard.
- I will be guiding you through the overall structure and design philosophy.

**The Vision:**
- To create a mobile-first, user-friendly HR platform for small to medium-sized businesses.
- The design prioritizes clarity, efficiency, and a clean aesthetic.

**Key UI/UX Contributions:**
- Designed the main dashboard layout to provide an at-a-glance overview of critical HR metrics.
- Established the application's color palette, typography, and component styling for both light and dark themes.
- Ensured consistent navigation and a seamless user journey between different modules.

---

## Slide 2: Core Application & Employee Management (Gadi Al Suleiman Al Omari)

**Title:** Building the Foundation: Core Layout & Employee Profiles

**Introduction:**
- Hello, I'm Gadi Al Suleiman Al Omari, the Lead Frontend Developer for this prototype.
- My responsibility was to build the core structure of the application and the employee management module.

**Workflow: Employee Management**
1.  **Access from Dashboard:** The user navigates to the "Employees" section from the main dashboard or the sidebar.
2.  **Employee List View (`/dashboard/employees`):**
    - A list of all employees is displayed in card format, showing their photo, name, role, department, and status.
    - The user can search for employees and filter the list by department or sort by name and salary.
3.  **Employee Profile View (`/dashboard/employees/[id]`):**
    - Clicking on an employee card navigates to their detailed profile page.
    - This page displays comprehensive personal and professional information, along with associated documents.
4.  **Edit Employee View (`/dashboard/employees/[id]/edit`):**
    - From the profile page, the user can click the "Edit" button to open a form.
    - This form allows the HR manager to update the employee's name, role, department, salary, and other key details.
    - Saving the form returns the user to the updated profile page.

---

## Slide 3: Public-Facing Website & Recruitment (Renad Al-Sulaimi Al-Harbi)

**Title:** The Public Gateway: Landing Page and Job Applications

**Introduction:**
- Hi everyone, my name is Renad Al-Sulaimi Al-Harbi, Frontend Developer.
- I was responsible for creating the public-facing side of our application, which serves as the first point of contact for potential employees.

**Workflow: Job Application Process**
1.  **Landing Page (`/`):**
    - New visitors arrive at the landing page, which introduces the company and provides navigation to the jobs page and employee login.
2.  **Jobs Page (`/jobs`):**
    - This page lists all open positions available for public viewing.
    - Each job listing shows the title, department, location, and a brief summary.
3.  **Apply for a Job (`/jobs/[id]/apply`):**
    - When a candidate clicks "Apply Now," they are taken to a dedicated application form.
    - The form requires the applicant to enter their full name, email, and upload a resume. A cover letter is optional.
    - Upon submission, the candidate receives a confirmation toast message, and their application is sent to the internal recruitment module.
4.  **Employee Login (`/login`):**
    - A simple, secure login page for HR personnel to access the internal dashboard.

---

## Slide 4: Payroll & Attendance Modules (Sanaa Al-Shoyouni Al-Balawi)

**Title:** Managing Time & Money: Attendance and Payroll Prototypes

**Introduction:**
- Hello, I'm Sanaa Al-Shoyouni Al-Balawi, the UI/UX Prototyper for this project.
- I focused on designing the user interfaces for the Payroll and Attendance modules to make complex data easy to manage.

**Workflow: Payroll Management**
1.  **Payroll Dashboard (`/dashboard/payroll`):**
    - This page provides a summary of the current payroll cycle, including total payroll cost and the number of processed vs. pending payments.
    - A list of employees is shown with their salary details and payment status.
2.  **Payroll Details (`/dashboard/payroll/[id]`):**
    - Clicking on an employee leads to a detailed breakdown of their pay stub for the current period.
    - It shows earnings (base, bonus, overtime), a detailed list of deductions, and the final net pay.
    - A history of recent payments is also available.

**Workflow: Attendance Tracking**
1.  **Attendance Dashboard (`/dashboard/attendance`):**
    - This page gives a real-time overview of daily attendance, with counts for "Present," "Absent," and "Late" employees.
    - It features a "Daily Attendance Log" showing each employee's status, clock-in/out times, or reason for absence.
    - The design allows HR managers to quickly identify attendance issues.

---

## Slide 5: Quality Assurance & Usability (Siham Al-Mutairi)

**Title:** Ensuring Quality: Prototype Evaluation and Testing

**Introduction:**
- Good morning, I'm Siham Al-Mutairi, the QA and Prototyping Analyst.
- My role was to evaluate the prototype to ensure it meets user needs and is free of usability issues.

**Evaluation Process:**
- **Technique:** We used a combination of Heuristic Evaluation and User Task Analysis.
- **Participants:** A small group of HR managers from our target market (SMBs).
- **Tasks:** Users were asked to complete common workflows, such as:
    1.  Post a new job opening.
    2.  Review an application for a specific role.
    3.  Find and view the payroll details for an employee.
    4.  Navigate to the settings page to change a preference.

**Key Findings & Iterations:**
- **Finding 1:** Users had difficulty locating the "Add New Job" button.
    - **Solution:** We made the button more prominent on the recruitment page by placing it in a more visible card at the bottom.
- **Finding 2:** Lack of confirmation after a file upload.
    - **Solution:** We added a `toast` notification to confirm successful form submissions, like when a candidate applies for a job.
- **Finding 3:** Limited filtering options.
    - **Solution:** We added more sorting and filtering controls to the employee and job lists to allow for more granular control.

**Conclusion:**
- The prototype was validated as a strong and intuitive foundation. All feedback has been documented for implementation in the final product.

---
