import { Card, CardBody } from "@nextui-org/card";
import { cookies } from "next/headers";
import Todo from "./Todo";
import { revalidatePath } from "next/cache";
import CreateTodo from "./CreateTodo";

async function getTodos() {
    const res = await fetch('http://localhost:3002/todos', {
        headers: {
            Authorization: `Bearer ${cookies().get('token')?.value}`
        }
    })

    if (res.ok) {
        return res.json()
    }
    return [];
}

async function createTodo(formData: FormData) {
    'use server'

    console.log("Creating todo")
    const rawFormData = {
        text: formData.get('text'),
    }

    console.log(rawFormData)

    const res = await fetch('http://localhost:3002/todos', {
        method: 'POST',
        body: JSON.stringify(rawFormData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies().get('token')?.value}`
        }
    })

    console.log(res)

    if (res.ok) {
        revalidatePath('/todos')
    }
}

async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get('id')
    const rawFormData = {
        done: formData.get('done'),
    }

    console.log(rawFormData)

    const res = await fetch(`http://localhost:3002/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(rawFormData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies().get('token')?.value}`
        }
    })

    if (res.ok) {
        revalidatePath('/todos')
    }
}

async function updateText(formData: FormData) {
    "use server";
    const id = formData.get('id')
    const rawFormData = {
        text: formData.get('text'),
    }

    console.log(rawFormData)

    const res = await fetch(`http://localhost:3002/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(rawFormData),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies().get('token')?.value}`
        }
    })

    if (res.ok) {
        revalidatePath('/todos')
    }
}

async function deleteTodo(formData: FormData) {
    "use server";

    const id = formData.get('id')

    const res = await fetch(`http://localhost:3002/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies().get('token')?.value}`
        }
    })

    if (res.ok) {
        revalidatePath('/todos')
    }
}

export default async function Todos() {
    const todos = await getTodos();
    console.log('todos', todos)

    return (
        <div className="max-w-lg w-full mx-auto">
            <h1 className="font-semilbold text-3xl my-5">Todos</h1>

            <div className="space-y-3">
                {todos?.map((t: any) => ({ ...t, initialText: t.text })).map((todo: any) => (
                    <Card className="" key={todo.id}>
                        <CardBody>
                            <Todo todo={todo} updateStatus={updateStatus} updateText={updateText} deleteTodo={deleteTodo} />
                        </CardBody>
                    </Card>
                ))}
            </div>

            <Card className="mt-4">
                <CardBody>
                    <form className="relative" action={createTodo}>
                        <CreateTodo />
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}