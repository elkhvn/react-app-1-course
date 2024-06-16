import categories from "../categories";
interface ExpenseListProps {
  onSelectCategory: (category: string) => void;
}
const ExpenseFilter = ({ onSelectCategory }: ExpenseListProps) => {
  return (
    <div className="mb-3">
      <select
        name="All Categories"
        id=""
        className="form-select"
        onChange={(event) => onSelectCategory(event.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;
