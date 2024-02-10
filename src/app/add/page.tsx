import Link from "next/link";
import { prisma } from "../db";
import { redirect } from "next/navigation";

async function createTodo(data: FormData) {
    "use server"
    
    const title= data.get("title")?.valueOf()

    console.log("Hi I'm using the server");

    if(typeof title !== "string" || title.length === 0){
        throw new Error("Invalid Entry");
    }
    await prisma.todo.create({ data: {title, complete: false}});
    redirect("/");
}

//The create todo form will generate the list when the form is submitted
export default function Page(){
    return(
        <>
        <header><h1>Add More to Your List</h1></header>
        <form action={createTodo}> 
            <input type="text" name="title" />
            <div>
                <Link href="..">Cancel</Link>
                <button type="submit">Submit</button>
            </div>
        </form>
        </>
    )
}