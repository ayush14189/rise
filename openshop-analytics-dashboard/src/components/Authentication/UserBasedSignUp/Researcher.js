import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
    <Stack spacing="6" p="4" bg="white" borderRadius="lg" boxShadow="lg">
      <Stack spacing="5">
        <FormControl isRequired>
          <FormLabel htmlFor="name" color="gray.600">
            Name
          </FormLabel>
          <Input
            background="gray.50"
            type="text"
            name="name"
            value={credentials.name}
            placeholder="Enter Your Name"
            onChange={handleCredentials}
            focusBorderColor="#6f42c1"
          />
        </FormControl>
      </Stack>


      <Stack spacing="5">
        <FormControl isRequired>
          <FormLabel htmlFor="email" color="gray.600">
            Email
          </FormLabel>
          <Input
            background="gray.50"
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Enter Your Email"
            onChange={handleCredentials}
            focusBorderColor="#6f42c1"
          />
        </FormControl>
      </Stack>


      <Stack spacing="5">
        <FormControl isRequired>
          <FormLabel htmlFor="institution" color="gray.600">
            Institution
          </FormLabel>
          <Input
            background="gray.50"
            type="text"
            name="institution"
            value={credentials.institution}
            placeholder="Enter Your Institution"
            onChange={handleCredentials}
            focusBorderColor="#6f42c1"
          />
        </FormControl>
      </Stack>


      <Stack spacing="5">
        <FormControl isRequired>
          <FormLabel htmlFor="researchInterests" color="gray.600">
            Research Interests
          </FormLabel>
          <Input
            background="gray.50"
            type="text"
            name="researchInterests"
            value={credentials.researchInterests}
            placeholder="Enter Your Research Interests (comma separated)"
            onChange={handleCredentials}
            focusBorderColor="#6f42c1"
          />
        </FormControl>
      </Stack>


      <Stack spacing="5">
        <FormControl isRequired>
          <FormLabel htmlFor="password" color="gray.600">
            Password
          </FormLabel>
          <InputGroup background="gray.50">
            <InputRightElement w="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShow(!show)}
                variant="ghost"
                colorScheme="purple"
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            <Input
              type={show ? "text" : "password"}
              name="password"
              value={credentials.password}
              placeholder="Password"
              onChange={handleCredentials}
              focusBorderColor="#6f42c1"
            />
          </InputGroup>
        </FormControl>
      </Stack>


      <Stack spacing="5">
        <FormControl isRequired>
          <FormLabel htmlFor="confirmPassword" color="gray.600">
            Confirm Password
          </FormLabel>
          <InputGroup background="gray.50">
            <InputRightElement w="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShow(!show)}
                variant="ghost"
                colorScheme="purple"
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            <Input
              type={show ? "text" : "password"}
              name="confirmPassword"
              value={credentials.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleCredentials}
              focusBorderColor="#6f42c1"
            />
          </InputGroup>
        </FormControl>
      </Stack>


      <Button
        colorScheme="purple"
        width="100%"
        mt={4}
        onClick={submitHandler}
        isLoading={loading}
        borderRadius="full"
      >
        Register
      </Button>
    </Stack>

  );
};


export default ResearcherSignUp;
