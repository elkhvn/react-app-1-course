import { FormEvent, useState } from "react";

const Form = () => {
  const [isPerson, SetPerson] = useState({ name: "", age: "" });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(isPerson);
  };
  return (
    <form onSubmit={handleSubmit} action="">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          value={isPerson.name}
          onChange={(event) =>
            SetPerson({ ...isPerson, name: event.target.value })
          }
          type="name"
          className="form-control"
          id="name"
        />
        <div className="mb-3">
          <label htmlFor="age" className="forma-label">
            Age
          </label>
          <input
            value={isPerson.age}
            onChange={(event) =>
              SetPerson({ ...isPerson, age: parseInt(event.target.value) })
            }
            id="age"
            type="number"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
