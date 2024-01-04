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
          url: "https://master.dsl41qh9h6syf.amplifyapp.com",
          addUserId: true,
          model: "lattice",
        },
        {
          title: "Insulated",
          url: "https://master.dsl41qh9h6syf.amplifyapp.com",
          addUserId: true,
          model: "insulated",
        },
        {
          title: "Mix",
          url: "https://master.dsl41qh9h6syf.amplifyapp.com",
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
    { title: "FAQs", icon: <QuestionMarkIcon />, url: "/" },
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
  tabProfileInfo: ["General Information", "Shipping", "Accounting", "Security"],
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
      read: true,
      createdAt: "2023-10-07T14:24:00Z",
    },
    {
      id: "2",
      description:
        "A new comment has been posted on your article. Go head and provide any feedback.",
      category: "Comments",
      read: false,
      createdAt: "2023-10-07T12:30:45Z",
    },
    {
      id: "3",
      description:
        "Your monthly report is ready for review. Be sure to review it before submitting.",
      category: "Reports",
      read: false,
      createdAt: "2023-10-10T09:15:32Z",
    },
    {
      id: "4",
      description:
        "Your subscription will expire in 3 days. Lets try to subscribe again.",
      category: "Subscriptions",
      read: false,
      createdAt: "2023-10-06T08:10:17Z",
    },
    {
      id: "5",
      description:
        "A new version of the app is available. Go to the App Store and update your App",
      category: "Updates",
      read: false,
      createdAt: "2023-10-05T18:50:12Z",
    },
    {
      id: "6",
      description:
        "Your password will expire in 7 days. Click the next link to reset your password",
      category: "Security",
      read: false,
      createdAt: "2023-10-04T15:20:11Z",
    },
    {
      id: "7",
      description:
        "A friend has tagged you in a post. Check it out here and say hello.",
      category: "Social",
      read: true,
      createdAt: "2023-10-03T13:15:29Z",
    },
    {
      id: "8",
      description:
        "Your credit card will be charged soon. Set up the auto payments before the due date.",
      category: "Payments",
      read: false,
      createdAt: "2023-10-02T11:30:09Z",
    },
    {
      id: "9",
      description:
        "A new playlist has been created for you. Enjoy your tracks and playlist with us!",
      category: "Music",
      read: true,
      createdAt: "2023-10-01T09:45:00Z",
    },
    {
      id: "10",
      description:
        "You have a meeting scheduled for tomorrow. Be ready for the ocasion.",
      category: "Calendar",
      read: false,
      createdAt: "2023-09-30T14:05:27Z",
    },
  ],
  leadsTable: [
    {id:"1"}
  ],
  // customersTable: [
  //   {
  //     id: 1,
  //     fullName: "Alice Johnson",
  //     email: "alice.johnson@example.com",
  //     phoneNumber: "+1 234-567-8901",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     fullName: "Bob Martinez",
  //     email: "bob.martinez@example.com",
  //     phoneNumber: "+1 234-567-8902",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 3,
  //     fullName: "Charlie Brown",
  //     email: "charlie.brown@example.com",
  //     phoneNumber: "+1 234-567-8903",
  //     status: "Active",
  //   },
  //   {
  //     id: 4,
  //     fullName: "Diana Smith",
  //     email: "diana.smith@example.com",
  //     phoneNumber: "+1 234-567-8904",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 5,
  //     fullName: "Eva White",
  //     email: "eva.white@example.com",
  //     phoneNumber: "+1 234-567-8905",
  //     status: "Active",
  //   },
  //   {
  //     id: 6,
  //     fullName: "Frank Black",
  //     email: "frank.black@example.com",
  //     phoneNumber: "+1 234-567-8906",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 7,
  //     fullName: "Grace Davis",
  //     email: "grace.davis@example.com",
  //     phoneNumber: "+1 234-567-8907",
  //     status: "Active",
  //   },
  //   {
  //     id: 8,
  //     fullName: "Henry Wilson",
  //     email: "henry.wilson@example.com",
  //     phoneNumber: "+1 234-567-8908",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 9,
  //     fullName: "Ivy Green",
  //     email: "ivy.green@example.com",
  //     phoneNumber: "+1 234-567-8909",
  //     status: "Active",
  //   },
  //   {
  //     id: 10,
  //     fullName: "Jack Lee",
  //     email: "jack.lee@example.com",
  //     phoneNumber: "+1 234-567-8910",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 11,
  //     fullName: "Karen Nelson",
  //     email: "karen.nelson@example.com",
  //     phoneNumber: "+1 234-567-8911",
  //     status: "Active",
  //   },
  //   {
  //     id: 12,
  //     fullName: "Larry Turner",
  //     email: "larry.turner@example.com",
  //     phoneNumber: "+1 234-567-8912",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 13,
  //     fullName: "Mia Taylor",
  //     email: "mia.taylor@example.com",
  //     phoneNumber: "+1 234-567-8913",
  //     status: "Active",
  //   },
  //   {
  //     id: 14,
  //     fullName: "Nick King",
  //     email: "nick.king@example.com",
  //     phoneNumber: "+1 234-567-8914",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 15,
  //     fullName: "Olivia Wright",
  //     email: "olivia.wright@example.com",
  //     phoneNumber: "+1 234-567-8915",
  //     status: "Active",
  //   },
  //   {
  //     id: 16,
  //     fullName: "Paul Young",
  //     email: "paul.young@example.com",
  //     phoneNumber: "+1 234-567-8916",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 17,
  //     fullName: "Quinn Allen",
  //     email: "quinn.allen@example.com",
  //     phoneNumber: "+1 234-567-8917",
  //     status: "Active",
  //   },
  //   {
  //     id: 18,
  //     fullName: "Rebecca Adams",
  //     email: "rebecca.adams@example.com",
  //     phoneNumber: "+1 234-567-8918",
  //     status: "Inactive",
  //   },
  //   {
  //     id: 19,
  //     fullName: "Steve Clark",
  //     email: "steve.clark@example.com",
  //     phoneNumber: "+1 234-567-8919",
  //     status: "Active",
  //   },
  //   {
  //     id: 20,
  //     fullName: "Tina Hall",
  //     email: "tina.hall@example.com",
  //     phoneNumber: "+1 234-567-8920",
  //     status: "Inactive",
  //   },
  // ],
};

export default mockData;
