import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";

// DELETE /api/ratings/some-game-id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ gameId: string }> },
) {
  const { gameId } = await params;

  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.gameRating.delete({
    where: {
      userId_gameId: {
        userId: user.id,
        gameId,
      },
    },
  });

  return NextResponse.json({ success: true });
}

// GET /api/ratings/some-game-id — оценка конкретной игры
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ gameId: string }> },
) {
  const { gameId } = await params;

  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json(null);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return NextResponse.json(null);

  const rating = await prisma.gameRating.findUnique({
    where: {
      userId_gameId: {
        userId: user.id,
        gameId,
      },
    },
  });

  return NextResponse.json(rating);
}
