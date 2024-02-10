import { prisma } from "../app/db";

"use client"

type TodoItemProps = {
    id: string,
    title: string,
    complete: boolean,
    toggleTodo:(id: string, complete: boolean) => void
};

//Peer allows me to add diferent styles to the label if unchecked
export function TodoItem({id, title, complete, toggleTodo}: TodoItemProps) {
    return <li>
        <input id= {id} type="checkbox" className="cursor-pointer peer" 
        defaultChecked={complete}
        onChange={e => toggleTodo(id, e.target.checked)}/> 
        <label htmlFor={id} className="peer-checked:line-through">
            {title}
        </label>
    </li>
}