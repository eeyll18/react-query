import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todoApi";
import type { Todo } from "../types/index";

export default function TodoList() {
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
  if (isLoading) {
    return <p className="status-message status-loading">Loading...</p>;
  }
  if (isError) {
    return <p className="status-message status-error">Error: {error?.message || "Unknown error."}</p>;
  }
  return (
    <div>
      <h2>Todos</h2>
      {todos && todos.length > 0 ? (
        <ul style={{listStyleType:'none'}}>
          {todos.map((todo: Todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No todo.</p>
      )}
    </div>
  );
}
