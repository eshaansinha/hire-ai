"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Upload from "../../../../../public/Upload.gif";
import { ReactTyped } from 'react-typed';
import { signIn, signOut, useSession } from 'next-auth/react';

const Hero = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsingResult, setParsingResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data:session, status } = useSession()

  const handleFileChange = (event) => {
    // Reset state when a new file is chosen
    setSelectedFile(event.target.files[0]);
    setParsingResult("");
    setError("");
  };

  if (status === "loading") {
          return (
              <div className='h-screen flex text-3xl'>
                  <h1>Loading...</h1>
              </div>
          )
      }
  
  if (status === "unauthenticated") {
      signIn()
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setError("");
    setParsingResult("");

    const formData = new FormData();
    // The key 'file' must match the parameter name in your FastAPI endpoint
    formData.append('file', selectedFile);

    try {
      // Ensure this URL is correct for your running backend
      const response = await fetch('https://hire-ai-backend-wcrk.onrender.com/api/candidates/upload-resume', {
        method: 'POST',
        headers: {
          'x-user-email': session.user.email,  // Using the email from your session
          // 'Authorization': `Bearer ${session.accessToken}`, // Add if needed
        },
        body: formData
      });

      const result = await response.json();

      // alert(JSON.stringify(result))

      if (!response.ok) {
        // Handle validation errors (422) or other server errors
        const errorMessage = result.detail?.[0]?.msg || JSON.stringify(result.detail) || "An unknown error occurred.";
        throw new Error(errorMessage);
      }
      
      // **Process the successful (200) response based on the new schema**
      const candidate = result.candidate;
      const { name, email, phone, skills, experience_years, location } = candidate;

      const formattedResult = `Name: ${name || "N/A"} | Email: ${email || "N/A"} | Phone: ${phone || "N/A"} | Location: ${location || "N/A"} | Experience: ${experience_years || "0"} years | Skills: ${Array.isArray(skills) ? skills.join(', ') : "N/A"}`;

      setParsingResult(formattedResult);

    } catch (err) {
      setError(err.message);
      setParsingResult("");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className='bg-gray-400 min-h-screen'>
      <div className='flex flex-row min-h-screen'>
        {/* Sidebar remains the same */}
        <div className='bg-gray-600 text-gray-300 w-[250px] p-5 flex flex-col'>
          <div>
            <h1 className='text-4xl text-teal-300 font-extrabold'>Hire AI</h1>
            <p className='text-lg text-teal-300'>AI Powered Recruitment</p>
          </div>
          <div className='flex flex-col mt-20'>
            <a href='/dashboard' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mb-5'>Dashboard</a>
            <a href='/dashboard/peoplegpt' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mb-5'>PeopleGPT</a>
            <a href='/dashboard/resumeparser' className='text-2xl font-extrabold bg-gray-500 rounded-2xl p-3 text-gray-300'>Resume Parser</a>
            <a href='/dashboard/generatequestions' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mt-5'>Ai Questions</a>
            <a href='/dashboard/outreach' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mt-5'>Outreach</a>
          </div>
        </div>
        
        <div className='flex-1 flex flex-col bg-gray-700'>
          {/* Header remains the same */}
          <div className='flex flex-row justify-between items-center px-5 py-4 border-b border-gray-200'>
            <h1 className='text-2xl md:text-4xl font-extrabold text-gray-300'>Resume Parser</h1>
            <button onClick={() => {signOut()}}className='text-lg md:text-xl font-extrabold text-gray-300 bg-gray-600 p-3 rounded-2xl hover:translate-y-1 transition duration-300 active:translate-y-0.5'>SignOut</button>
          </div>
          
          <div className='flex-1 overflow-y-auto bg-gray-700'>
            <div className='p-5 md:p-10 lg:p-12'>
                <div className='bg-gray-300 rounded-2xl ml-10 mr-10'>
                    <div className='flex flex-col justify-center gap-5 items-center p-5'>
                        <Image src={Upload} alt={"Upload Image"} width={150} height={100} className='rounded-2xl'/>
                        <h1 className='text-3xl text-gray-700 font-bold'>Upload a resume to get started</h1>
                        <p className='text-xl'>Supports PDF, DOC, DOCX</p>
                        
                        {/* Hidden file input */}
                        <input 
                          type="file" 
                          onChange={handleFileChange} 
                          className="hidden" 
                          id="file-upload"
                          accept=".pdf,.doc,.docx"
                          disabled={isLoading}
                        />

                        {/* Custom button to trigger file input */}
                        <label 
                          htmlFor="file-upload" 
                          className={`font-bold p-3 text-lg rounded-2xl cursor-pointer ${isLoading ? 'bg-gray-500 text-gray-400' : 'bg-gray-700 text-gray-300'}`}
                        >
                          Choose File
                        </label>
                        {selectedFile && <p className="text-gray-700 mt-2">Selected: {selectedFile.name}</p>}
                        
                        {/* Upload button */}
                        <button 
                          onClick={handleUpload} 
                          className='bg-gray-700 text-gray-300 font-bold p-3 text-lg rounded-2xl mt-2 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed'
                          disabled={!selectedFile || isLoading}
                        >
                          {isLoading ? 'Parsing...' : 'Upload and Parse'}
                        </button>
                    </div>
                </div>
                <div className='mt-10'>
                    <h1 className='text-gray-300 font-extrabold text-3xl'>Parsing Results:</h1>
                    <div className='bg-gray-300 mt-10 p-5 rounded-2xl min-h-[60px]'>
                      {isLoading && <p className="text-gray-700 font-bold text-xl">Processing your document...</p>}
                      {error && <p className="text-red-500 font-bold text-xl">Error: {error}</p>}
                      {parsingResult && <pre className="text-gray-700 font-bold text-xl whitespace-pre-wrap">{parsingResult.split('|').map((part, index) => (<div key={index}>{part.trim()}</div>))}</pre>}
                      {!parsingResult && !error && !isLoading && <p className="text-gray-500 font-bold text-xl">Your parsing results will appear here.</p>}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;