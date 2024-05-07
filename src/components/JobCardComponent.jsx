import { useState } from 'react';

const JobCard = ({jobData})=>{
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="card">
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
                            <p className={`description ${expanded ? 'expanded' : ''}`}>
                                    {jobData.jobDetailsFromCompany}
                            </p>
                            {!expanded && <div className='view-more' onClick={toggleExpand}>View More</div>}
                            
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