## How to run this project
1. `cd api` && `npm install` && `npm start`
2. `cd react-client` && `npm install` && `npm run dev`






# EX-1
1. implement login
2. send the user to /countries page after login success


# HW 
1. create products component
2. create products filter - ( by name )
3. protect your products component
4. send the jwt token from the client


# Dockerizing nodejs script
1. Create your docker folder
2. create inside the folder JS file with your name printing function
3. create Dockerfile
4. add the relevant commands - take reference from Gal's Dockerfile
5. Run inside your folder the following command
- `docker build . --tag print-my-name`
6. Run your container based on `print-my-name` image:
- `docker run print-my-name`

Expected result: Your name printed!
Q: what you will see when typing `docker ps` 