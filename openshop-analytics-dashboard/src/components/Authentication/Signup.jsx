import {
  Stack,
  Select,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import StartUp from "./UserBasedSignUp/StartUp";
import GovtAgency from "./UserBasedSignUp/GovtAgency";
import Investor from "./UserBasedSignUp/Investor";
import Researcher from "./UserBasedSignUp/Researcher";
import IprManager from "./UserBasedSignUp/IprManager";


const Signup = () => {
  const [userType, setuserType] = useState("");


  return (
    <Stack
      spacing="6"
      maxWidth="xl"
      margin="auto"
      padding={4}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      overflow="hidden" // Ensure the container does not overflow
    >
      <Select
        placeholder='Select role'
        background="white"
        onChange={(event) => setuserType(event?.target?.value)}
      >
        <option value='PolicyMaker'>Policy Maker</option>
        <option value='Researcher'>Researcher</option>
        <option value='Investor'>Investor</option>
        <option value='Startup'>Startup</option>
        <option value='IprManager'>IPR Manager</option>
      </Select>
      <Box
        maxHeight="60vh" // Set a maximum height for the content
        overflowY="auto" // Enable vertical scrolling
        padding={4}
      >
        {userType === "PolicyMaker" && <GovtAgency />}
        {userType === "Investor" && <Investor />}
        {userType === "Startup" && <StartUp />}
        {userType === "Researcher" && <Researcher />}
        {userType === "IprManager" && <IprManager />}
      </Box>
    </Stack>
  );
};


export default Signup;