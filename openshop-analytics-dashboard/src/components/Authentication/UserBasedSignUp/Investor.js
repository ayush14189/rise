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


const Investor = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();


  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    investmentFocus: "",
    experienceLevel: "",
    phone: "",
    country: "",
    UserType: "Investor",
  });


  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  const submitHandler = async () => {
    setLoading(true);


    // Validation
    if (!credentials.name || !credentials.email || !credentials.password || !credentials.confirmPassword) {
      setLoading(false);
      return toast({
        title: "Please fill all the required fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
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
      });
    }


    try {
      const response = await fetch("http://localhost:5000/api/user/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();


      toast({
        title: data.message,
        status: !data.success ? "error" : "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });


      if (data.success) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        navigate("/investor");
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


      <FormControl>
        <FormLabel htmlFor="phone" color="gray.600">
          Phone Number (Optional)
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


      <FormControl>
        <FormLabel htmlFor="investmentFocus" color="gray.600">
          Investment Focus
        </FormLabel>
        <Select
          background="gray.50"
          name="investmentFocus"
          value={credentials.investmentFocus}
          placeholder="Select your investment focus"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        >
          <option value="Tech">Tech</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Real Estate">Real Estate</option>
        </Select>
      </FormControl>


      <FormControl>
        <FormLabel htmlFor="experienceLevel" color="gray.600">
          Experience Level
        </FormLabel>
        <Select
          background="gray.50"
          name="experienceLevel"
          value={credentials.experienceLevel}
          placeholder="Select your experience level"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </Select>
      </FormControl>


      <FormControl>
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


export default Investor;
