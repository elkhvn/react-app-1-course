import { FieldValues, useForm } from "react-hook-form";


interface FormData {
    name: string;
    age: number;
}
// Nested destructuring
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name", { required: true, minLength: 3 })}
          type="name"
          className="form-control"
          id="name"
        />

        {/* Optional Chaining */}
        {errors.name?.type === "required" && (
          <p className="text-danger">The name field is empty</p>
        )}
        {errors.name?.type === "minLength" && (
          <p className="text-danger">
            The name field should be more than 3 characters
          </p>
        )}
        <div className="mb-3">
          <label htmlFor="age" className="forma-label">
            Age
          </label>
          <input
            {...register("age")}
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
