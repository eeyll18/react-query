import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addTodo } from "../api/todoApi";
import type { Todo, NewTodoPayload } from "../types/index";

export default function AddTodoForm() {
  const [title, setTitle] = useState<string>("");
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation<Todo, Error, NewTodoPayload>({
    mutationFn: addTodo,
    onSuccess: (newlyAddedTodo: Todo) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      // önbelleği manuel olarak güncelle
      //   queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
      //     const currentTodos = oldTodos || [];
      //     return [...currentTodos, newlyAddedTodo]; 
      //   });

      console.log("Yeni yapılacak eklendi:", newlyAddedTodo);
      setTitle("");
    },
    onError: (error: Error) => {
      console.error("Yapılacak eklenirken hata:", error.message);
      alert(`Hata: ${error.message}`);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    addTodoMutation.mutate({
      title,
      completed: false,
      userId: 1,
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <h3>New Todo</h3>
        <input
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="Title.."
        />
        <button type="submit">Add todo</button>
        {addTodoMutation.isError && (
          <p status-message status-error>
            Error: {addTodoMutation.error?.message}
          </p>
        )}
      </form>
    </div>
  );
}
