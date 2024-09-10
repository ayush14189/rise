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


const GovtAgency = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();


  const [credentials, setCredentials] = useState({
    agencyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    RegistrationNo: "",
    agencyType: "",
    officerName: "",
    contactNumber: ""
  });


  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  const handleUploadFile = async (e) => {
    setLoading(true);


    if (!e.target.files[0]) {
      setLoading(false);
      return toast({
        title: "Please select a file",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }


    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "gov-agency-docs");
    data.append("cloud_name", "your_cloudinary_cloud_name");


    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const json = await response.json();
      setCredentials({
        ...credentials,
        [e.target.name]: json.secure_url,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };


  const submitHandler = async () => {
    setLoading(true);


    if (
      !credentials.agencyName ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword ||
      !credentials.contactNumber
    ) {
      setLoading(false);
      return toast({
        title: "Please fill all the fields",
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
      const response = await fetch("http://localhost:5000/api/user/govtagency", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agencyName: credentials.agencyName,
          email: credentials.email,
          password: credentials.password,
          RegistrationNo: credentials.RegistrationNo,
          agencyType: credentials.agencyType,
          officerName: credentials.officerName,
          contactNumber: credentials.contactNumber}),
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
        navigate("/govtagency/dashboard");  
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
        <FormLabel htmlFor="agencyName" color="gray.600">
          Agency Name
        </FormLabel>
        <Input
          background="gray.50"
          type="text"
          name="agencyName"
          value={credentials.agencyName}
          placeholder="Enter the Government Agency Name"
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
          placeholder="Enter Email Address"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl isRequired>
        <FormLabel htmlFor="RegistrationNo" color="gray.600">
          Registration No.
        </FormLabel>
        <Input
          background="gray.50"
          type="text"
          name="RegistrationNo"
          value={credentials.RegistrationNo}
          placeholder="Enter Official Registration Number"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl isRequired>
        <FormLabel htmlFor="agencyType" color="gray.600">
          Agency Type
        </FormLabel>
        <Select
          background="gray.50"
          placeholder="Select Agency Type"
          name="agencyType"
          value={credentials.agencyType}
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        >
          <option value="central">Central Government</option>
          <option value="state">State Government</option>
          <option value="municipal">Municipal Body</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>


      <FormControl isRequired>
        <FormLabel htmlFor="officerName" color="gray.600">
          Authorized Officer
        </FormLabel>
        <Input
          background="gray.50"
          type="text"
          name="officerName"
          value={credentials.officerName}
          placeholder="Officer Name"
          onChange={handleCredentials}
          focusBorderColor="#6f42c1"
        />
      </FormControl>


      <FormControl isRequired>
        <FormLabel htmlFor="contactNumber" color="gray.600">
          Contact Number
        </FormLabel>
        <Input
          background="gray.50"
          type="text"
          name="contactNumber"
          value={credentials.contactNumber}
          placeholder="Official Contact Number"
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
            placeholder="Enter Password"
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


export default GovtAgency;
