import apiClient from "./api-client";

export interface User {
    id: number;
    name: string;
  }


class userService{
    getAllUsers(){
        const controller = new AbortController();
        const request = apiClient.get<User[]>("/users", {
            signal: controller.signal
        });

        return {request, cancel: ()=> controller.abort()}

    }


    deleteUser(user: User){
        const request = apiClient.delete("/users/" + user.id);

        return request
    }


    addUser(newUser: User){
        const request = apiClient.post("users", newUser);

        return request
    }

    updateUser(user: User){
        const request = apiClient.patch("/users/" + user.id, user);

        return request
    }
}

export default new userService();