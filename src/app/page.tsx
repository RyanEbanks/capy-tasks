import Link from "next/link";
import { prisma } from "./db"
import { TodoItem } from "../components/todoItem";
import { JSX } from "react";
import "./globals.css";

export function getTodo() {
  return prisma.todo.findMany(); //finding all the information in the database
}

//Using a server side rendered component
async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete } });

  console.log(id, complete);
}

export default async function HomePage() {
  const todos = await getTodo();

  return (
    <>
      <header>
        <a><img src="capytask.svg" alt="Image of Capybara" className="w-32 h-32" /></a>
        <h1>🌱Todo🌱</h1>
        <Link href="/add">
          <button>Add To List</button>
        </Link>
      </header>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}  