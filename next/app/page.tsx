import { Link } from '@nextui-org/link';
import { cookies } from 'next/headers';

async function getUser() {
  const res = await fetch('http://localhost:3002/auth/profile', {
    headers: {
      Authorization: `Bearer ${cookies().get('token')?.value}`
    }
  })

  if (res.ok) {
    return res.json()
  }
  return null;
}

export default async function Home() {
  const data = await getUser();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className='text-3xl font-semibold mb-8'>Welcome {data?.email}</h1>
      {data?.email ? <>
          <Link color="primary" href="/todos">
            Todos
          </Link>
        </> : <Link color="primary" href='/login'>
          Go to Login
        </Link>}
    </main>
  );
}
