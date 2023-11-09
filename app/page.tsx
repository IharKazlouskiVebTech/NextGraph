import { fetchAllProjects } from "@/session/actions";
import { ProjectInterface } from "@/types";
import { FC } from "react";
import CategoriesComponent from "@/components/categories.component";
import ProjectCardComponent from "@/components/project-card.component";

type ProjectsSearch = {
  projectSearch: {
    edges: {
      node: ProjectInterface;
    }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: boolean;
      endCursor: boolean;
    };
  };
};

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
};

type HomeProps = {
  searchParams: SearchParams;
};

const Home = async ({ searchParams: { category, endcursor } }: HomeProps) => {
  const data = (await fetchAllProjects(category, endcursor)) as ProjectsSearch;

  const projects = data?.projectSearch?.edges || [];

  if (projects.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">No, projects found</p>
      </section>
    );
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <CategoriesComponent />

      <section className="projects-grid">
        {projects.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCardComponent
            key={`${node?.id}`}
            id={node.id}
            image={node.image}
            title={node.title}
            name={node.createdBy.name}
            avatarUrl={node.createdBy.avatarUrl}
            userId={node.createdBy.id}
          />
        ))}
      </section>
    </section>
  );
};

export default Home;
