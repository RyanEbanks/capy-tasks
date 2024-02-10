type TodoItemProps = {
    id: string,
    title: string,
    complete: boolean
};

//Peer allows me to add diferent styles to the label if unchecked
export function TodoItem({id, title, complete}: TodoItemProps) {
    return <li>
        <input id= {id} type="checkbox" className="cursor-pointer peer" /> 
        <label htmlFor={id} className="peer-checked:line-through">
            {title}
        </label>
    </li>
}