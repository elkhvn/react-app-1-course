import { useEffect, useState } from "react";

import apiClient, { CanceledError, AxiosError } from "./services/api-client";
import userService, { User } from "./services/userService";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const [error, setError] = useState("");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => cancel();
  }, []);

  const deleteUser = async (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    const request = userService.deleteUser(user);
    request.catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = async () => {
    const newUser = { id: 0, name: "Mosh" };
    const originalUsers = [...users];
    setUsers([...users, newUser]);

    const request = userService.addUser(newUser);
    request
      .then((res) => {
        setUsers([...users, res.data]);
      })
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  const updateUser = async (user: User) => {
    const originalUsers = [...users];

    const updateUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updateUser : u)));

    const request = userService.updateUser(user, updateUser);
    request.catch(err => {
      setError(err.message);
      setUsers(originalUsers);
    })
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add User
      </button>

      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div className="mb-3">
              <button
                className="btn btn-outline-secondary mb-3 mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                onClick={() => deleteUser(user)}
                className="btn btn-outline-danger mb-3"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
