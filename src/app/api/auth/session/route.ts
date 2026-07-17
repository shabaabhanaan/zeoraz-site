import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const cookiesString = req.headers.get("cookie") || "";
    const sessionCookie = cookiesString
      .split("; ")
      .find((c) => c.trim().startsWith("zeoraz_session="));

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false });
    }

    const token = sessionCookie.split("=")[1];
    const decoded = verifyToken(token) as { workspaceId: string; email: string } | null;

    if (!decoded) {
      return NextResponse.json({ authenticated: false });
    }

    const workspace = await prisma.workspace.findUnique({
      where: { id: decoded.workspaceId },
      include: {
        workflows: {
          include: {
            logs: {
              orderBy: { executedAt: "desc" },
              take: 10
            }
          }
        }
      }
    });

    if (!workspace) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      email: decoded.email,
      workspaceName: workspace.name,
      apiKey: workspace.apiKey,
      runtimes: workspace.runtimes.split(","),
      workflows: workspace.workflows,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
export const dynamic = 'force-dynamic';
