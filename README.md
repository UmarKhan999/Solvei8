Dear Rahul,

Thank you for shortlisting me for this internship opportunity. I have completed the assessment ahead of the deadline.

Project Setup Instructions:

1. Environment Setup: Ensure you have Node.js (version 14 or later) and Angular CLI installed. If Angular CLI is not installed, you can do so using npm.
2. Clone Repository: Clone the repository to your local environment using the command: `git clone <repository-url>`.
3. Install Dependencies: Navigate to the project directory and run `npm install` to install the required dependencies.
4. Mock Data Service: Verify that the `mock-data.service.ts` file is correctly configured to provide mock data for users and organizations, including methods such as `getUsers()` and `getOrganizations()`.
5. Run Application:\*Use `ng serve` to start the application in development mode. Access it at `http://localhost:4200/`.
6. Production Build: For production builds, execute `ng build --prod`. The build artifacts will be located in the `dist/` directory.

If you encounter any issues, such as empty data or Angular CLI commands not working, please ensure that the mock data service is properly configured and that Angular CLI is up-to-date.

Additional Features Implemented:

- Added validation to prevent form submission if fields are empty.
- Implemented success messages for login and registration:
  - On successful login, a success message is displayed, and the user is redirected to the official website after 1 second.
  - On successful registration, a success message is shown, and the user is redirected to the login form after 2 seconds.
  - Organization ID and Organization Name will be checked before form submission.

Application Flow:

1. The user first fills in their name or mobile number. If the mobile number exists, the user will be redirected to the login page.
2. On the login page, the system checks the email and password against the mock data:
   - Email: Rahul@gmail.com
   - Password: 1234
3. On successful login, the user will be redirected to the official page of Solvei8.
4. If the data is not found in the mock data, the user will be redirected to the registration page.
5. The first section of the registration page includes validation and will not allow registration until all fields are filled out properly.
6. After successful registration, the user will be redirected to the login page.

If additional time is available, I plan to enhance validation and functionality further and refine the CSS for better component styling.

If you encounter any difficulties, feel free to call me at 9307650896 or email me at umer.khan8c@gmail.com.

Thank you for the opportunity.

Best regards,  
Umar Khan
#   S o l v e i 8 
 
 
