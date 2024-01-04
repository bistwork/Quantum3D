import { Box, Fade } from "@mui/material";
import { useState } from "react";
import LocationProject from "../components/Sections/NewUserFormSection/LocationProject";
import TypeOfProject from "../components/Sections/NewUserFormSection/TypeOfProject";
import ProjectFullAddress from "../components/Sections/NewUserFormSection/ProjectFullAddress";
import TypeOfProperty from "../components/Sections/NewUserFormSection/TypeOfProperty";
import ToDo from "../components/Sections/NewUserFormSection/ToDo";
import MoreInfo from "../components/Sections/NewUserFormSection/MoreInfo";
import UserAgreement from "../components/Sections/NewUserFormSection/UserAgreement";
import ThankYou from "../components/Sections/NewUserFormSection/ThankYou";
import withPublicAccess from "../hooks/withPublicAccess";

function NewUserForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState({});
  const [showComponent, setShowComponent] = useState(true);

  console.log("data", data);

  const sections = [
    { Component: LocationProject, key: "location", field: "projectLocation" },
    { Component: TypeOfProject, key: "type", field: "typeOfProject" },
    //     { Component: ToDo, key: "todo", field: "toDo" },
    { Component: ProjectFullAddress, key: "address", field: "projectAddress" },
    { Component: TypeOfProperty, key: "property", field: "typeOfProperty" },
    { Component: MoreInfo, key: "info", field: "moreInfo" },
    { Component: UserAgreement, key: "agreement", field: "userAgreement" },
    { Component: ThankYou, key: "thank", field: "thankYou" },
  ];

  const handleNext = (answer, index) => {
    setData((prev) => ({ ...prev, [sections[index].field]: answer }));
    changeComponent(index + 1);
  };

  const handlePrevious = (index) => {
    changeComponent(index - 1);
  };

  const changeComponent = (index) => {
    setShowComponent(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setShowComponent(true);
    }, 500);
  };

  const components = sections.map((section, index) => (
    <section.Component
      key={section.key}
      data={data}
      onNext={
        index !== sections.length - 1
          ? (answer) => handleNext(answer, index)
          : undefined
      }
      onPrevious={index !== 0 ? () => handlePrevious(index) : undefined}
    />
  ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "90vw",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "180px",
        }}
      >
        <img src="/Pergalum_Color.webp" alt="Description" />
      </Box>

      <Fade in={showComponent} mountOnEnter timeout={500}>
        <div className={'dummy'} style={{ width: "50%", maxWidth: "700px", minWidth: "600px" }}>
          {components[currentIndex]}
        </div>
      </Fade>
    </Box>
  );
}

export default withPublicAccess(NewUserForm);
