import type { Todo, NewTodoPayload } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/todos?_limit=10`);
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {}
    throw new Error(errorMessage);
  }
  return response.json() as Promise<Todo[]>;
};

export const addTodo = async (newTodo: NewTodoPayload): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {}
    throw new Error(errorMessage);
  }

  return response.json() as Promise<Todo>;
};
