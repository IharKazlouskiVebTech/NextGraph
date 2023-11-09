import { redirect } from "next/navigation";
import { getCurrentUser } from "@/session/session";
import { getProjectDetails } from "@/session/actions";
import { ProjectInterface } from "@/types";
import ModalComponent from "@/components/modal.component";
import ProjectFormComponent from "@/components/project-form.component";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!result?.project)
    return <p className="no-result-text">Failed to fetch project info</p>;

  return (
    <ModalComponent>
      <h3 className="modal-head-text">Edit Project</h3>

      <ProjectFormComponent
        type="edit"
        session={session}
        project={result?.project}
      />
    </ModalComponent>
  );
};

export default EditProject;
