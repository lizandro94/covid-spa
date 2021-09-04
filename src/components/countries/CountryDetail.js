import React, { useCallback, useEffect, useState } from 'react';
import { Card, Descriptions, Statistic, Divider, Input } from 'antd';
import { useHistory, useParams } from "react-router-dom"
import { getCountries } from '../../api/countries/countriesClient';
import { errorNotif } from '../../utils/notifUtilities';
import { hasError, showError } from './countriesHelper';
import { Pie } from 'react-chartjs-2';
import dayjs from 'dayjs';
import './styles.scss';

const CountryDetail = () => {
    const { Search } = Input;
    const { Item } = Descriptions;
    const { country } = useParams();
    const [countryData, setCountryData] = useState({});
    const history = useHistory();

    const getCountry = async () => {
        try {
            var countryData = await getCountries({ country });
            if (hasError(countryData)) {
                showError(countryData);
                return;
            }
            countryData.results > 0
                ? setCountryData(countryData.response[0])
                : history.push('/NotFound');
        } catch (error) {
            errorNotif("I was not posible to get countries");
        }
    }

    const memorizedCallback = useCallback(
        getCountry,
        [country, history]
    );

    useEffect(() => {
        memorizedCallback();
    }, [memorizedCallback])

    const data = {
        labels: ['Stable', 'Critical'],
        datasets: [
            {
                label: '# of Cases',
                data: [countryData.cases?.active, countryData.cases?.critical],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const onSearch = (value) => {
        history.push(`/?search=${value}`);
    }

    return (
        <Card className="countries-card" title="Country details">
            <Search placeholder="Search countries or continents" allowClear onSearch={onSearch} size="large" />
            <Divider />
            <Descriptions title={<h1>{country}</h1>}>
                <Item label=""><Statistic title="Continent" value={countryData.continent ?? '-'} /></Item>
                <Item label=""><Statistic title="Population" value={countryData.population ?? '-'} /></Item>
                <Item label=""><Statistic title="Last updated" value={dayjs(countryData.time).format('MM/DD/YYYY HH:MM')} /></Item>
                <Item label=""><Statistic title="Recovered" valueStyle={{ color: '#3f8600' }} value={countryData?.cases?.recovered ?? '-'} /></Item>
                <Item label=""><Statistic title="Total deaths" valueStyle={{ color: '#cf1322' }} value={countryData?.deaths?.total ?? '-'} /></Item>
                <Item label=""><Statistic title="Total cases" value={countryData?.cases?.total ?? '-'} /></Item>
            </Descriptions>
            <Divider orientation="center">Active Cases</Divider>
            <div className="pie-container">
                <Pie data={data} />
            </div>
        </Card>
    );
};

export default CountryDetail;