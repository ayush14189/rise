import {
  Container,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Login, Signup } from "../components/";


// Import the background image from assets
import backgroundImage from "../assets/bgImg/bgImage.png"; // Adjust the path accordingly


const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(location.state?.tabIndex || 0);


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);


  const handleTabsChange = (index) => {
    setTabIndex(index);
  };


  return (
    <Container
      maxWidth="100vw"
      height="100vh"
      p={0}
      m={0}
      centerContent
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgImage={`url(${backgroundImage})`}
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        bg="white"
        w="100%"
        maxWidth="lg" // Increased width for better layout
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        opacity="0.95"
      >
        <Tabs
          isFitted
          variant="soft-rounded"
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <TabList mb="1em" gap="6px">
            <Tab
              fontWeight="bold"
              color="gray.600"
              _selected={{ color: "white", bg: "#6f42c1" }}
              borderRadius="lg"
              p={3}
            >
              Login
            </Tab>
            <Tab
              fontWeight="bold"
              color="gray.600"
              _selected={{ color: "white", bg: "#6f42c1" }}
              borderRadius="lg"
              p={3}
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login switchToSignup={() => setTabIndex(1)} />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};


export default Home;
