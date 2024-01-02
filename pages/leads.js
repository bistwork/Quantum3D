import AddLeadSection from "../components/Sections/AddLeadSection";
import LeadsSection from "../components/Sections/LeadsSection";
import withAuth from "../hooks/authHOC";

function Leads() {
  return (
    <>
      <AddLeadSection />
      <LeadsSection />
    </>
  );
}

export default withAuth(Leads);
