import { Card, CardBody } from "@nextui-org/card";
import { cookies } from "next/headers";
import Todo from "./Todo";
import { revalidatePath } from "next/cache";
import CreateTodo from "./CreateTodo";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

async function getTodos({ searchParams }: any) {
    const res = await fetch(`http://localhost:3002/todos${searchParams?.sort_order ? `?sort_order=${searchParams?.sort_order}` : ''}`, {
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

    const rawFormData = {
        text: formData.get('text'),
    }

    const res = await fetch('http://localhost:3002/todos', {
        method: 'POST',
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

async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get('id')
    const rawFormData = {
        done: formData.get('done'),
    }


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

export default async function Todos({ searchParams }: any) {
    let todos = await getTodos({ searchParams });

    return (
        <div className="max-w-lg w-full mx-auto">
            <h1 className="font-semilbold text-3xl my-5">Todos</h1>
            <div className="w-full flex items-center justify-end">
                <Link color="primary" className="my-3 flex" href={`/todos?sort_order=${searchParams.sort_order === 'desc' ? 'asc' : 'desc'}`}>
                    Sort todos
                    <svg
                        className="e-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.293 4.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L8 7.414V19a1 1 0 1 1-2 0V7.414L3.707 9.707a1 1 0 0 1-1.414-1.414l4-4zM16 16.586V5a1 1 0 1 1 2 0v11.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L16 16.586z"
                            fill="currentColor"
                        />
                    </svg>
                </Link>
            </div>
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