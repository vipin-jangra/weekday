import { useState } from 'react';


const JobCard = ({jobData,lastref,onClick})=>{
    

   

    return (
        <div className="card" ref={lastref}>
            <div className="card-content">
                <span className="tag">Posted 10 days ago</span>
                <div className="cmpny-details">
                    <img src={jobData.logoUrl} alt="Company Logo" className="logo" />
                    <div className="details">
                        <span className="detail">{jobData.companyName}</span>
                        <span className="detail">{jobData.jobRole}</span>
                        <span className="detail">{jobData.location}</span>
                    </div>
                </div>
                <div className="additional-info">
                    <div className='additional-info-content'>
                        <div className="salary">Estimated Salary: {jobData.salaryCurrencyCode} {jobData.minJdSalary} - {jobData.maxJdSalary}</div>
                        <div className="about-company">
                            <p className={`description `}>
                                    {jobData.jobDetailsFromCompany}
                            </p>
                            <div className='view-more'>View More</div>
                            
                        </div>
                    </div>
                    <div className='experience'>
                        <span>Minimum Experience</span>
                        <span>{jobData.minExp} years</span>
                    </div>
                    <div className='buttons'>
                        <div className='button'>Easy Apply</div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
};

export default JobCard;