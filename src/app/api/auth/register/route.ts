import { NextResponse } from "next/server";
import { hashPassword, signToken } from "@/lib/auth";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, orgName, runtimes } = await req.json();

    if (!email || !orgName || !runtimes) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Check or Create User
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const dummyPassword = crypto.randomBytes(16).toString("hex");
      user = await prisma.user.create({
        data: {
          email,
          password: hashPassword(dummyPassword),
        },
      });
    }

    // 2. Create Workspace & provision API Key
    const apiKey = `zr_live_${crypto.randomBytes(16).toString("hex")}`;
    const workspace = await prisma.workspace.create({
      data: {
        name: orgName,
        apiKey,
        runtimes: runtimes.join(","),
        ownerId: user.id,
      },
    });

    // 3. Create a default mock workflow to populate the dashboard console
    const defaultWorkflow = await prisma.workflow.create({
      data: {
        name: "Global Node Cache Sync",
        workspaceId: workspace.id,
        dagJson: JSON.stringify({
          nodes: [
            { id: "trigger", type: "webhook", parameters: {} },
            { id: "sync-node", type: "http", parameters: { method: "POST", url: "https://api.zeoraz.dev/sync" } },
            { id: "notify", type: "email", parameters: { to: email } }
          ],
          connections: [
            { source: "trigger", target: "sync-node" },
            { source: "sync-node", target: "notify" }
          ]
        })
      }
    });

    // 4. Seed initial execution logs so metrics charts display real values immediately
    await prisma.executionLog.createMany({
      data: [
        {
          workflowId: defaultWorkflow.id,
          status: "SUCCESS",
          payload: JSON.stringify({ origin: "webhook" }),
          context: JSON.stringify({ latency: "4.82ms" }),
        },
        {
          workflowId: defaultWorkflow.id,
          status: "SUCCESS",
          payload: JSON.stringify({ origin: "cron" }),
          context: JSON.stringify({ latency: "5.12ms" }),
        }
      ]
    });

    // 5. Sign JWT session token
    const token = signToken({ userId: user.id, email: user.email, workspaceId: workspace.id });

    const response = NextResponse.json({
      success: true,
      apiKey,
      workspaceId: workspace.id,
    });

    // Set cookie header
    response.cookies.set("zeoraz_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    console.error("Register API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal registration error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
