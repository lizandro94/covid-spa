import React, { useCallback, useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { getCountries } from '../../api/countries/countriesClient';
import { groupCountriesByContinent, getExpandedRowRender, mapCountries, filterCountries } from './countriesHelper';

const Countries = () => {
    const { Search } = Input;
    const [groupedCountries, setGroupedCountries] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const getCountriesData = async () => {
        const countries = await getCountries();
        const filteredCountries = filterCountries(countries, searchWord);

        const mappedCountries = mapCountries(filteredCountries);
        const groupedCountries = groupCountriesByContinent(mappedCountries);
        setGroupedCountries(groupedCountries);

        const expandedKeys = searchWord ? groupedCountries.map(c => c.name) : [];
        setExpandedRowKeys(expandedKeys);
    }

    const memorizedCallback = useCallback(
        getCountriesData,
        [searchWord]
    );

    useEffect(() => {
        memorizedCallback();
    }, [memorizedCallback])


    const columns = [
        { title: 'Continent', dataIndex: 'name', key: 'name' },
    ];

    const onSearch = value => {
        setSearchWord(value);
    }

    const onTableRowExpand = (expanded, record) => {
        var keys = [];
        if(expanded){
            keys.push(record.name);
        }
    
        setExpandedRowKeys(keys);
    }

    return (
        <>
            <Search placeholder="Search countries or continents" allowClear onSearch={onSearch} size="large"/>
            <br/><br/>
            <Table
                className="components-table-demo-nested"
                columns={columns}
                rowKey="name"
                pagination={false}
                dataSource={groupedCountries}
                expandable={{
                    expandedRowRender: getExpandedRowRender,
                    expandRowByClick: true,
                    expandedRowKeys: expandedRowKeys,
                    onExpand: onTableRowExpand
                }}
            />
        </>
    );
};

export default Countries;