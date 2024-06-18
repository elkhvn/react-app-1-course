import { useEffect, useState } from "react";
import axios, { AxiosError, CanceledError } from "axios";

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const [error, setError] = useState("");

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );
        setUsers(res.data);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();

    return () => controller.abort();
  }, []);
  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
