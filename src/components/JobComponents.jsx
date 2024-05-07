import React, { useEffect, useState, useRef, useCallback } from "react";
import JobCard from "./JobCardComponent";
import { jobsList } from "../apicalls/jobListing";
import Filter from "./Filter";

const JobComponent = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);

    const observer = useRef();

    const lastJobPostRef = useCallback(node => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                console.log(entries[0].isIntersecting);
               setOffset(prev => prev +9);
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
                setFilteredJobs(prevFilteredJobs => [...prevFilteredJobs, ...response.jdList]);
                //setOffset(offset + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = (filters) => {
        let filtered = jobs;

        // Apply filters
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

        if (filters.pay) {
            const pay = parseInt(filters.pay.value);
            filtered = filtered.filter(job => job.minJdSalary >= pay);
        }

        if (filters.role) {
            const role = filters.role.value;
            filtered = filtered.filter(job => job.jobRole === role);
        }

        setFilteredJobs(filtered);
        console.log(filteredJobs);
    };

    useEffect(() => {
        if (hasMore) {
            fetchJobs({
                "limit": 9,
                "offset": offset
            });
        }
    }, [offset]);

    return (
        <div className='wrapper'>
            <div className='container'>
                <Filter onFilterChange={applyFilters} />
                {filteredJobs && filteredJobs.map((job, index) => (
                    
                    <JobCard
                        key={job.jdUid}
                        jobData={job}
                        lastref={index === filteredJobs.length - 1 ? lastJobPostRef : null}
                    />
                ))}
                {loading && <div>Loading...</div>}
                {!hasMore && <div>No more jobs to load</div>}
            </div>
        </div>
    );
};

export default JobComponent;
