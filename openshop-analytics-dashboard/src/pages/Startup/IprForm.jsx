import React from 'react'
import { useState } from 'react'
import axios from 'axios'
const IprForm = () => {
    const [formData, setFormData] = useState({
        applicantName: '',
        applicantType: '',
        patentTitle: '',
        description: '',
        category: '',
        file: null,
      });
      const [message, setMessage] = useState('');
      
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const submissionData = new FormData();
        submissionData.append('applicantName', formData.applicantName);
        submissionData.append('applicantType', formData.applicantType);
        submissionData.append('patentTitle', formData.patentTitle);
        submissionData.append('description', formData.description);
        submissionData.append('category', formData.category);
        submissionData.append('file', formData.file);
    
        try {
          const response = await axios.post('http://localhost:5000/api/ipr', submissionData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setMessage('IPR filed successfully!');
        //   toast({
        //     title: "Success",
        //     description: "IPR filed successfully!",
        //     status: "success",
        //     duration: 5000,
        //     isClosable: true,
        //   });
          setFormData({
            applicantName: '',
            applicantType: '',
            patentTitle: '',
            description: '',
            category: '',
            file: null,
          });
        } catch (error) {
          setMessage('Error submitting IPR. Please try again.');
        //   toast({
        //     title: "Error",
        //     description: "Error submitting IPR. Please try again.",
        //     status: "error",
        //     duration: 5000,
        //     isClosable: true,
        //   });
          console.error('Error uploading file:', error);
        }
      };
    
  return (
    <div className="container mx-auto mt-8">
              <h1 className="text-2xl font-semibold mb-4">IPR Filing Form</h1>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                {/* Applicant Name */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="applicantName"
                  >
                    Applicant Name
                  </label>
                  <input
                    type="text"
                    id="applicantName"
                    name="applicantName"
                    value={formData.applicantName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Applicant Type */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="applicantType"
                  >
                    Applicant Type
                  </label>
                  <select
                    id="applicantType"
                    name="applicantType"
                    value={formData.applicantType}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Applicant Type</option>
                    <option value="Startup Owner">Startup Owner</option>
                    <option value="Researcher">Researcher</option>
                  </select>
                </div>

                {/* Patent Title */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="patentTitle"
                  >
                    Patent Title
                  </label>
                  <input
                    type="text"
                    id="patentTitle"
                    name="patentTitle"
                    value={formData.patentTitle}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your patent title"
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description of Innovation
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                    placeholder="Provide a brief description of the innovation"
                    required
                  ></textarea>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Innovation Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Software">Software</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Energy">Energy</option>
                    <option value="Pharmaceutical">Pharmaceutical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* File Upload */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="file"
                  >
                    Upload Supporting Document (PDF)
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit IPR
                  </button>
                </div>
              </form>

              {/* Message */}
              {message && <p className="mt-4 text-green-600">{message}</p>}
            </div>
  )
}

export default IprForm
