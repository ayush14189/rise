import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    Stack,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const ResearcherSignUp = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
    const [credentials, setCredentials] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      institution: "",
      researchInterests: [],
    });

    const handleCredentials = (e) => {
      if (e.target.name === "researchInterests") {
      const interests = e.target.value.split(",");
      setCredentials({ ...credentials, [e.target.name]: interests });
      } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
      }
    };
    
    
  
    
  
    const submitHandler = async () => {
      setLoading(true);
  
      // If anything is missing
      if (
        !credentials.name ||
        !credentials.email ||
        !credentials.password ||
        !credentials.confirmPassword ||
        !credentials.institution ||
        !credentials.researchInterests
      ) {
        setLoading(false);
        return toast({
          title: "Please Fill all the Fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
          variant: "left-accent",
        });
      }
  
      // If password and confirm password doesn't match
      if (credentials.password !== credentials.confirmPassword) {
        setLoading(false);
        return toast({
          title: "Passwords Do Not Match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
          variant: "left-accent",
        });
      }
  
      // Now submit the data
      try {
        const response = await fetch("http://localhost:5000/api/user/researcher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            
            userType: "researcher",
            
            affiliation: credentials.institution,
            researchInterests: credentials.researchInterests,
          }),
        });
        const data = await response.json();
  
        toast({
          title: data.message,
          status: !data.success ? "error" : "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
          variant: !data.success ? "left-accent" : "solid",
        });
  
        if (data.success) {
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          navigate("/researcher");
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
        return toast({
          title: "Internal server error",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
          variant: "solid",
        });
      }
    };
  
    return (
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isRequired id="name">
            <FormLabel htmlFor="name" color="white">
              Name
            </FormLabel>
            <Input
              background="white"
              type="text"
              name="name"
              value={credentials.name}
              placeholder="Enter Your Name"
              onChange={(e) => handleCredentials(e)}
            />
          </FormControl>
        </Stack>
  
        <Stack spacing="5">
          <FormControl isRequired id="email">
            <FormLabel htmlFor="email" color="white">
              Email
            </FormLabel>
            <Input
              background="white"
              type="email"
              name="email"
              value={credentials.email}
              placeholder="Enter Your Email"
              onChange={(e) => handleCredentials(e)}
            />
          </FormControl>
        </Stack>
  
        
  
        <Stack spacing="5">
          <FormControl isRequired id="institution">
            <FormLabel htmlFor="institution" color="white">
              Institution
            </FormLabel>
            <Input
              background="white"
              type="text"
              name="institution"
              value={credentials.institution}
              placeholder="Enter Your Institution"
              onChange={(e) => handleCredentials(e)}
            />
          </FormControl>
        </Stack>
  
        <Stack spacing="5">
          <FormControl isRequired id="researchInterests">
            <FormLabel htmlFor="researchInterests" color="white">
              Research Interests
            </FormLabel>
            <Input
              background="white"
              type="text"
              name="researchInterests"
              value={credentials.researchInterests}
              placeholder="Enter Your Research Interests"
              onChange={(e) => handleCredentials(e)}
            />
          </FormControl>
        </Stack>
  
        <Stack spacing="5">
          <FormControl isRequired id="password">
            <FormLabel htmlFor="password" color="white">
              Password
            </FormLabel>
            <InputGroup background="white">
              <InputRightElement w="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
              <Input
                type={show ? "text" : "password"}
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={(e) => handleCredentials(e)}
              />
            </InputGroup>
          </FormControl>
        </Stack>
  
        <Stack spacing="5">
          <FormControl isRequired id="confirmPassword">
            <FormLabel htmlFor="confirmPassword" color="white">
              Confirm Password
            </FormLabel>
            <InputGroup background="white">
              <InputRightElement w="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
              <Input
                type={show ? "text" : "password"}
                name="confirmPassword"
                value={credentials.confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => handleCredentials(e)}
              />
            </InputGroup>
          </FormControl>
        </Stack>
  
        
  
        <Button
          background="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          isLoading={loading}
          onClick={submitHandler}
        >
          Register
        </Button>
      </Stack>
    );
  };
  
  export default ResearcherSignUp;
  