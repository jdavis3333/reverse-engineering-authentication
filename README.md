# reverse-engineering-authentication

* What is this application doing?
It allows existing members to login using a stored email address and password, and it allows new users to sign up with their email address and desired password with Passport, the Node.js application that uses strategies to authenticate.  

* How does it work?

Passport works by storing the password as hashes using bcrpyt, and the password is then encrypted so it is nearly impossible to be stolen.  The application then uses secret keys to login to selected applications.