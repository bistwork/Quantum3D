import AddCustomerSection from "../components/Sections/AddCustomerSection";
import CustomerSection from "../components/Sections/CustomerSection";
import withAuth from "../hooks/authHOC";

function Customers() {
  return (
    <>
      <AddCustomerSection />
      <CustomerSection />
    </>
  );
}

export default withAuth(Customers);
