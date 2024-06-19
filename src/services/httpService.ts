import apiClient from "./api-client";

/* 
Entity: This interface defines a structure with a single property id, which is a number.
This interface will be used to ensure that certain operations (like update) are performed
on objects that have an id property.
 */
interface Entity{
    id: number; 
}

class httpService{
    /* 
    endpoint: A string property that stores the base URL or endpoint for the HTTP requests.
    */
    endpoint: string;


    /* 
    constructor: Initializes the endpoint property when an instance of httpService is created.
    */
    constructor(endpoint: string){
        this.endpoint = endpoint;
    }

    /* 
    Generic Parameter <T>: The method is generic, meaning it can work with any type T. 
    The type of entities returned by the getAll method will be an array of type T


    without Generic Type Consumers of getAll don't know the type of the data returned, 
    leading to potential type errors.
    */
    getAll<T>(){
        const controller = new AbortController();
        /* 
        When you call the getAll method with a specific type, the .get method inside getAll will use 
        the same type. This is because the type parameter <T> is propagated to all uses of T within the method.
        
        Without specifying <T> this can lead to type assertions or type errors when consuming the data
        */
        const request = apiClient.get<T[]>(this.endpoint, {
            signal: controller.signal
        });

        return {request, cancel: ()=> controller.abort()}

    }


    delete(id: number){
        const request = apiClient.delete(this.endpoint+ "/" + id);

        return request
    }

    /* 
    entity: T: Takes an entity of type T as a parameter and makes a POST request to the 
    endpoint with the given entity.
    */
    create<T>(entity: T){
        const request = apiClient.post(this.endpoint, entity);

        return request
    }
    

    /* 
    Generic Parameter with Type Constraint <T extends Entity>: The update method is 
    generic but constrained to types that extend the Entity interface. This ensures 
    that the entity has an id property.
    */
    update<T extends Entity>(entity: T){
        const request = apiClient.patch(this.endpoint+ "/" + entity.id, entity);

        return request
    }
}

/* 
Factory function
*/
const create = (endpoint: string) => new httpService(endpoint);

export default create;




/* 


PROS:
Flexibility with Types: By using generic types (<T>), the httpService class can 
handle various types of entities without being tied to a specific type.

Type Safety: The methods ensure type safety. For example, the update method ensures 
that the entity has an id property by requiring T to extend the Entity interface.


EXAMPLE USAGE:
import createHttpService from './httpService';

const userService = createHttpService('/users');
const orderService = createHttpService('/orders');




// Get all users
const { request, cancel } = userService.getAll<User>();
request.then(response => console.log(response.data));

// Create a new user
userService.create<User>({ id: 1, name: 'John Doe' });

// Update a user
userService.update<User>({ id: 1, name: 'John Doe Updated' });

// Delete a user
userService.delete(1);
*/