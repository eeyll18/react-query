import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

export default function Demo() {
  return (
    <div className="app-container">
      <AddTodoForm />
      <TodoList />
    </div>
  );
}
