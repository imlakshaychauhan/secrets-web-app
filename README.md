# secrets-web-app
A Web App created by **Node.js** using **express.js** server for login and register for email & password to store this data in **mongodb** by integrating it with **mongoose**.
Implements 6 levels of Authentication and Security from basic to advanced.
<li>Level 1 - Username and Password Only (Implemented basic storage in database using mongoose)
<li>Level 2 - Database Encryption (Encrypted data using npm module - mongoose-encrypt)
<li>Level 3 - Hashing Passwords (Used npm module - md5 that first hash the password and store it into the database)
<li>Level 4 - Salting and Hashing Passwords with bcrypt (Used npm module - bcrypt which first salt and hash the password to some round and store it into the database) 
<li>Level 5 - Add Cookies and Sessions using passport.js (Used npm module - passport to save the user id as a cookie)
<li>Level 6 - OAuth 2.0 and Implement Sign In with Google (Used npm module - passport-google-oauth20 to login the user through the authentication of google which is most secured among all).

<i>**(learnt this concept from [the-complete-web-development-bootcamp by Angela Yu])**<i>
