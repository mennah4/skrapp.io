"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";

export default function CreateTodo({ createTodo }: any) {
    const { pending } = useFormStatus()

    useEffect(() => {
        console.log("pending", pending)
    }, [pending])

    return (
        <div className="w-full flex items-center" >
            <div className="flex-1">
                <Input
                    isRequired
                    name="text"
                    placeholder="Add todo"
                    disabled={pending}
                />
            </div>
            <Button color="primary" size="sm" className="mx-3" type="submit" isLoading={pending}>
                Create
            </Button>
        </div>)
}