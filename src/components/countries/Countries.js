import React, { useCallback, useEffect, useState } from 'react';
import { Table, Input, Card, Divider } from 'antd';
import { getCountries } from '../../api/countries/countriesClient';
import { groupCountriesByContinent, getExpandedRowRender, mapCountries, filterCountries, hasError, showError } from './countriesHelper';
import useQuery from '../../hooks/useQuery';
import { errorNotif } from '../../utils/notifUtilities';
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
        try {
            const countries = await getCountries();
            if (hasError(countries)) {
                showError(countries);
                return;
            }
            setCountries(countries.response);
        } catch (error) {
            errorNotif("I was not posible to get countries");
        }
    }

    const memorizedGetCountriesData = useCallback(getCountriesData, []);

    useEffect(() => {
        memorizedGetCountriesData();
    }, [memorizedGetCountriesData])

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