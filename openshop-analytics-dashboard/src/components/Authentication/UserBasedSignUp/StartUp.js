import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const StartUp = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();


  const [credentials, setCredentials] = useState({
    userType: "Startup",
    email: "",
    startup_name: "",
    founder_name: "",
    industry_sector: "",
    description: "",
    business_stage: "",
    incorporation_date: "",
    employees_count: 0,
    website_url: "",
    pitch_deck_url: "",
    password: "",
    confirmPassword: "",
  });


  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  const submitHandler = async () => {
    setLoading(true);


    if (
      !credentials.startup_name ||
      !credentials.founder_name ||
      !credentials.industry_sector ||
      !credentials.business_stage ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      setLoading(false);
      return toast({
        title: "Please fill all the required fields",
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
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "left-accent",
      });
    }


    try {
      const response = await fetch("http://localhost:5000/api/user/startup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });


      const data = await response.json();


      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast({
          title: "Startup created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
          variant: !data.success ? "left-accent" : "solid",
        });
        setLoading(false);
        navigate("/user");
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
      <FormControl isRequired id="startup_name">
        <FormLabel color="gray.600">Startup Name</FormLabel>
        <Input
          background="gray.50"
          name="startup_name"
          value={credentials.startup_name}
          onChange={handleCredentials}
          placeholder="Enter your startup name"
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl isRequired id="founder_name">
        <FormLabel color="gray.600">Founder Name</FormLabel>
        <Input
          background="gray.50"
          name="founder_name"
          value={credentials.founder_name}
          onChange={handleCredentials}
          placeholder="Enter the founder's name"
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl isRequired id="industry_sector">
        <FormLabel color="gray.600">Industry Sector</FormLabel>
        <Input
          background="gray.50"
          name="industry_sector"
          value={credentials.industry_sector}
          onChange={handleCredentials}
          placeholder="Enter your industry sector"
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl id="description">
        <FormLabel color="gray.600">Description</FormLabel>
        <Input
          background="gray.50"
          name="description"
          value={credentials.description}
          onChange={handleCredentials}
          placeholder="Enter a brief description"
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl isRequired id="business_stage">
        <FormLabel color="gray.600">Business Stage</FormLabel>
        <Select
          background="gray.50"
          name="business_stage"
          value={credentials.business_stage}
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
          placeholder="Select business stage"
        >
          <option value="Idea">Idea</option>
          <option value="Seed">Seed</option>
          <option value="Growth">Growth</option>
        </Select>
      </FormControl>


      <FormControl id="incorporation_date">
        <FormLabel color="gray.600">Incorporation Date</FormLabel>
        <Input
          background="gray.50"
          type="date"
          name="incorporation_date"
          value={credentials.incorporation_date}
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl id="employees_count">
        <FormLabel color="gray.600">Employees Count</FormLabel>
        <Input
          background="gray.50"
          type="number"
          name="employees_count"
          value={credentials.employees_count}
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl id="website_url">
        <FormLabel color="gray.600">Website URL</FormLabel>
        <Input
          background="gray.50"
          name="website_url"
          value={credentials.website_url}
          onChange={handleCredentials}
          placeholder="Enter your website URL"
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl id="pitch_deck_url">
        <FormLabel color="gray.600">Pitch Deck (Upload URL)</FormLabel>
        <Input
          background="gray.50"
          value={credentials.pitch_deck_url}
          name="pitch_deck_url"
          placeholder="Enter your Pitch deck URL"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl isRequired id="email">
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


      <FormControl isRequired id="password">
        <FormLabel color="gray.600">Password</FormLabel>
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
            onChange={handleCredentials}
            placeholder="Password"
            focusBorderColor="#6f42c1"
          />
        </InputGroup>
      </FormControl>


      <FormControl isRequired id="confirmPassword">
        <FormLabel color="gray.600">Confirm Password</FormLabel>
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
            onChange={handleCredentials}
            placeholder="Confirm Password"
            focusBorderColor="#6f42c1"
          />
        </InputGroup>
      </FormControl>


      <Button
        colorScheme="purple"
        width="100%"
        mt={4}
        onClick={submitHandler}
        isLoading={loading}
        borderRadius="full"
      >
        Sign Up
      </Button>
    </Stack>

  );
};


export default StartUp;
