import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { getCountries } from '../../api/countries/countriesClient';
import { groupCountriesByContinent, getExpandedRowRender, mapCountries } from './countriesHelper';

const Countries = () => {
    const [groupedCountries, setGroupedCountries] = useState([]);

    const getCountriesData = async () => {
        const countries = await getCountries();
        const mappedCountries = mapCountries(countries);
        const groupedCountries = groupCountriesByContinent(mappedCountries);
        setGroupedCountries(groupedCountries);
    }

    const memorizedCallback = useCallback(
        getCountriesData,
        []
    );

    useEffect(() => {
        memorizedCallback();
    }, [memorizedCallback])


    const columns = [
        { title: 'Continent', dataIndex: 'name', key: 'name' },
    ];

    return (
        <Table
            className="components-table-demo-nested"
            columns={columns}
            rowKey="name"
            dataSource={groupedCountries}
            expandable={{
                expandedRowRender: getExpandedRowRender
            }}
        />
    );
};

export default Countries;