import "reflect-metadata";
import bodyParser = require('koa-bodyparser');
import { getRepository } from "typeorm";
import {  Repository } from 'typeorm';
import cors from '@koa/cors'
import * as HttpStatus from 'http-status-codes';
import {createConnection} from "typeorm";
import  Koa from 'koa';
import  Router from 'koa-router'; // Make sure to use koa-bodyparser
import User from "./entity/User"; // Import the User entity

const app = new Koa();
const router = new Router();

createConnection().then(async connection => {
    console.log("Connected to the database 1");

    router.post('/submit-form', async (ctx) => {
        // Assuming ctx.request.body contains the form data
        console.log("Hit from Front end project");
        
        const { Client_Name, Email, Tag, Cut_Off_Date } = ctx.request.body as any;
        
        console.log("Received form data:", { Client_Name, Email, Tag, Cut_Off_Date });
        // Create a new user instance
        const user = new User();
        user.Client_Name = Client_Name;
        user.Email = Email;
        user.Tag = Tag;
        user.Cut_Off_Date = Cut_Off_Date;

        try {
            // Attempt to save the user in the database
            await connection.manager.save(user);
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                message: 'User saved successfully',
                user: user,
                receivedData: { Client_Name, Email, Tag, Cut_Off_Date }
            };

            console.log("Response body:", ctx.body);
        } catch (error) {
            console.error('Error saving user:', error);
            ctx.status = 500; // Internal Server Error
            ctx.body = {
                status: 'error',
                message: 'Failed to save user'
            };
        }
    })
    

    router.get('/',async(ctx)=>{
        console.log("TEst");
        try {
            // Fetch all users from the database
            const users = await connection.manager.find(User);
            ctx.body = {
                users: users
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            ctx.status = 500; // Internal Server Error
            ctx.body = {
                status: 'error',
                message: 'Failed to fetch data'
            };
        }
    })

    router.get('/submit-form/:id', async (ctx: Koa.Context) => {
      // This will be a string because URL parameters are always strings
    
        // If your ID is a numeric type in the database, ensure to convert it
        // For numeric IDs: const numericId = parseInt(id, 10);
        // Then use numericId in place of id in the findOne call if needed
    
        const movieRepo: Repository<User> = getRepository(User);
        console.log((ctx as any).params)
          let movieid = (ctx as any).params.id;
          // Find the requested movie.
          const movie = await movieRepo.findOne({
            where:{id : movieid}});
        
          // If the movie doesn't exist, then throw a 404.
          // This will be handled upstream by our custom error middleware.
          if (!movie) {
            ctx.throw(HttpStatus.NOT_FOUND);
          }
        
          // Respond with our movie data.
          ctx.body = movie;
    });
    
    
    
    router.delete('/users/:id',async(ctx) =>{
        const userId = ctx.params.id;

        try {

            const result = await deleteUserById(userId);
            console.log(result);
            console.log(result.raw);
            console.log(result.affected);

            if(result.affected === 404){
                console.log("Failure");
                ctx.status = 404;
                ctx.body = {result};
            }
            else {
                ctx.status =200;
                ctx.body ={ message: "User successfully deleted"};

            }
        }catch(error){
            console.error("Error ",error);
        }
    });

    async function deleteUserById(userId : string) {
        const repository = getRepository(User); // Get the repository for the User entity
        return await repository.delete(userId); // Delete the user by ID
    }

    router.put('/submit-form/:id', async (ctx) => {
    // Extract the ID from the URL path
    const userId = parseInt(ctx.params.id, 10);
    if (isNaN(userId)) {
        ctx.status = 400;
        ctx.body = { message: 'Invalid ID format' };
        return;
    }

    // Extract the data from the request body
    const { Client_Name, Email, Tag, Cut_Off_Date } = ctx.request.body as any;

    // Get the repository for the User entity
    const userRepository: Repository<User> = getRepository(User);

    try {
        // Find the user by ID
        const userToUpdate = await userRepository.findOne({where :{ id:userId}});
        if (!userToUpdate) {
            ctx.status = 404;
            ctx.body = { message: 'User not found' };
            return;
        }

        // Update the user properties
        userToUpdate.Client_Name = Client_Name;
        userToUpdate.Email = Email;
        userToUpdate.Tag = Tag;
        userToUpdate.Cut_Off_Date = Cut_Off_Date;

        // Save the updated user
        await userRepository.save(userToUpdate);

        // Respond with the updated user data
        ctx.status = 200;
        ctx.body = { 
            message: 'User updated successfully', 
            user: userToUpdate 
        };
    } catch (error) {
        console.error('Error updating user:', error);
        ctx.status = 500; // Internal Server Error
        ctx.body = { message: 'Failed to update user' };
    }
});


    app.use(cors())
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    

    app.listen(8000, () => {
        console.log("Server running on http://localhost:8000");
    });

}).catch(error => console.log("connection error: ", error));
