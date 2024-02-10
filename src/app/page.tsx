import Link from "next/link";
import { prisma } from "./db"
import { TodoItem } from "../components/todoItem";
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
        <h1 className="text-center text-6xl mb-12">CapyTask</h1>
      </header>
      <div className="shadow-lg shadow-slate-500 bg-capytan flex-col rounded-2xl">
        <a><img src="capytask.svg" alt="Image of Capybara" className="w-32 h-32 m-auto" /></a>

        <h1 className="text-center text-4xl text-gray-800">🌱Todo🌱</h1>
        <div className="text-center mt-12 mb-20">
          <Link href="/add">
            <button className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2 ml-2 w-48  hover:bg-slate-700 hover:text-slate-100">Add To List</button>
          </Link>
          <button 
          className="bg-red-500 text-slate-100 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2 ml-2 w-48 opacity-50 cursor-not-allowed">Delete</button>
        </div>
        <ul className="text-xl ml-10 text-gray-800">
          {todos.map(todo => (
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
          ))}
        </ul>
      </div>
    </>
  );
}  