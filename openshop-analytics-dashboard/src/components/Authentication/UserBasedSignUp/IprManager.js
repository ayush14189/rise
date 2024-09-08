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
  
      // Validation
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
  
        // toast({
        //   title: data.message,
        //   status: !data.success ? "error" : "success",
        //   duration: 5000,
        //   isClosable: true,
        //   position: "bottom-right",
        // });
  
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
  
        {/* Phone */}
        <FormControl isRequired id="phone">
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
  
        {/* Company */}
        <FormControl id="company">
          <FormLabel color="white">Company</FormLabel>
          <Input
            background="white"
            type="text"
            name="company"
            value={credentials.company}
            placeholder="Enter your company"
            onChange={handleCredentials}
          />
        </FormControl>
  
        {/* Role */}
        <FormControl id="role">
          <FormLabel color="white">Role</FormLabel>
          <Input
            background="white"
            type="text"
            name="role"
            value={credentials.role}
            placeholder="Enter your role"
            onChange={handleCredentials}
          />
        </FormControl>
  
        {/* Country */}
        <FormControl isRequired id="country">
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
  
        {/* Industry Focus */}
        <FormControl id="industryFocus">
          <FormLabel color="white">Industry Focus</FormLabel>
          <Input
            background="white"
            type="text"
            name="industryFocus"
            value={credentials.industryFocus}
            placeholder="Enter your industry focus"
            onChange={handleCredentials}
          />
        </FormControl>
  
        {/* Years of Experience */}
        <FormControl id="yearsOfExperience">
          <FormLabel color="white">Years of Experience</FormLabel>
          <Input
            background="white"
            type="number"
            name="yearsOfExperience"
            value={credentials.yearsOfExperience}
            placeholder="Enter your years of experience"
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
  
  export default IprManagerSignup;