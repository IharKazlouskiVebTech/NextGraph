import React from "react";
import ModalComponent from "@/components/modal.component";
import ProjectFormComponent from "@/components/project-form.component";
import { getCurrentUser } from "@/session/session";
import { redirect } from "next/navigation";
import { SessionInterface } from "@/types";

const CreateProject = async () => {
  const session = (await getCurrentUser()) as SessionInterface;

  if (!session?.user) {
    redirect("/");
  }

  return (
    <ModalComponent>
      <h3 className="modal-head-text"> Create a New Project</h3>
      <ProjectFormComponent type="create" session={session} />
    </ModalComponent>
  );
};

export default CreateProject;
