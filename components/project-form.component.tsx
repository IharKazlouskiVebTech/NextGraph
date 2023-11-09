"use client";

import React, { ChangeEvent, FC, useState } from "react";
import { FormState, ProjectInterface, SessionInterface } from "@/types";
import Image from "next/image";
import FormFieldComponent from "@/components/form-field.component";
import Button from "@/components/button.component";
import CustomMenuComponent from "@/components/menu.component";
import { categoryFilters } from "@/helpers";
import { createNewProject, fetchToken, updateProject } from "@/session/actions";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;
import { useRouter } from "next/navigation";

type ProjectFormProps = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectFormComponent: FC<ProjectFormProps> = ({
  type,
  session,
  project,
}) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token);

        router.push("/");
      }

      if (type === "edit") {
        await updateProject(form, project?.id as string, token);

        router.push("/");
      }
    } catch (error) {
      alert(
        `Failed to ${
          type === "create" ? "create" : "edit"
        } a project. Try again!`,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChange}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="Poster"
            fill
          />
        )}
      </div>
      <FormFieldComponent
        title="Title"
        state={form.title}
        placeholder="Dribble"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormFieldComponent
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        setState={(value) => handleStateChange("description", value)}
      />
      <FormFieldComponent
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://google.com"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormFieldComponent
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/IharKazlouskiVebTech"
        setState={(value) => handleStateChange("githubUrl", value)}
      />
      <CustomMenuComponent
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />
      <div className="flexStart w-full">
        <Button
          title={
            submitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          submitting={submitting}
        />
      </div>
    </form>
  );
};

export default ProjectFormComponent;
