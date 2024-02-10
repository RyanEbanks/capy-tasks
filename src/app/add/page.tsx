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
        <header>
            <h1 className="text-center text-4xl mb-12">CapyTask</h1>
            </header>
        <div className="shadow-lg bg-capytan flex-col">
        <a><img src="capytask.svg" alt="Image of Capybara" className="w-32 h-32 m-auto" /></a>
            <h1 className="text-center text-2xl">Add More to Your List</h1>
        <form action={createTodo} className="text-center mt-20"> 
            <input type="text" name="title" className="border border-slate-800 w-48 h-10 p-2 focus:border-blue-500 rounded-2xl"/>
            <div className="mt-20">
                <Link href="..">
                <button type="submit" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-2 mr-2 mb-10">Cancel</button>
                    </Link>
                <button type="submit" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-2 mr-2 mb-10">Submit</button>
            </div>
        </form>
        </div>
        </>
    )
}