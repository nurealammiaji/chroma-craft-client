# Chroma Craft: An Online Craft Learning Platform

#### Overview

Chroma Craft is an engaging online craft learning platform designed to provide a seamless experience for students, instructors, and administrators. The platform integrates various features to manage classes, handle payments, and deliver personalized user experiences.

### General Features

#### Navbar and Footer
- **Navbar**: Features the website logo or name, Home, Instructors, Classes, Dashboard, and User Profile Picture/Login button. The user profile picture and Dashboard appear conditionally based on user authentication status.
- **Footer**: Includes the website logo or name, copyright information, contact details, and address, displayed consistently across all pages except the 404 page.

### User Authentication and Registration

#### Login Page
- **Fields**: Email, Password (with hide/unhide option), social login option, and a link to the registration page.
- **Functionality**: Redirects to the login page when the Login button on the navbar is clicked.

#### Registration Page
- **Fields**: Name, Email, Password, Confirm Password, Photo URL, Gender, Date of Birth, Phone Number, and Address.
- **Functionality**: Provides a social login option and displays errors for invalid password criteria and empty fields.

### Homepage

#### Top Slider Section
- **Features**: A relevant slider with appropriate text, information, messages, and pictures.

#### Popular Categories Section
- **Content**: Displays top categories based on the number of students, with relevant pictures.

#### Popular Classes Section
- **Content**: Displays top 6 classes based on the number of students, with relevant pictures.

#### Popular Instructors Section
- **Content**: Showcases top 6 instructors based on student numbers or curated selection, with relevant pictures.

### Pages

#### Instructors Page
- **Content**: Displays all instructors with their image, name, email, and optional details such as the number of classes, class names, and a button to view their classes.

#### Classes Page
- **Content**: Displays all approved classes with their image, name, instructor name, available seats, price, and a Select button.
- **Functionality**: Select button prompts login if the user is not logged in. The button is disabled if available seats are 0 or if logged in as admin/instructor. Classes with 0 seats have a red background.

#### About Page
- **Content**: Provides information about the platform, its mission, and the team behind it.

#### Contact Page
- **Content**: Includes a form for users to reach out with inquiries, along with contact details.

### Dashboards

#### Student Dashboard
- **My Selected Classes**: Lists all classes booked by the student with details, Delete, and Pay buttons. Allows removal of classes.
- **My Enrolled Classes**: Lists all successfully paid classes.
- **Payment**: Redirects to a payment page upon clicking Pay for a class, updates available seats, and moves the class to My Enrolled Classes. Displays a payment history sorted by newest first.

#### Instructor Dashboard
- **Add a Class**: Form for adding new classes with fields for class name, image, instructor name (read-only), instructor email (read-only), available seats, and price.
- **My Classes**: Lists all added classes with their status (pending/approved/denied), total enrolled students, feedback, and update button. Displays admin feedback if denied.

#### Admin Dashboard
- **Manage Classes**: Lists all classes with options to approve, deny, and send feedback. Approval and denial disable respective buttons.
- **Manage Users**: Displays all registered users with options to promote users to instructor or admin, disabling the buttons once clicked.
- **Manage Students**: Lists all student users with details and options to manage their accounts and activities.
- **Manage Instructors**: Lists all instructors with details and options to manage their accounts and activities.
- **Manage Payments**: Displays all payment transactions with details, allowing the admin to manage and review payment statuses and histories.

### Packages and Technologies Used (Client Side)

- **Tailwind CSS**: For styling the application.
- **daisyUI**: Tailwind component library for ready-to-use UI components.
- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: For routing through components.
- **react-icons**: For easy-to-use icons.
- **react-spinner**: For customizable loading spinners.
- **firebase-authentication**: For user registration and login.
- **react-hook-form**: For form validation.
- **axios**: For making HTTP requests.
- **sweetalert2**: For displaying success/error alerts.
- **react-helmet-async**: For dynamic page titles.
- **react-scroll-to-top**: For scrolling to the top of the page.
- **Stripe**: For payment integration.

### Security and Performance

- **Input Validation**: Ensures validation on both frontend and backend.
- **Authentication and Authorization**: Secures API routes using JWT and Firebase Authentication.
- **Performance Optimization**: Optimizes React components, and minimizes bundle size.

### Deployment

- **Frontend**: Deployed using Firebase Hosting.
- **Backend**: Deployed using Vercel.
- **Database**: Uses MongoDB Atlas for a scalable cloud database solution.

### Conclusion

Chroma Craft is designed to provide a robust, scalable, and user-friendly environment. It caters to the needs of students, instructors, and admins by integrating seamless navigation, secure authentication, efficient payment processing, and comprehensive management dashboards. Through meticulous attention to detail and advanced technologies, the platform ensures an optimal learning experience.
