import AddProjectSection from "@/components/Sections/AddProjectSection";
import ProjectSection from "@/components/Sections/ProjectSection";
import withAuth from "@/hooks/authHOC";

function Projects() {
  return (
    <>
      <AddProjectSection />
      <ProjectSection />
    </>
  );
}

export default withAuth(Projects);
