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
    <Stack spacing="6">
      <FormControl isRequired id="agencyName">
        <FormLabel color="white">Agency Name</FormLabel>
        <Input
          background="white"
          type="text"
          name="agencyName"
          value={credentials.agencyName}
          placeholder="Enter the Government Agency Name"
          onChange={handleCredentials}
        />
      </FormControl>

      <FormControl isRequired id="email">
        <FormLabel color="white">Email</FormLabel>
        <Input
          background="white"
          type="email"
          name="email"
          value={credentials.email}
          placeholder="Enter Email Address"
          onChange={handleCredentials}
        />
      </FormControl>

      <FormControl isRequired id="RegistrationNo">
        <FormLabel color="white">Registration No.</FormLabel>
        <Input
          background="white"
          type="text"
          name="RegistrationNo"
          value={credentials.RegistrationNo}
          placeholder="Enter Official Registration Number"
          onChange={handleCredentials}
        />
      </FormControl>

      <FormControl isRequired id="agencyType">
        <FormLabel color="white">Agency Type</FormLabel>
        <Select
          background="white"
          placeholder="Select Agency Type"
          name="agencyType"
          value={credentials.agencyType}
          onChange={handleCredentials}
        >
          <option value="central">Central Government</option>
          <option value="state">State Government</option>
          <option value="municipal">Municipal Body</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>

      <FormControl isRequired id="officerName">
        <FormLabel color="white">Authorized Officer</FormLabel>
        <Input
          background="white"
          type="text"
          name="officerName"
          value={credentials.officerName}
          placeholder="Officer Name"
          onChange={handleCredentials}
        />
      </FormControl>

      <FormControl isRequired id="contactNumber">
        <FormLabel color="white">Contact Number</FormLabel>
        <Input
          background="white"
          type="text"
          name="contactNumber"
          value={credentials.contactNumber}
          placeholder="Official Contact Number"
          onChange={handleCredentials}
        />
      </FormControl>

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
            placeholder="Enter Password"
            onChange={handleCredentials}
          />
        </InputGroup>
      </FormControl>

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
{/* 
      <FormControl id="registrationDocument">
        <FormLabel color="white">Upload Official Registration Document</FormLabel>
        <InputGroup background="white">
          <Input
            type="file"
            name="registrationDocument"
            accept="application/pdf"
            onChange={handleUploadFile}
          />
        </InputGroup>
      </FormControl> */}

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </Stack>
  );
};

export default GovtAgency;
