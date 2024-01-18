import { Box, Fade } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [leads, setLeads] = useState([]);


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

  useEffect(() => {
    // Fetch the existing leads when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("https://ymlgp7w2h2jl6fzyhim27yonry0ighas.lambda-url.us-west-2.on.aws",{method: 'GET',userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0'});
        const data = await response.json();
        setLeads(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {

    const setData = async (list) => {
      try {
        console.log(list)
        const response = await fetch(`https://twaiblf6ms6lqj53lfp56suzni0gsyro.lambda-url.us-west-2.on.aws?data=${encodeURI(JSON.stringify(list))}`,{method: 'POST',userAgent:'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0'});
        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
      } else {
          console.error('Error writing data to S3:', response.statusText);
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if(data.userAgreement){
      let newLeads = leads;
      newLeads.push(data);
      setData(newLeads);
  }
  },[data]);

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
