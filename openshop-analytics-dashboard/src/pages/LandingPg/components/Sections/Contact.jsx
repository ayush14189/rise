import React from "react";
import styled from "styled-components";

export default function Contact() {
  return (
    <Wrapper id="contact">
      <div className="container">
        <HeaderInfo>
          <h1 className="font40 extraBold">Let's Get in Touch</h1>
          <p className="font20">
            Connect with Us for Support and Queries
          </p>
        </HeaderInfo>
        <FormWrapper>
          <Form>
            <InputWrapper>
              <label className="font13">First Name</label>
              <Input type="text" id="fname" name="fname" placeholder="Enter your first name" />
            </InputWrapper>
            <InputWrapper>
              <label className="font13">Email</label>
              <Input type="email" id="email" name="email" placeholder="Enter your email" />
            </InputWrapper>
            <InputWrapper>
              <label className="font13">Subject</label>
              <Input type="text" id="subject" name="subject" placeholder="Enter the subject" />
            </InputWrapper>
            <InputWrapper>
              <label className="font13">Message</label>
              <Textarea rows="4" id="message" name="message" placeholder="Type your message here..."></Textarea>
            </InputWrapper>
            <SubmitButton type="submit" value="Send Message" />
          </Form>
        </FormWrapper>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding: 80px 0;
  background-color: #f8f9fa;
`;

const HeaderInfo = styled.div`
  text-align: center;
  margin-bottom: 40px;
  h1 {
    color: #333;
  }
  p {
    color: #555;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  margin-bottom: 30px;
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #333;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #7620ff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  resize: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #7620ff;
  }
`;

const SubmitButton = styled.input`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: #6f42c1;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #580cd2;
    box-shadow: 0 8px 20px rgba(88, 12, 210, 0.3);
  }
`;