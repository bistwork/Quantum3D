import InboxIcon from "@mui/icons-material/MoveToInbox";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FolderIcon from "@mui/icons-material/Folder";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import BuildIcon from "@mui/icons-material/Build";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PrimaryCustomerInformation from "../components/Sections/AddCustomerSection/PrimaryCustomerInformation";
import SecondaryCustomerInformation from "../components/Sections/AddCustomerSection/SecondaryCustomerInformation";
import MailingAddress from "../components/Sections/AddCustomerSection/MailingAddress";
import ProjectAddress from "../components/Sections/AddCustomerSection/ProjectAddress";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewInArIcon from "@mui/icons-material/ViewInAr";

let mockData = {
  // Chose between have itmes or url. If You had items, it will behave as a menu and if you have a url it will behave as LinkButton
  sideMenuData: [
    // {
    //   title: "DashBoard",
    //   icon: <DashboardIcon />,
    //   url: `/home`,
    // },
    {
      title: "Profile",
      icon: <PersonIcon />,
      url: `/profile`,
    },
    // {
    //   title: "Dealer's Staff",
    //   icon: (style) => {
    //     return <PeopleIcon style={style} />;
    //   },
    //   items: [
    //     { title: "option 1", url: "/" },
    //     { title: "option 2", url: "/" },
    //     { title: "option 3", url: "/" },
    //   ],
    // },
    {
      title: "Leads",
      icon: <PersonAddIcon />,
      url: `/leads`,
    },
    {
      title: "Customer",
      icon: <ManageAccountsIcon />,
      url: `/customers`,
    },
    {
      title: "Projects",
      icon: <FolderIcon />,
      url: `/projects`,
    },
    {
      icon: (style) => {
        return <ViewInArIcon style={style} />;
      },
      items: [
        {
          title: "Lattice",
          url: "https://builder.oasispatiosystems.com",
          addUserId: true,
          model: "lattice",
        },
        {
          title: "Insulated",
          url: "https://builder.oasispatiosystems.com",
          addUserId: true,
          model: "insulated",
        },
        {
          title: "Lattice & Insulated Mixed",
          url: "https://builder.oasispatiosystems.com",
          addUserId: true,
          model: "lattice-insulated",
        },
        {
          title: "Mixed",
          url: "https://builder.oasispatiosystems.com",
          addUserId: true,
          model: "mixed",
        },
      ],
      title: "3D Builder",
    },
    // {
    //   title: "Reports",
    //   icon: (style) => {
    //     return <ContentPasteIcon style={style} />;
    //   },
    //   items: [
    //     { title: "option 1", url: "/" },
    //     { title: "option 2", url: "/" },
    //     { title: "option 3", url: "/" },
    //   ],
    // },
    { title: "FAQs", icon: <QuestionMarkIcon />, url: "/faqs" },
    // { title: "Tools of trade", icon: <BuildIcon />, url: "/" },
    // {
    //   title: "Ticket",
    //   icon: (style) => {
    //     return <ConfirmationNumberIcon style={style} />;
    //   },
    //   items: [
    //     { title: "option 1", url: "/" },
    //     { title: "option 2", url: "/" },
    //     { title: "option 3", url: "/" },
    //   ],
    // },
  ],
  tabProfileInfo: ["General Information", "Shipping", "Accounting", "Security","Zipcodes","Documents"],
  createCustomer: [
    {
      label: "Primary Customer information",
      component: PrimaryCustomerInformation,
    },
    {
      label: "Secondary Customer information",
      component: SecondaryCustomerInformation,
    },
    {
      label: "Mailing Address",
      component: MailingAddress,
    },
    {
      label: "Project Address",
      component: ProjectAddress,
    },
  ],
  customersTable: [
    {
      id: 1,
      primaryInfo: {
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
        primaryPhone: "+1 234-567-8901",
        status: "Active",
      },
    },
    {
      id: 2,
      primaryInfo: {
        firstName: "Bob",
        lastName: "Martinez",
        email: "bob.martinez@example.com",
        primaryPhone: "+1 234-567-8902",
        status: "Inactive",
      },
    },
    {
      id: 3,
      primaryInfo: {
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie.brown@example.com",
        primaryPhone: "+1 234-567-8903",
        status: "Active",
      },
    },
    {
      id: 4,
      primaryInfo: {
        firstName: "Diana",
        lastName: "Smith",
        email: "diana.smith@example.com",
        primaryPhone: "+1 234-567-8904",
        status: "Inactive",
      },
    },
    {
      id: 5,
      primaryInfo: {
        firstName: "Eva",
        lastName: "White",
        email: "eva.white@example.com",
        primaryPhone: "+1 234-567-8905",
        status: "Active",
      },
    },
    {
      id: 6,
      primaryInfo: {
        firstName: "Frank",
        lastName: "Black",
        email: "frank.black@example.com",
        primaryPhone: "+1 234-567-8906",
        status: "Inactive",
      },
    },
    {
      id: 7,
      primaryInfo: {
        firstName: "Grace",
        lastName: "Davis",
        email: "grace.davis@example.com",
        primaryPhone: "+1 234-567-8907",
        status: "Active",
      },
    },
    {
      id: 8,
      primaryInfo: {
        firstName: "Henry",
        lastName: "Wilson",
        email: "henry.wilson@example.com",
        primaryPhone: "+1 234-567-8908",
        status: "Inactive",
      },
    },
    {
      id: 9,
      primaryInfo: {
        firstName: "Ivy",
        lastName: "Green",
        email: "ivy.green@example.com",
        primaryPhone: "+1 234-567-8909",
        status: "Active",
      },
    },
    {
      id: 10,
      primaryInfo: {
        firstName: "Jack",
        lastName: "Lee",
        email: "jack.lee@example.com",
        primaryPhone: "+1 234-567-8910",
        status: "Inactive",
      },
    },
    {
      id: 11,
      primaryInfo: {
        firstName: "Karen",
        lastName: "Nelson",
        email: "karen.nelson@example.com",
        primaryPhone: "+1 234-567-8911",
        status: "Active",
      },
    },
    {
      id: 12,
      primaryInfo: {
        firstName: "Larry",
        lastName: "Turner",
        email: "larry.turner@example.com",
        primaryPhone: "+1 234-567-8912",
        status: "Inactive",
      },
    },
    {
      id: 13,
      primaryInfo: {
        firstName: "Mia",
        lastName: "Taylor",
        email: "mia.taylor@example.com",
        primaryPhone: "+1 234-567-8913",
        status: "Active",
      },
    },
    {
      id: 14,
      primaryInfo: {
        firstName: "Nick",
        lastName: "King",
        email: "nick.king@example.com",
        primaryPhone: "+1 234-567-8914",
        status: "Inactive",
      },
    },
    {
      id: 15,
      primaryInfo: {
        firstName: "Olivia",
        lastName: "Wright",
        email: "olivia.wright@example.com",
        primaryPhone: "+1 234-567-8915",
        status: "Active",
      },
    },
    {
      id: 16,
      primaryInfo: {
        firstName: "Paul",
        lastName: "Young",
        email: "paul.young@example.com",
        primaryPhone: "+1 234-567-8916",
        status: "Inactive",
      },
    },
    {
      id: 17,
      primaryInfo: {
        firstName: "Quinn",
        lastName: "Allen",
        email: "quinn.allen@example.com",
        primaryPhone: "+1 234-567-8917",
        status: "Active",
      },
    },
    {
      id: 18,
      primaryInfo: {
        firstName: "Rebecca",
        lastName: "Adams",
        email: "rebecca.adams@example.com",
        primaryPhone: "+1 234-567-8918",
        status: "Inactive",
      },
    },
    {
      id: 19,
      primaryInfo: {
        firstName: "Steve",
        lastName: "Clark",
        email: "steve.clark@example.com",
        primaryPhone: "+1 234-567-8919",
        status: "Active",
      },
    },
    {
      id: 20,
      primaryInfo: {
        firstName: "Tina",
        lastName: "Hall",
        email: "tina.hall@example.com",
        primaryPhone: "+1 234-567-8920",
        status: "Inactive",
      },
    },
  ],
  notifications: [
    {
      id: "1",
      description:
        "Your order #12345 has been shipped! Checkout out your order!",
      category: "Orders",
      read: false,
      createdAt: "2023-10-07T14:24:00Z",
    },
     
  ],
  orders:[
    {
      id: "1",
      description:
        "Your order #12345 has been shipped! Checkout out your order!",
      category: "Orders",
      read: false,
      createdAt: "2023-10-07T14:24:00Z",
    },
    
  ],
  leadsTable: [
    {id:"1"}
  ],
  projectList:[
    {
      comercialId:"PERCYF0KWWO",
      customerLastname:"Grisales",
      customerName:"Maria",
      deliveryDate:"Pending",
      id:"79adf136-80c9-4e6d-95ca-5661070b0ff7",
      orderDate:"2024-01-07T16:36:03.019Z",
      retailAmount:"584",
      status:0
    },
    {
      comercialId:"PERCYF0KWWO",
      customerLastname:"Grisales",
      customerName:"Maria",
      deliveryDate:"Pending",
      id:"79a6f136-80c9-4e6d-95ca-5661070b0ff7",
      orderDate:"2024-01-07T16:36:03.019Z",
      retailAmount:"584",
      status:0
    },
  ]
};

export default mockData;
