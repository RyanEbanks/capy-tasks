import Link from "next/link";
import { prisma } from "./db"

export function myTodo(){
  return prisma.todo.findMany(); //finding all the information in the database
}

export default async function HomePage(){
  const todos = await myTodo();

  return(
    <>
      <header>
        <a><img src="/capytask.svg" alt="Capytask SVG" className="w-32 h-32" /></a>
        <h1>🌱Todo🌱</h1>
      <Link className="" href="/add">
        Add To List
      </Link>
        </header>
        <ul>
          {todos.map (todo => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
    </>
  )
}