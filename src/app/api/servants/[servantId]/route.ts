import { servants } from '@/services/database.json'
import { NextRequest } from 'next/server'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ servantId: string }> },
) {
  const { servantId } = await params

  return Response.json({
    servant: servants.find((servant) => servant.id === servantId),
  })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ servantId: string }> },
) {
  const { servantId } = await params
  const body = await request.json()

  const index = servants.findIndex((servant) => servant.id === servantId)

  if (index === -1) {
    return Response.json({ message: 'Servant not found' }, { status: 404 })
  }
  servants[index] = body

  return Response.json(body)
}
