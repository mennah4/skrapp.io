import { cookies } from "next/headers"

async function getData(id: number) {
  const res = await fetch(`http://localhost:3002/todos/${id}`, {
    headers: {
      'Authorization': `Bearer ${cookies().get('token')?.value}`
    }
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function Page({ params }: { params: { id: number } }) {
  const data = await getData(params.id)

    return <div className="h-screen flex flex-col justify-center items-center">
      <h1>My Todo id: {params.id}</h1>
      <h2>
        Text: {data.text}
      </h2>
    </div>
  }