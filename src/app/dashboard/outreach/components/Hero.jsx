"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Upload from "../../../../../public/Upload.gif";
import { ReactTyped } from 'react-typed';

const Hero = () => {
  const [cname, setCname] = useState("")
  const [template, setTemplate] = useState("")
  const [launch, setLaunch] = useState(false)
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('https://hire-ai-backend-wcrk.onrender.com/api/candidates');
        const data = await response.json();
        setCandidates(data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  // Fixed handler for multi-select
  const handleSelectionChange = (e) => {
    const value = e.target.value;
    const isSelected = selectedCandidates.includes(value);
    
    if (isSelected) {
      // Remove from selection
      setSelectedCandidates(selectedCandidates.filter(id => id !== value));
    } else {
      // Add to selection
      setSelectedCandidates([...selectedCandidates, value]);
    }
  };

  const launch_campaign = () => {
      setLaunch(true)
  }

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
            <a href='/dashboard/resumeparser' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300'>Resume Parser</a>
            <a href='/dashboard/generatequestions' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mt-5'>Ai Questions</a>
            <a href='/dashboard/outreach' className='text-2xl font-extrabold bg-gray-500 rounded-2xl p-3 text-gray-300 mt-5'>Outreach</a>
          </div>
        </div>
        
        <div className='flex-1 flex flex-col bg-gray-700'>
          {/* Header remains the same */}
          <div className='flex flex-row justify-between items-center px-5 py-4 border-b border-gray-200'>
            <h1 className='text-2xl md:text-4xl font-extrabold text-gray-300'>Outreach Campaign</h1>
            <button className='text-lg md:text-xl font-extrabold text-gray-300 bg-gray-600 p-3 rounded-2xl'>SignOut</button>
          </div>
          
          <div className='flex-1 overflow-y-auto bg-gray-700'>
            <div className='p-5 md:p-10 lg:p-12'>
                <div className='bg-gray-300 rounded-2xl ml-10 mr-10'>
                    <div className='flex flex-col gap-3 p-5'>
                        <h1 className='text-2xl text-gray-700 font-bold border-b-2 border-gray-700'>Create a new campaign</h1>
                        <p className='text-lg font-bold mt-3'>Campaign Name</p>
                        <input type='text' placeholder='e.g. Frontend Campaign' value={cname} className="bg-gray-700 text-gray-300 font-bold w-[500px] p-2 rounded-2xl"onChange={(e) => {setCname(e.target.value)}}/>
                        <p className='text-lg font-bold mt-3'>Message Template</p>
                        <select 
                          value={template} 
                          onChange={(e) => setTemplate(e.target.value)} 
                          className="bg-gray-700 text-gray-300 w-[500px] p-2 rounded-2xl">
                          <option value="" disabled>Select Template</option>
                          <option value="Initial Connection Request">Initial Connection Request</option>
                          <option value="LinkedIn InMail">LinkedIn InMail</option>
                          <option value="Follow-up After No Response">Follow-up After No Response</option>
                        </select>
                        <div className='bg-gray-700 mt-3 text-gray-300 rounded-2xl p-3'>
                          <h1 className='font-bold mb-2'>Template Preview</h1>
                          {template === "Initial Connection Request" ? (
                              <div>
                                <p>Hi candidate_name,

I hope this message finds you well. I'm recruiter_name from company_name, and I came across your profile which shows your impressive experience with skill_highlights.

We're currently looking for a job_title role that aligns well with your background. Would you be interested in learning more?

Best regards,
recruiter_name</p>
                              </div>
                            ) : template === "LinkedIn InMail" ? (
                              <div><p>Hello candidate_name,

I'm impressed by your background in skill_highlights. We have an exciting job_title role at company_name that could be a great next step for you.

Are you open to new opportunities at the moment?

Regards,
recruiter_name</p></div>
                            ) : template === "Follow-up After No Response" ? (
                              <div><p>Hi candidate_name,

I reached out last week about a job_title role at company_name that aligns with your expertise in skill_highlights.

I'm following up to see if you'd be interested in a quick chat about this opportunity. We offer benefits_highlights and a competitive compensation package.

Looking forward to hearing from you!

Best,
recruiter_name</p></div>
                            ) : (
                              <div>Please select a template</div>  // Default/fallback content
                            )
                          }
                        </div>
                        <div className='flex flex-col'>
                          <h1 className='font-bold mb-2'>Target Candidates</h1>
                          <div className="bg-gray-700 text-gray-300 font-bold w-full p-2 rounded-2xl h-48 overflow-y-auto">
                            {candidates.length > 0 ? (
                              candidates.map(candidate => (
                                <label key={candidate.id} className="flex items-center p-1 hover:bg-gray-600 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    value={candidate.id}
                                    checked={selectedCandidates.includes(candidate.id.toString())}
                                    onChange={handleSelectionChange}
                                    className="mr-2"
                                  />
                                  {candidate.name} ({candidate.experience_years} yrs)
                                </label>
                              ))
                            ) : (
                              <div>Loading candidates...</div>
                            )}
                          </div>
                          
                          {/* Display selected candidates */}
                          {selectedCandidates.length > 0 && (
                            <div className="mt-2">
                              <p className="font-bold text-md">Selected: {selectedCandidates.length} candidates</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedCandidates.map(id => {
                                  const candidate = candidates.find(c => c.id.toString() === id);
                                  return candidate ? (
                                    <span key={id} className="bg-gray-700 text-gray-300 text-sm font-bold px-2 py-1 rounded">
                                      {candidate.name}
                                    </span>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className='flex justify-end'>
                          <button onClick={() => {launch_campaign()}}className='bg-gray-700 text-gray-300 font-bold p-3 mt-2 rounded-2xl'>Launch</button>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <h1 className='text-gray-300 font-extrabold text-3xl'>Active Campaigns</h1>
                    <div className='flex flex-col'>
                    {launch ? (<div className='flex flex-col gap-3 mt-5 bg-gray-300 rounded-2xl p-3 w-fit'>
                        <div className='flex'><h1 className='text-gray-700 font-bold gap-3 text-2xl p-2'>{cname}</h1>
                        <h1 className='bg-gray-700 text-gray-300 font-bold p-3 rounded-2xl'>Active</h1>
                        </div>
                        <div className='text-gray-700 font-bold p-2'>
                          <p className=''>Total Candidates : {selectedCandidates.length}</p>
                          </div>
                    </div>) : null}
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