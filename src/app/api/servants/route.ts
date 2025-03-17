import { servants } from '@/services/database.json'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const page = searchParams.get('page') ?? 1
  const q = searchParams.get('q')

  const sortedServants = servants.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  return Response.json({
    total: sortedServants.length,
    next: +page < Math.ceil(sortedServants.length / 10) ? +page + 1 : null,
    previous: +page > 1 ? +page - 1 : null,
    servants: sortedServants
      .filter((servant) => {
        if (q) {
          return servant.name.includes(q)
        }

        return true
      })
      .slice((+page - 1) * 10, +page * 10),
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  servants.push(body)

  return Response.json(body)
}

export async function DELETE(request: NextRequest) {
  const body = await request.json()

  const index = servants.findIndex((servant) => servant.id === body.id)

  if (index === -1) {
    return Response.json({ message: 'Servant not found' }, { status: 404 })
  }

  servants.splice(index, 1)

  return Response.json({ message: 'Servant deleted' })
}
