import Link from "next/link";
import { prisma } from "./db"
import { TodoItem } from "../components/todoItem";
import { JSX } from "react";
import 'tailwindcss/tailwind.css';


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
        <h1 className="text-center text-4xl mb-12">CapyTask</h1>
      </header>
        <div className="shadow-lg bg-capytan flex-col">
        <a><img src="capytask.svg" alt="Image of Capybara" className="w-32 h-32 m-auto" /></a>
          
        <h1 className="text-center text-2xl">🌱Todo🌱</h1>
        <div className="text-center mt-12 mb-12">
        <Link href="/add">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2 ml-2 w-48 ">Add To List</button>
        </Link>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2 ml-2 w-48 hover:bg-slate-700 hover:text-slate-100">Delete</button>
        </div>
      <ul className="text-xl ml-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
          ))}
      </ul>
          </div>
    </>
  );
}  