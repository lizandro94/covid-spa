import React, { useCallback, useEffect, useState } from 'react';
import { Table, Input, Card, Divider } from 'antd';
import { getCountries } from '../../api/countries/countriesClient';
import { groupCountriesByContinent, getExpandedRowRender, mapCountries, filterCountries } from './countriesHelper';
import useQuery from '../../hooks/useQuery';
import './styles.scss';

const Countries = () => {
    const { Search } = Input;
    let query = useQuery();
    const searchParam = query.get("search");

    const [countries, setCountries] = useState([]);
    const [groupedCountries, setGroupedCountries] = useState([]);
    const [searchWord, setSearchWord] = useState(searchParam ?? '');
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const getCountriesData = async () => {
        const countries = await getCountries();
        setCountries(countries.response);
    }

    useEffect(() => {
        getCountriesData();
    }, [])

    const fillGroupedCountries = () => {
        const filteredCountries = filterCountries(countries, searchWord);

        const mappedCountries = mapCountries(filteredCountries);
        const groupedCountries = groupCountriesByContinent(mappedCountries);
        setGroupedCountries(groupedCountries);

        const expandedKeys = searchWord ? groupedCountries.map(c => c.name) : [];
        setExpandedRowKeys(expandedKeys);
    }

    const memorizedFillGroupedCountries = useCallback(fillGroupedCountries, [countries, searchWord]);

    useEffect(() => {
        memorizedFillGroupedCountries();
    }, [memorizedFillGroupedCountries])


    const columns = [
        { title: 'Continent', dataIndex: 'name', key: 'name' },
    ];

    const onSearch = value => {
        setSearchWord(value);
    }

    const onChangeSearchInput = event => {
        setSearchWord(event.target.value);
    }

    const onTableRowExpand = (expanded, record) => {
        var keys = [];
        if (expanded) {
            keys.push(record.name);
        }

        setExpandedRowKeys(keys);
    }

    return (
        <Card className="countries-card" title="COVID-19 Statistics ">
            <Search value={searchWord} placeholder="Search countries or continents" allowClear onChange={onChangeSearchInput} onSearch={onSearch} size="large" />
            <Divider />
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
        </Card>
    );
};

export default Countries;