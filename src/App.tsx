import userService, { User } from "./services/userService";
import useUsers from "./hooks/useUsers";

function App() {

  const {users, error, isLoading, setUsers, setError} = useUsers();

  const deleteUser = async (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    const request = userService.delete(user.id);
    request.catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = async () => {
    const newUser = { id: 0, name: "Mosh" };
    const originalUsers = [...users];
    setUsers([...users, newUser]);

    const request = userService.create(newUser);
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

    const request = userService.update(updateUser);
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
