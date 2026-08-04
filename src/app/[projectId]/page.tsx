import { getUser } from "@/actions";
import { getProject } from "@/actions/get-project";
import { MainContent } from "@/app/main-content";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { projectId } = await params;
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  try {
    const project = await getProject(projectId);
    return <MainContent user={user} project={project} />;
  } catch {
    redirect("/");
  }
}
