import MainCard from '@/components/MainCard';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { fetchOrder } from '@/api/projects';
import withAuth from "@/hooks/authHOC";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ProjectOverview from '@/components/Sections/ProjectSection/ProjectOverview';

const dateFormatter = (dateString) =>{

    const date = new Date(dateString);

    // Define month names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Extract components from the Date object
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Format the date in the desired format
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate
};
const ProjectOverviewPage = () => {

    const [projectInfo,setProjectInfo] = useState(null);
    const possibleStatus = ['Pending Approval','Payment Pending','Payment Received','In Production','Project Completed','Project Canceled','Project Refund'];
    const router = useRouter();
    const id = router.query.projectId;
    const projectId = null;
    if(id && !projectInfo){try {
        fetchOrder(id)
          .then((data) => {
            console.log(data);
            setProjectInfo(data);
          })
          .catch((error) => {
            console.log("Login error", error);
          });
      } catch (error) {
        console.error("try catch error", error);
      }}

    return (
        <div>
        <h4>Project Overview</h4>
        <Box mb={5}>
            <MainCard
            sx={{
                padding: "1.3em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "var(--primary-font-family)",
                }}
            >
                <Box sx={{
                    display:"flex",
                    flexDirection: "column",
                    alignItems:'start',
                    justifyContent: "center"
                    }}>
                    <Typography component="p" color={'#878a99'} fontSize={13} marginBottom={"8px"}>Project ID</Typography>
                    <Typography component="h6" fontWeight={600}>{projectInfo?projectInfo.comercialId:"ID"}</Typography>
                </Box>
                <Typography component="h6" fontWeight={600}>{projectInfo?dateFormatter(projectInfo.createdAt):"Date"}</Typography>

            </MainCard>
            <Box sx={{display:"flex",justifyContent: "space-between",gap:'1em',margin:0,marginTop: "1.25rem"}} mb={5}>
                <MainCard 
                sx={{
                    width:'25%',
                    padding: "1.3em",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                    justifyContent:"space-between",
                    gap:".1rem",
                    borderBottom: "2px solid #181a20"
                    
                }}
                >
                    <Box
                    sx={{
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent:"start",                        
                    }}>
                        <Typography component="h6" fontWeight={600} marginBottom={'8px'}>Customer Info</Typography>
                        <Typography component="p" fontSize={"14px"}>{projectInfo?`${projectInfo.customer.primaryInfo.firstName} ${projectInfo.customer.primaryInfo.lastName}`:'Name'}</Typography>
                        <Typography component="p" fontSize={"13px"} color={"#878a99!important"}>{projectInfo?`${projectInfo.customer.primaryInfo.email}`:'Email'}</Typography>
                        <Typography component="p" fontSize={"13px"} color={"#878a99!important"}>{projectInfo?`${projectInfo.customer.primaryInfo.primaryPhone}`:'Phone'}</Typography>
                    </Box>
                    <Box sx={{
                        display:'inline-flex',
                        padding:'0.5rem',
                        borderRadius:'0.125rem',
                        justifyContent:'center',
                        alignItems:'center',
                        color:"#181a20",
                        backgroundColor:'#a1a1a1',
                        }}>

                        <AccountBoxOutlinedIcon/>
                    </Box>

                </MainCard>

                <MainCard
                sx={{
                    width:'25%',
                    padding: "1.3em",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                    justifyContent:"space-between",
                    gap:".1rem",
                    borderBottom: "2px solid  #3762ea"
                }}
                >   
                    <Box sx={{
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent:"start",                        
                    }}>
                        <Typography component="h6" fontWeight={600} marginBottom={'8px'}>Shipping Info</Typography>
                        <Typography component="p" fontSize={"14px"}>{projectInfo?`${projectInfo.customer.primaryInfo.firstName} ${projectInfo.customer.primaryInfo.lastName}`:'Name'}</Typography>
                        <Typography component="p" fontSize={"13px"} color={"#878a99!important"}>{projectInfo?`${projectInfo.customer.mailingAddress.address}`:'Address'}</Typography>
                        <Typography component="p" fontSize={"13px"} color={"#878a99!important"}>{projectInfo?`${projectInfo.customer.mailingAddress.city}, ${projectInfo.customer.mailingAddress.state}`:'City/State'}</Typography>
                    </Box>
                    <Box sx={{
                        display:'inline-flex',
                        padding:'0.5rem',
                        borderRadius:'0.125rem',
                        justifyContent:'center',
                        alignItems:'center',
                        color:"#3762ea",
                        backgroundColor:'#e1e7fc',
                        }}>

                        <LocalShippingOutlinedIcon/>
                    </Box>   
                </MainCard>

                <MainCard
                sx={{
                    width:'25%',
                    padding: "1.3em",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                    justifyContent:"space-between",
                    gap:".1rem",
                    borderBottom: "2px solid #50B3C3"
                }}
                >
                <Box
                sx={{
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent:"start",                        
                }}>

                    <Typography component="h6" fontWeight={600} marginBottom={'8px'}>Billing Info</Typography>
                    <Typography component="p" fontSize={"14px"}>{projectInfo?`${projectInfo.customer.primaryInfo.firstName} ${projectInfo.customer.primaryInfo.lastName}`:'Name'}</Typography>
                    <Typography component="p" fontSize={"13px"} color={"#878a99!important"}>{projectInfo?`${projectInfo.customer.mailingAddress.address}`:'Address'}</Typography>
                    <Typography component="p" fontSize={"13px"} color={"#878a99!important"}>{projectInfo?`${projectInfo.customer.mailingAddress.city}, ${projectInfo.customer.mailingAddress.state}`:'City/State'}</Typography>
                </Box>

                <Box sx={{
                        display:'inline-flex',
                        padding:'0.5rem',
                        borderRadius:'0.125rem',
                        justifyContent:'center',
                        alignItems:'center',
                        color:"rgb(74, 176, 193)",
                        backgroundColor:'#e4f3f6',
                        }}>

                        <ArticleOutlinedIcon/>
                    </Box>   

                </MainCard>

                <MainCard
                sx={{
                    width:'25%',
                    padding: "1.3em",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                    justifyContent:"space-between",
                    gap:".1rem",
                    borderBottom: "2px solid #cae1fc00"
                }}
                >
                    <Box
                    sx={{
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent:"start",                        
                    }}>
                        <Typography component="h6" fontWeight={600} marginBottom={'8px'}>Payment Info</Typography>
                        <Typography component="p" fontSize={"14px"}>{projectInfo?`${projectInfo.comercialId}`:'Commercial ID'}</Typography>
                    </Box>

                    <Box sx={{
                        display:'inline-flex',
                        padding:'0.5rem',
                        borderRadius:'0.125rem',
                        justifyContent:'center',
                        alignItems:'center',
                        color:"#000",
                        backgroundColor:'rgb(238, 240, 247)',
                        }}>

                        <MonetizationOnOutlinedIcon/>
                    </Box>   
                </MainCard>
            </Box>
            <Box sx={{display:"flex",justifyContent: "space-between",gap:'1em',marginTop: "1.25rem"}} mb={5}>
                <MainCard sx={{width:'83.5%',
                    padding: "1.3em",
                    display: "flex",
                    flexDirection:"column"}}>
                    <Typography component="h6" fontWeight={600}>Project Items</Typography>

                    <Box>
                        <ProjectOverview>{projectInfo?projectInfo:null}</ProjectOverview>
                    </Box>

                    <Box sx={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        marginTop: "12px",
                        gap:'1em',
                    }}>
                        <Box sx={{
                            width:"25%",
                            padding:'1rem',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignContent:'center',
                            border:"1px solid #50505040",
                            textAlign:'center',
                            borderRadius:'0.250rem'
                        }}>
                            <Typography component='p' fontSize={"14px"} color={'#878a99'}>Project Date</Typography>
                            <Typography component='h6' fontSize={"14px"} fontWeight={600}>{dateFormatter(projectInfo?projectInfo.createdAt:"Date")}</Typography>
                        </Box>
                        <Box sx={{
                            width:"25%",
                            padding:'1rem',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignContent:'center',
                            border:"1px solid #50505040",
                            textAlign:'center',
                            borderRadius:'0.250rem'
                        }}>
                            <Typography component='p' fontSize={"14px"} color={'#878a99'}>Delivery Date</Typography>
                            <Typography component='h6' fontSize={"14px"} fontWeight={600}>{projectInfo?projectInfo.deliveryDate:"Delivery Date"}</Typography>
                        </Box>
                        <Box sx={{
                            width:"25%",
                            padding:'1rem',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignContent:'center',
                            border:"1px solid #50505040",
                            textAlign:'center',
                            borderRadius:'0.250rem'
                        }}>
                            <Typography component='p' fontSize={"14px"} color={'#878a99'}>Project Amount</Typography>
                            <Typography component='h6' fontSize={"14px"} fontWeight={600}>{projectInfo?`$${parseFloat(projectInfo.retailAmount).toFixed(2)}`:"Retail Amount"}</Typography>
                        </Box>
                        <Box sx={{
                            width:"25%",
                            padding:'1rem',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'center',
                            alignContent:'center',
                            border:"1px solid #50505040",
                            textAlign:'center',
                            borderRadius:'0.250rem'
                        }}>
                            <Typography component='p' fontSize={"14px"} color={'#878a99'}>Project Status</Typography>
                            <Typography component='h6' fontSize={"14px"} fontWeight={600}>{(projectInfo?possibleStatus[projectInfo.status]:"Status")}</Typography>
                        </Box>

                    </Box>

                </MainCard>

                <MainCard sx={{width:'26.5%',
                    padding: "1.3em",
                    display: "flex",
                    flexDirection:"column"}}>
                    <Typography component="h6" fontWeight={600}>Total Project Amount</Typography>
                    <Box sx={{borderBottom:"1px solid #50505070",borderRadius:"0.125rem",margin:"1rem 0",paddingBottom:"1rem"}}>
                        <Box sx={{display:"flex",justifyContent: "space-between"}}>
                            <Typography component="p" fontSize={"14px"}>Sub Total:</Typography>
                            <Typography component="p" fontSize={"14px"}>{`$${projectInfo?parseFloat(projectInfo.retailAmount).toFixed(2):"Price"}`}</Typography>
                        </Box>
                        <Box sx={{display:"flex",justifyContent: "space-between"}}>
                            <Typography component="p" fontSize={"14px"}>Shipping Charge:</Typography>
                            <Typography component="p" fontSize={"14px"}>{`$0.00`}</Typography>
                        </Box>

                    </Box>
                    <Box sx={{display:"flex",justifyContent: "space-between"}}>
                        <Typography component="h6" fontSize={"14px"} fontWeight={600}>Total (USD):</Typography>
                        <Typography component="h6" fontSize={"14px"}  fontWeight={600}>{`$${projectInfo?parseFloat(projectInfo.retailAmount).toFixed(2):"Price"}`}</Typography>
                    </Box>


                </MainCard>
            </Box>
        </Box>
        {/* Add your page content here */}
        </div>
  );
};

export default withAuth(ProjectOverviewPage);
