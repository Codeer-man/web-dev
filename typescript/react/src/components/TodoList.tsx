import { Delete } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

type TodoListProps = {
  items: { id: string; text: string }[];
  removeTodoHandler: (id: string) => void;
};

export default function TodoList(props: TodoListProps) {
  return (
    <div className="grid grid-cols-5 gap-5 my-5">
      {props.items.map((todo) => (
        <Card key={todo.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{todo.text} </CardTitle>
            <Button
              onClick={() => props.removeTodoHandler(todo.id)}
              variant={"destructive"}
              size={"icon"}
              className="h-6 w-6 text-white"
            >
              <Delete />{" "}
            </Button>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
