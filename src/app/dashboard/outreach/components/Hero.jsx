"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Upload from "../../../../../public/Upload.gif";
import { ReactTyped } from 'react-typed';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Signika } from 'next/font/google';

const Hero = () => {
  const [cname, setCname] = useState("")
  const [jobtitle, setJobTitle] = useState("")
  const [compname, setCompName] = useState("")
  const [launch, setLaunch] = useState(false)
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const { data:session, status } = useSession()

  
  useEffect(() => {
      // Only fetch candidates if session exists and user is authenticated
      if (status === "authenticated" && session?.user?.email) {
        const fetchCandidates = async () => {
          try {
            const response = await fetch('https://hire-ai-backend-wcrk.onrender.com/api/candidates', {
              method : "GET",
              headers: {
              "Content-type" : "application/json",
              'x-user-email': session.user.email,  // Now safe to access
              // 'Authorization': `Bearer ${session.accessToken}`, // Add if needed
            },
            });
            const data = await response.json();
            setCandidates(data);
          } catch (error) {
            console.error('Error fetching candidates:', error);
          }
        };

        fetchCandidates();

      const fetchCampaigns = async () => {
        try {
          const response = await fetch('https://hire-ai-backend-wcrk.onrender.com/api/outreach/campaigns', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-user-email": session.user.email
            }
          });

          const data = await response.json();
          setCampaigns(data);
        } catch (error) {
          console.error("Error fetching campaigns:", error);
        }
      };

        fetchCampaigns();
      }
    }, [status, session]);

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

  const launch_campaign = async () => {
  if (!cname || !jobtitle || !compname || selectedCandidates.length === 0) {
    alert("Please fill all fields and select at least one candidate.");
    return;
  }

  setLaunch(true);

  try {
    alert(JSON.stringify({
        campaign_name: cname,
        job_title: jobtitle,
        company_name: compname,
        target_candidate_ids: selectedCandidates
      }))
    const response = await fetch("https://hire-ai-backend-wcrk.onrender.com/api/outreach/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-email": session.user.email  // Include this only if backend expects it
      },
      body: JSON.stringify({
        campaign_name: cname,
        job_title: jobtitle,
        company_name: compname,
        target_candidate_ids: selectedCandidates
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create campaign");
    }

    alert("Campaign launched successfully!");
    console.log(data);
  } catch (error) {
    console.error("Campaign launch error:", error);
    alert("Failed to launch campaign. Please try again.");
    }
  };


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

  if (status === "authenticated") {
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
            <button onClick={() => {signOut()}} className='text-lg md:text-xl font-extrabold text-gray-300 bg-gray-600 p-3 rounded-2xl hover:translate-y-1 transition duration-300 active:translate-y-0.5'>SignOut</button>
          </div>
          
          <div className='flex-1 overflow-y-auto bg-gray-700'>
            <div className='p-5 md:p-10 lg:p-12'>
                <div className='bg-gray-300 rounded-2xl ml-10 mr-10'>
                    <div className='flex flex-col gap-2 p-5'>
                        <h1 className='text-2xl text-gray-700 font-bold border-b-2 border-gray-700'>Create a new campaign</h1>
                        <p className='text-lg font-bold mt-3'>Campaign Name</p>
                        <input type='text' placeholder='e.g. Frontend Campaign' value={cname} className="bg-gray-700 text-gray-300 font-bold w-[500px] p-2 rounded-2xl"onChange={(e) => {setCname(e.target.value)}}/>
                        {/* <p className='text-lg font-bold mt-3'>Message Template</p>
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
                        </div> */}
                        <p className='text-lg font-bold mt-3'>Job Title</p>
                        <input type='text' placeholder='e.g. Frontend Engineer' value={jobtitle} className="bg-gray-700 text-gray-300 font-bold w-[500px] p-2 rounded-2xl"onChange={(e) => {setJobTitle(e.target.value)}}/>
                        <p className='text-lg font-bold mt-3'>Company Name</p>
                        <input type='text' placeholder='e.g. Tesla' value={compname} className="bg-gray-700 text-gray-300 font-bold w-[500px] p-2 rounded-2xl"onChange={(e) => {setCompName(e.target.value)}}/>
                        <div className='flex flex-col'>
                          <h1 className='font-bold text-lg mt-3 mb-2'>Target Candidates</h1>
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
                  <div className='flex flex-col'>
                    <h1 className='text-gray-300 font-extrabold text-3xl'>Active Campaigns</h1>
                    <h1 className='text-gray-300 font-bold text-xl'>(Select a template to activate the campaign)</h1>
                  </div>
                    <div className='flex gap-4'>
                      {campaigns.length > 0 ? (
                        campaigns.map(campaign => (
                          <div key={campaign.id} className='flex flex-col gap-3 mt-5 bg-gray-300 rounded-2xl p-5 w-fit'>
                            <div className='flex items-center gap-3'>
                              <h1 className='text-gray-700 font-bold text-2xl p-2'>{campaign.campaign_name}</h1>
                              <h1 className='bg-gray-700 text-gray-300 font-bold p-2 rounded-2xl'>
                                {campaign.status || 'Active'}
                              </h1>
                            </div>
                            <div className='text-gray-700 font-bold'>
                              <select
                                className="mt-3 p-2 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold"
                                onChange={async (e) => {
                                  const template = e.target.value;
                                  if (!template) return;

                                  try {
                                    const res = await fetch(`https://hire-ai-backend-wcrk.onrender.com/api/outreach/campaigns/${campaign.id}/send`, {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        'x-user-email': session.user.email // Replace this with actual user email if dynamic
                                      },
                                      body: JSON.stringify({
                                        message_template: template
                                      })
                                    });

                                    const data = await res.json();
                                    alert(`Campaign sent with template: ${template}`);
                                  } catch (err) {
                                    console.error(err);
                                    alert('Error sending campaign');
                                  }
                                }}
                              >
                                <option value="">Select Template</option>
                                <option value="Initial Connection Request">Initial Connection Request</option>
                                <option value="LinkedIn InMail">LinkedIn InMail</option>
                                <option value="Follow-up After No Response">Follow-up After No Response</option>
                              </select>
                            </div>
                            <div className='text-gray-700 font-bold p-2'>
                              <p>Job Title: {campaign.job_title}</p>
                              <p>Total Candidates: {campaign.target_candidate_ids.length}</p>
                              <p>Emails Sent: {campaign.emails_sent}</p>
                              <p>Created: {new Date(campaign.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className='text-gray-300 mt-4'>No active campaigns</p>
                      )}
                      

                    </div>
                    <h1 className='text-gray-300 font-bold text-md mt-6'>Note: You can simply choose another template from an "Active" campaign to start another campign.</h1>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
}

export default Hero;