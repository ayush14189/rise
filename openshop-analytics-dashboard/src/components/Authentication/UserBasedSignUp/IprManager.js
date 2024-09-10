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


const IprManagerSignup = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();


  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
    role: "",
    country: "",
    industryFocus: "",
    yearsOfExperience: "",
  });


  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  const submitHandler = async () => {
    setLoading(true);


    if (!credentials.name || !credentials.email || !credentials.password || !credentials.phone || !credentials.country) {
      setLoading(false);
      return toast({
        title: "Please fill all the required fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }


    try {
      const response = await fetch("http://localhost:5000/api/user/iprmanager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();


      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/iprmanager");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return toast({
        title: "Internal server error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };


  return (
    <Stack spacing="6" p="4" bg="white" borderRadius="lg" boxShadow="lg">
      <FormControl isRequired>
        <FormLabel htmlFor="name" color="gray.600">
          Name
        </FormLabel>
        <Input
          background="gray.50"
          type="text"
          name="name"
          value={credentials.name}
          placeholder="Enter your name"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl isRequired>
        <FormLabel htmlFor="email" color="gray.600">
          Email
        </FormLabel>
        <Input
          background="gray.50"
          type="email"
          name="email"
          value={credentials.email}
          placeholder="Enter your email"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl isRequired>
        <FormLabel htmlFor="phone" color="gray.600">
          Phone Number
        </FormLabel>
        <Input
          background="gray.50"
          type="tel"
          name="phone"
          value={credentials.phone}
          placeholder="Enter your phone number"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


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


      <FormControl>
        <FormLabel htmlFor="company" color="gray.600">
          Company
        </FormLabel>
        <Input
          background="gray.50"
          type="text"
          name="company"
          value={credentials.company}
          placeholder="Enter your company"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl>
        <FormLabel htmlFor="role" color="gray.600">
          Role
        </FormLabel>
        <Input
          background="gray.50"
          type="text"
          name="role"
          value={credentials.role}
          placeholder="Enter your role"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl isRequired>
        <FormLabel htmlFor="country" color="gray.600">
          Country
        </FormLabel>
        <Input
          background="gray.50"
          type="text"
          name="country"
          value={credentials.country}
          placeholder="Enter your country"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl>
        <FormLabel htmlFor="industryFocus" color="gray.600">
          Industry Focus
        </FormLabel>
        <Input
          background="gray.50"
          type="text"
          name="industryFocus"
          value={credentials.industryFocus}
          placeholder="Enter your industry focus"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl>
        <FormLabel htmlFor="yearsOfExperience" color="gray.600">
          Years of Experience
        </FormLabel>
        <Input
          background="gray.50"
          type="number"
          name="yearsOfExperience"
          value={credentials.yearsOfExperience}
          placeholder="Enter your years of experience"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


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


export default IprManagerSignup;
