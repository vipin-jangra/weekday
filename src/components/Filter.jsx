import { useEffect, useState } from 'react';
import Select from 'react-select';

const Filter = ({ onFilterChange }) => {
    const [employeeOption, setEmployeeOption] = useState(null);
    const [experienceOption, setExperienceOption] = useState(null);
    const [remoteOption, setRemoteOption] = useState(null);
    const [payOption, setPayOption] = useState(null);
    const [roleOption, setRoleOption] = useState(null);

    const handleFilterChange = () => {
        // Collect selected options and pass them back to parent component
        const filters = {
            employees: employeeOption,
            experience: experienceOption,
            remote: remoteOption,
            pay: payOption,
            role: roleOption
        };
        onFilterChange(filters);
    };

    const NoOfEmployees = [
        { value: '1-10', label: '1-10' },
        { value: '11-20', label: '11-20' },
        { value: '20-50', label: '20-50' }
    ];

    const experience = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' }
    ];

    const pay = [
        { value: '0', label: '1' },
        { value: '1', label: '2' },
        { value: '2', label: '3' },
        { value: '3', label: '4' },
        { value: '4', label: '5' },
        { value: '5', label: '6' }
    ];

    const remote = [
        { value: 'remote', label: 'Remote' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'in-Office', label: 'In-office' },
    ];

    const role = [
        { value: 'frontend', label: 'Frontend' },
        { value: 'backend', label: 'Backend' },
        { value: 'fullstack', label: 'Full-stack' },
    ];

    return (
        <div className="filter">
            <Select
                placeholder="No. of employees"
                options={NoOfEmployees}
                value={employeeOption}
                onChange={(selectedOption)=>{
                    setEmployeeOption(selectedOption);
                    handleFilterChange();
                }}
                isClearable
            />
            <Select
                placeholder="Experience"
                options={experience}
                onChange={(selectedOption)=>{
                    setExperienceOption(selectedOption);
                    handleFilterChange();
                }}
                isClearable
            />
            <Select
                placeholder="Remote"
                options={remote}
                onChange={(selectedOption)=>{
                    setRemoteOption(selectedOption);
                    handleFilterChange();
                }}
                isClearable
            />
            <Select
                placeholder="Minimum base pay"
                options={pay}
                onChange={(selectedOption)=>{
                    setPayOption(selectedOption);
                    handleFilterChange();
                }}
                isClearable
            />
            <Select
                placeholder="Role"
                options={role}
                onChange={(selectedOption)=>{
                    setRoleOption(selectedOption);
                    handleFilterChange();
                }}
                isClearable
            />
        </div>
    );
};

export default Filter;
