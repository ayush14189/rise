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

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    setLoading(true);

    // If email or password is missing
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
        variant: "left-accent",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
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
        localStorage.setItem("user", JSON.stringify(data));
        
        setLoading(false);

        const user = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("userType",user.userType);
        console.log(user.userType);
        if (user && user.userType === "Startup") {
          navigate("/user");
        } else if (user && user.userType === "Researcher") {
          navigate("/researcher");
        } else if (user && user.userType === "PolicyMaker") {
          navigate("/user");
        } else if (user && user.userType === "IprManager") {
          navigate("/iprmanager");
        } else if (user && user.userType === "Investor") {
          navigate("/investor");
        } else {
          navigate("/yetobedone");
        }
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
        variant: "solid",
      });
    }
  };

  return (
    <Stack spacing="6" p="4" bg="white" borderRadius="lg" boxShadow="lg">
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


      <Button
        colorScheme="purple"
        width="100%"
        mt={4}
        onClick={submitHandler}
        isLoading={loading}
        borderRadius="full"
      >
        Login
      </Button>
      {/* <Button
        variant="link"
        onClick={switchToSignup}
        color="purple.600"
        mt={2}
      >
        Don't have an account? Sign Up
      </Button> */}
    </Stack>

  );
};

export default Login;
