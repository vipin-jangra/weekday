import { useEffect, useState } from "react";
import JobCard from "./JobCardComponent";
import { jobsList } from "../apicalls/jobListing";
import Filter from "./Filter";

const JobComponent = ()=>{

    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

    const fetchJobs = async()=>{
        const data = {
            "limit": 9,
            "offset": 0
           }
           
        try {
            const response = await jobsList(data);
            setJobs(response);
            setFilteredJobs(response.jdList)
        } catch (error) {
            console.log(error);
        }
    }


    const applyFilters = (filters) => {
        let filtered = jobs.jdList;
        
       //experience filter
        if (filters.experience) {
            const minExperienceValue = parseInt(filters.experience.value);
            filtered = filtered.filter(job => job.minExp >= minExperienceValue);
        }
        
        if (filters.employees) {
            const employees = filters.employees.value;
            
            const [minEmployees, maxEmployees] = employees.split('-').map(Number);
            filtered = filtered.filter(job => {
                const jobEmployees = job.numberOfEmployees;
                return jobEmployees >= minEmployees && jobEmployees <= maxEmployees;
            });
        }

        if (filters.remote) {
            const remoteStatus = filters.remote.value;
            filtered = filtered.filter(job => job.location === remoteStatus);
        }

        //pay
        if (filters.pay) {
            const pay = parseInt(filters.pay.value);
            filtered = filtered.filter(job => job.minJdSalary >= pay);
        }

        //role
        if (filters.role) {
            const role = filters.role.value;
            filtered = filtered.filter(job => job.jobRole === role);
        }
        // Add other filters as needed...

        setFilteredJobs(filtered);
        console.log(filteredJobs);
    };

    useEffect(()=>{
        fetchJobs();
    },[])

    return (
    <div className='wrapper'>
        <div className='container'>
        <Filter onFilterChange={applyFilters} />
        
        {filteredJobs && filteredJobs.map(job => (
                    <JobCard
                        key={job.jdUid}
                        jobData = {job}
                    />
                ))}
        </div>
    </div>
    );
};

export default JobComponent;