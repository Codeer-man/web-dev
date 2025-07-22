import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChangeEvent, FormEvent, useState } from "react";

type addTodo = {
  onAddTodo: (todoText: string) => void;
};

export default function AddTodo(props: addTodo) {
  const [text, setText] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onAddTodo(text);
    setText("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-5">
      <Input
        onChange={handleChange}
        type="text"
        placeholder="Write a todo"
        value={text}
      />
      <Button className="text-white" type="submit">
        Add todo
      </Button>
    </form>
  );
}
