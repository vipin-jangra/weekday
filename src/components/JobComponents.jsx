import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import JobCard from "./JobCardComponent";
import { jobsList } from "../apicalls/jobListing";
import Filter from "./Filter";

const JobComponent = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const [filter,setfilters] = useState([]);
    const observer = useRef();

    const lastJobPostRef = useCallback(node => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
               setOffset(prev => prev + 9);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading,hasMore]);

    const fetchJobs = async (data) => {

        try {
            setLoading(true);
            const response = await jobsList(data);
            if (response && response.jdList.length > 0) {
                setJobs(prevJobs => [...prevJobs, ...response.jdList]);
                // setFilteredJobs(prevFilteredJobs => [...prevFilteredJobs, ...response.jdList]);

            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const filterToApply = (filtersList)=>{
        setfilters(filtersList);
    }

    const applyFilters = async(filters, jobData) => {
        
        try {
            setLoading(true);
            let filtered = jobData.filter(job => {
                // Apply filters based on filter criteria
                if (filters.experience) {
                    const minExperienceValue = parseInt(filters.experience.value);
                    if (job.minExp < minExperienceValue) return false;
                }
        
                if (filters.employees) {
                    const [minEmployees, maxEmployees] = filters.employees.value.split('-').map(Number);
                    const jobEmployees = job.numberOfEmployees;
                    if (jobEmployees < minEmployees || jobEmployees > maxEmployees) return false;
                }
        
                if (filters.remote) {
                    const remoteStatus = filters.remote.value;
                    if (job.location !== remoteStatus) return false;
                }
        
                if (filters.pay) {
                    const minPay = parseInt(filters.pay.value);
                    if (job.minJdSalary < minPay) return false;
                }
        
                if (filters.role) {
                    const selectedRole = filters.role.value;
                    if (job.jobRole !== selectedRole) return false;
                }

                if (filters.company) {
                    const search = filters.company.toLowerCase(); // Convert search term to lowercase
                    const companyName = job.companyName.toLowerCase(); // Convert company name to lowercase
                    if (!companyName.includes(search)) return false;
                }
        
                return true;
            });

            const filteredJobsMapped =  await filtered.map(job => ({
                jdUid: job.jdUid,
                jdLink: job.jdLink,
                jobDetailsFromCompany: job.jobDetailsFromCompany,
                maxJdSalary: job.maxJdSalary,
                minJdSalary: job.minJdSalary,
                salaryCurrencyCode: job.salaryCurrencyCode,
                location: job.location,
                minExp: job.minExp,
                maxExp: job.maxExp,
                jobRole: job.jobRole,
                companyName: job.companyName,
                logoUrl: job.logoUrl
            }));
        
            setFilteredJobs(filteredJobsMapped);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        
    };
    
    
    useMemo(() => {
        
        applyFilters(filter,jobs); // Initial filtering when filters or jobs change
    }, [filter, jobs]);

    useEffect(() => {
            fetchJobs({
                "limit": 9,
                "offset": offset
            });
    }, [offset]);

    

    return (
        <div className='wrapper'>
            <div className='container'>
                
                <Filter onFilterChange={filterToApply} />
                
                {filteredJobs && filteredJobs.length > 0 ? (
                    filteredJobs.map((filjob, index) => (
                        <JobCard
                            key={index}
                            jobData={filjob}
                            lastref={index === filteredJobs.length - 1 ? lastJobPostRef : null}
                        />
                    ))
                ) : (
                    <h2>No jobs matches...</h2>
                )}
                {!hasMore && <div>No more jobs to load</div>}
            </div>
            
        </div>
    );
};

export default JobComponent;
