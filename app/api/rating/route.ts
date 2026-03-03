import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

// GET /api/ratings — получить все оценки текущего пользователя
export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      gameRatings: {
        orderBy: { updatedAt: "desc" },
      },
    },
  });

  return NextResponse.json(user?.gameRatings ?? []);
}

// POST /api/ratings — добавить/обновить оценку
export async function POST(req: NextRequest) {
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

  const body = await req.json();
  const {
    gameId,
    gameName,
    gameImage,
    summary,
    story,
    visual,
    tech,
    gameplay,
    sub,
    review,
  } = body;

  // Валидация
  if (!gameId || !gameName || !summary || summary < 1 || summary > 10) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // upsert — создаёт или обновляет
  const gameRating = await prisma.gameRating.upsert({
    where: {
      userId_gameId: {
        userId: user.id,
        gameId: String(gameId),
      },
    },
    update: {
      story,
      visual,
      gameplay,
      tech,
      sub,
      summary,
      review,
      gameName,
      gameImage,
    },
    create: {
      userId: user.id,
      gameId: String(gameId),
      gameName,
      gameImage,
      story,
      visual,
      gameplay,
      tech,
      sub,
      summary,
      review,
    },
  });

  return NextResponse.json(gameRating);
}
