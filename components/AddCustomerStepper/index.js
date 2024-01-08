import React, { useEffect, useRef, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSpring, animated } from "react-spring";
import PrimaryCustomerInformation from "../Sections/AddCustomerSection/PrimaryCustomerInformation";
import SecondaryCustomerInformation from "../Sections/AddCustomerSection/SecondaryCustomerInformation";
import MailingAddress from "../Sections/AddCustomerSection/MailingAddress";
import ProjectAddress from "../Sections/AddCustomerSection/ProjectAddress";
import DataContext from "../../context/customers-context";
import { createCustomerFunc, updateCustomerFunc } from "../../api/customers";
import { useAuth } from "../../context/auth-context";

function CustomCloseIcon(props) {
  return (
    <svg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="close-x-icon"
      viewBox="0 0 16 16"
    >
      <path d="M2 2l12 12M14 2L2 14" />
    </svg>
  );
}

const styleBtn = {
  textTransform: "none",
  fontFamily: "var(--primary-font-family)",
  fontSize: "13px",
  color: "var(--btn-color-blue)",
  border: "1px solid var(--border-color-translucent)",
  "&.MuiButtonBase-root.MuiButton-root:hover": {
    border: "1px solid var(--border-color-translucent)",
  },
};

const submitBtn = {
  textTransform: "none",
  fontFamily: "var(--primary-font-family)",
  fontSize: "13px",
  color: "#fff",
  backgroundColor: "#2dcb73",
  boxShadow: "none",
  "&.MuiButtonBase-root.MuiButton-root:hover": {
    backgroundColor: "#29b768",
    boxShadow: "none",
  },
};

const steps = [
  {
    label: "Primary Customer information",
    component: PrimaryCustomerInformation,
  },
  {
    label: "Mailing Address",
    component: MailingAddress,
  },
  {
    label: "Project Address",
    component: ProjectAddress,
  },
];

export default function AddCustomerStepper(props) {
  const [activeStep, setActiveStep] = useState(0);
  const { user } = useAuth();
  const prevActiveStepRef = useRef(activeStep);
  const { addCustomer, updateCustomer } = useContext(DataContext);
  const [customerData, setCustomerData] = useState(
    props.customerSelected || {}
  );
  const [isStepValid, setIsStepValid] = useState(false);
  const maxSteps = steps.length;
  const [propsSpring, setPropsSpring] = useSpring(() => ({
    transform: "translate3d(100%,0,0)",
    opacity: 1,
  }));

  const handleUpdateData = (name, value) => {
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleValidateStep = (isValid) => {
    setIsStepValid(isValid);
  };

  const handleSubmit = (event) => {
    if (props.customerSelected) {
      updateCustomer(props.customerSelected.id, customerData);
      try {
        updateCustomerFunc(customerData)
          .then((data) => {
            console.log("customer updated", data);
          })
          .catch((error) => {
            console.log("update customer error", error);
          });
      } catch (error) {
        console.error("try catch error", error);
      }
      props.onClose();
    } else {
      //addCustomer
      const createdCustomer = {
        id: uuidv4(),
        userId: user.id,
        primaryInfo: {
          ...customerData.primaryInfo,
          status: "Active",
        },
        // Incluyendo el resto de los datos del cliente
        secondaryInfo: customerData?.secondaryInfo || {},
        mailingAddress: customerData?.mailingAddress || {},
        projectAddress: customerData?.projectAddress || {},
      };
      console.log("new customer ", createdCustomer);
      addCustomer(createdCustomer);
      try {
        createCustomerFunc(createdCustomer)
          .then((data) => {
            console.log("customer created", data);
          })
          .catch((error) => {
            console.log("Creating Customer error", error);
          });
      } catch (error) {
        console.error("try catch error", error);
      }
      props.onClose();
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const goingForward = activeStep > prevActiveStepRef.current;

    setPropsSpring.start({
      transform: "translate3d(0%,0,0)",
      opacity: 1,
      from: {
        transform: `translate3d(${goingForward ? "100%" : "-100%"},0,0)`,
        opacity: 0,
      },
      reset: true,
    });

    prevActiveStepRef.current = activeStep;
  }, [activeStep]);

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 3,
          pr: 3,
          bgcolor: "rgba(238, 240, 247)",
          justifyContent: "space-between",
          height: "56px",
        }}
      >
        <Typography noWrap fontWeight={500} color="#0f1114">
          {steps[activeStep].label}
        </Typography>

        <CustomCloseIcon onClick={props.onClose} />
      </Paper>
      <Box sx={{ p: 2, height: 600, position: "relative", overflow: "hidden" }}>
        <animated.div style={propsSpring}>
          {React.createElement(steps[activeStep].component, {
            data: customerData,
            onUpdate: handleUpdateData,
            onValidate: handleValidateStep,
          })}
        </animated.div>
      </Box>
      <MobileStepper
        sx={{ p: 2, fontSize: "13px" }}
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          activeStep === maxSteps - 1 ? (
            <Button
              size="small"
              variant="contained"
              onClick={handleSubmit}
              disabled={!isStepValid}
              sx={submitBtn}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={handleNext}
              disabled={!isStepValid}
              sx={styleBtn}
            >
              Next
            </Button>
          )
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outlined"
            sx={styleBtn}
          >
            Back
          </Button>
        }
      />
    </Box>
  );
}
