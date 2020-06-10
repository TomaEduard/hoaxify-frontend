This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Hoaxify - Full Stack Application with Spring Boot and React

## Running the Application
- http://hoaxify-frontend.s3-website.eu-west-3.amazonaws.com/#/
- React Application - Import `https://github.com/TomaEduard/hoaxify-frontend` into Visual Studio Code. The development environment is set using the constant located in `seci api \ apiCalls.js`. Here we have 2 constants, one of production and one of test, one comments what is not used and changes and poxy offered by webpack located in `package.json` with the content of the variable used.
- Run `yarn install` followed by `yarn start`
- http://localhost:4200/ with credentials email: admin@hoJaxify.com password: P4ssward
- Run `package com.hoaxify.hoaxify;.HoaxifyApplication` as a Java Application. Check Authentication and REST API Sections for executing REST APIs.
- The project presents 2 development environments, one of development and one of production. These are set from the configuration file before starting `application.yml` and
 sending emails from `package com.hoaxify.hoaxify.shared.AmazonSES`. URL+PORT `http://localhost:3000/` and for production at `http://hoaxify-frontend.s3-website.eu-west-3.amazonaws.com` or what environment you have hosted.
 
## Screenshots
1. Login Page
![login](https://user-images.githubusercontent.com/45673679/84307138-23ddb380-ab65-11ea-99bd-916adde7fb16.png)
2. Signup Page
![signup](https://user-images.githubusercontent.com/45673679/84307131-20e2c300-ab65-11ea-97ec-0740d329cb6f.png)
3. Feed Tab
![feed](https://user-images.githubusercontent.com/45673679/84307135-22ac8680-ab65-11ea-9729-24319bce9c28.png)
4. Preferences Tab
![preferences](https://user-images.githubusercontent.com/45673679/84307119-1d4f3c00-ab65-11ea-824f-f9eadca7a804.png)
5. Explore Tab
![explor](https://user-images.githubusercontent.com/45673679/84307134-2213f000-ab65-11ea-935d-44fabf3a3933.png)
6. Profile Tab
![profile](https://user-images.githubusercontent.com/45673679/84307128-204a2c80-ab65-11ea-8d9d-c06b2b1ab0f4.png)
7. Profile Tab
![profile-security](https://user-images.githubusercontent.com/45673679/84307129-20e2c300-ab65-11ea-9efa-7124b26150de.png)
7. Resend Email Verification Page
8. Validated token from email uriToken








