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
    <Stack spacing="6">
      {/* Name */}
      <FormControl isRequired id="name">
        <FormLabel color="white">Name</FormLabel>
        <Input
          background="white"
          type="text"
          name="name"
          value={credentials.name}
          placeholder="Enter your name"
          onChange={handleCredentials}
        />
      </FormControl>

      {/* Email */}
      <FormControl isRequired id="email">
        <FormLabel color="white">Email</FormLabel>
        <Input
          background="white"
          type="email"
          name="email"
          value={credentials.email}
          placeholder="Enter your email"
          onChange={handleCredentials}
        />
      </FormControl>

      {/* Phone (Optional) */}
      <FormControl id="phone">
        <FormLabel color="white">Phone Number</FormLabel>
        <Input
          background="white"
          type="tel"
          name="phone"
          value={credentials.phone}
          placeholder="Enter your phone number"
          onChange={handleCredentials}
        />
      </FormControl>

      {/* Password */}
      <FormControl isRequired id="password">
        <FormLabel color="white">Password</FormLabel>
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
            onChange={handleCredentials}
          />
        </InputGroup>
      </FormControl>

      {/* Confirm Password */}
      <FormControl isRequired id="confirmPassword">
        <FormLabel color="white">Confirm Password</FormLabel>
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
            onChange={handleCredentials}
          />
        </InputGroup>
      </FormControl>

      {/* Investment Focus */}
      <FormControl id="investmentFocus">
        <FormLabel color="white">Investment Focus</FormLabel>
        <Select
          background="white"
          name="investmentFocus"
          value={credentials.investmentFocus}
          placeholder="Select your investment focus"
          onChange={handleCredentials}
        >
          <option value="Tech">Tech</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Real Estate">Real Estate</option>
        </Select>
      </FormControl>

      {/* Experience Level */}
      <FormControl id="experienceLevel">
        <FormLabel color="white">Experience Level</FormLabel>
        <Select
          background="white"
          name="experienceLevel"
          value={credentials.experienceLevel}
          placeholder="Select your experience level"
          onChange={handleCredentials}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </Select>
      </FormControl>

      {/* Country */}
      <FormControl id="country">
        <FormLabel color="white">Country</FormLabel>
        <Input
          background="white"
          type="text"
          name="country"
          value={credentials.country}
          placeholder="Enter your country"
          onChange={handleCredentials}
        />
      </FormControl>

      {/* Submit Button */}
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

export default Investor;
