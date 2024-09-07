import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
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
    userType: "startup",
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
          title: "startup created successfully",
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
    <Stack spacing="6">
      <FormControl isRequired id="startup_name">
        <FormLabel color="white">Startup Name</FormLabel>
        <Input
          background="white"
          name="startup_name"
          value={credentials.startup_name}
          onChange={handleCredentials}
          placeholder="Enter your startup name"
        />
      </FormControl>

      <FormControl isRequired id="founder_name">
        <FormLabel color="white">Founder Name</FormLabel>
        <Input
          background="white"
          name="founder_name"
          value={credentials.founder_name}
          onChange={handleCredentials}
          placeholder="Enter the founder's name"
        />
      </FormControl>

      <FormControl isRequired id="industry_sector">
        <FormLabel color="white">Industry Sector</FormLabel>
        <Input
          background="white"
          name="industry_sector"
          value={credentials.industry_sector}
          onChange={handleCredentials}
          placeholder="Enter your industry sector"
        />
      </FormControl>

      <FormControl id="description">
        <FormLabel color="white">Description</FormLabel>
        <Input
          background="white"
          name="description"
          value={credentials.description}
          onChange={handleCredentials}
          placeholder="Enter a brief description"
        />
      </FormControl>

      <FormControl isRequired id="business_stage">
        <FormLabel color="white">Business Stage</FormLabel>
        <Select
          background="white"
          name="business_stage"
          value={credentials.business_stage}
          onChange={handleCredentials}
          placeholder="Select business stage"
        >
          <option value="Idea">Idea</option>
          <option value="Seed">Seed</option>
          <option value="Growth">Growth</option>
        </Select>
      </FormControl>

      <FormControl id="incorporation_date">
        <FormLabel color="white">Incorporation Date</FormLabel>
        <Input
          background="white"
          type="date"
          name="incorporation_date"
          value={credentials.incorporation_date}
          onChange={handleCredentials}
        />
      </FormControl>

      <FormControl id="employees_count">
        <FormLabel color="white">Employees Count</FormLabel>
        <Input
          background="white"
          type="number"
          name="employees_count"
          value={credentials.employees_count}
          onChange={handleCredentials}
        />
      </FormControl>

      <FormControl id="website_url">
        <FormLabel color="white">Website URL</FormLabel>
        <Input
          background="white"
          name="website_url"
          value={credentials.website_url}
          onChange={handleCredentials}
          placeholder="Enter your website URL"
        />
      </FormControl>

      <FormControl id="pitch_deck_url">
        <FormLabel color="white">Pitch Deck (Upload URL)</FormLabel>
        <Input
          background="white"
          value={credentials.pitch_deck_url}
          name="pitch_deck_url"
          placeholder="Enter your Pitch deck URL"
          onChange={handleCredentials}
        />
      </FormControl>
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
      <FormControl isRequired id="password">
        <FormLabel color="white">Password</FormLabel>
        <InputGroup background="white">
          <InputRightElement>
            <Button size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
          <Input
            type={show ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={handleCredentials}
            placeholder="Password"
          />
        </InputGroup>
      </FormControl>

      <FormControl isRequired id="confirmPassword">
        <FormLabel color="white">Confirm Password</FormLabel>
        <InputGroup background="white">
          <InputRightElement>
            <Button size="sm" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
          <Input
            type={show ? "text" : "password"}
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleCredentials}
            placeholder="Confirm Password"
          />
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        mt={4}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </Stack>
  );
};

export default StartUp;
