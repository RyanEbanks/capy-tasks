import Link from "next/link";

export default function Page(){
    return(
        <>
        <header><h1>Add More to Your List</h1></header>
        <form>
            <input type="text" name="title" />
            <div>
                <Link href="..">Cancel</Link>
                <button type="submit"></button>
            </div>
        </form>
        </>
    )
}