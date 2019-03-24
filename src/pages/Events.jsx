import React, { useState, useEffect } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

import api from '../utils/API';
import PageWrapper from '../components/PageWrapper';

const Events = () => {
    const [schoolDistrictList, setSchoolDistrictList] = useState(null);
    const [schoolList, setSchoolList] = useState([]);

    const getList = async path => {
        const response = await api.get(path);
        return response;
    };

    const getSchools = e => {
        const districtId = e.target.value;
        getList(`/schools/district/${districtId}`).then(response => {
            setSchoolList(response.data);
        });
    };

    useEffect(() => {
        if (!schoolDistrictList) {
            getList('/schooldistricts').then(response => {
                setSchoolDistrictList(response.data);
            });
        }
    }, [schoolDistrictList]);

    return (
        <PageWrapper title="Events">
            <p>Select from the options below to view events.</p>
            {schoolDistrictList && (
                <FormGroup>
                    <Label for="districtSelect">School District</Label>
                    <Input type="select" name="districtSelect" id="districtSelect" onChange={getSchools}>
                        <option value="0">Select District</option>
                        {schoolDistrictList.map(district => (
                            <option value={district.schoolDistrictId} key={district.schoolDistrictId}>
                                {district.schoolDistrictId} {district.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
            )}

            {schoolList.length ? (
                <FormGroup>
                    <Label for="districtSelect">School</Label>
                    <Input type="select" name="schoolSelect" id="schoolSelect">
                        <option value="0">Select School</option>
                        {schoolList.map(school => (
                            <option value={school.schoolId} key={school.schoolId}>
                                {school.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
            ) : null}
        </PageWrapper>
    );
};

export default Events;
