import { useState, type FormEvent } from "react";
import { useUserStore } from "./user.store";

const User = () => {
  const { users, addUser, deleteUser } = useUserStore();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const Hobbies = ["Books", "Sports", "Movies", "Games", "Cooking"];

  const handleHobbyChange = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addUser({
      firstname: firstname,
      lastname: lastname,
      age,
      hobbies: selectedHobbies,
    });

    setFirstname("");
    setLastname("");
    setAge(0);
    setSelectedHobbies([]);
  };

  return (
    <div>
      <h1>User </h1>

      <div>
        <h2>User List ({users.length}people)</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div>
                <strong>
                  {user.firstname} {user.lastname}
                </strong>
                <span>({user.age} Year's old)</span>
              </div>
              <div>
                <strong>Hobbies:</strong>{" "}
                {user.hobbies.length > 0 ? user.hobbies.join(", ") : "Nothing"}
              </div>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Add Users</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Firstname:</label>
            <input
              id="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="John"
            />
          </div>

          <div>
            <label>Lastname:</label>
            <input
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Doe"
            />
          </div>

          <div>
            <label>Age:</label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              placeholder="25"
              min="1"
              max="120"
            />
          </div>

            <div>
              {Hobbies.map((hobby) => (
                <label key={hobby}>
                  <input
                    type="checkbox"
                    checked={selectedHobbies.includes(hobby)}
                    onChange={() => handleHobbyChange(hobby)}
                  />
                  {hobby}
                </label>
              ))}
            </div>

          <button type="submit">Add user</button>
        </form>
      </div>
    </div>
  );
};

export default User;
