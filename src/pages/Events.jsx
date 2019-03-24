import React, { useState, useEffect, useContext } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

import GlobalContext from '../context/GlobalContext';
import api from '../utils/API';
import PageWrapper from '../components/PageWrapper';

const Events = () => {
    const [schoolDistrictList, setSchoolDistrictList] = useState(null);
    const [schoolList, setSchoolList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const [schoolName, setSchoolName] = useState(null);

    const globalContext = useContext(GlobalContext);
    const { updateLoading } = globalContext;

    const getList = async path => {
        updateLoading(true);
        const response = await api.get(path);
        updateLoading(false);
        return response;
    };

    const getSchools = e => {
        const districtId = e.target.value;
        getList(`/schools/district/${districtId}`).then(response => {
            setSchoolList(response.data);
        });
    };

    const getEvents = e => {
        const schoolId = e.target.value.split('|')[0];
        setSchoolName(e.target.value.split('|')[1]);
        getList(`/events/school/${schoolId}`).then(response => {
            setEventList(response.data);
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
                    <Input type="select" name="schoolSelect" id="schoolSelect" onChange={getEvents}>
                        <option value="0">Select School</option>
                        {schoolList.map(school => (
                            <option value={`${school.schoolId}|${school.name}`} key={school.schoolId}>
                                {school.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
            ) : null}

            {eventList.length ? (
                <>
                    <h2>{schoolName}</h2>
                    <div>
                        {eventList.map(event => (
                            <div key={event.eventId}>
                                <h4>{event.name}</h4>
                                <div>Starts: {event.startDate}</div>
                                <div>Ends: {event.endDate}</div>
                                <p>&nbsp;</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </PageWrapper>
    );
};

export default Events;
