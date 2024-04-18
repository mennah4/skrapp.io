import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Login() {
    async function handleSubmit(formData: FormData) {
        'use server'

        const rawFormData = {
            email: formData.get('email'),
            password: formData.get('password'),
        }

        const res = await fetch('http://localhost:3002/auth/login', {
            method: 'POST',
            body: JSON.stringify(rawFormData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            const { access_token } = await res.json()
            cookies().set('token', access_token, {
                path: '/'
            })
            redirect('/')
        }
    }
    return (
        <div className="h-screen flex justify-center items-center">
            <form className="grid gap-3 max-w-sm w-full shadow-lg px-4 py-3 rounded-medium"
                action={handleSubmit}
            >
                <div>
                    <h1 className="font-semibold text-3xl mb-5">Log In</h1>
                </div>
                <div>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        className="w-full"
                        isRequired
                    />
                </div>
                <div>
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        className="w-full"
                        isRequired
                    />
                </div>
                <div className="flex justify-end">
                    <Button color="primary" type="submit">Log In</Button>
                </div>
            </form>
        </div>
    );
};