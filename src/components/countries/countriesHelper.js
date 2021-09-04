import { Table } from 'antd';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { errorNotif } from '../../utils/notifUtilities';

export const groupCountriesByContinent = countries => {
    if (!countries) {
        return [];
    }

    const result = countries.reduce((list, currentCountry) => {
        const currentCountryContinent = currentCountry.continent ?? 'No continent';
        let group = list.find(g => g.name === currentCountryContinent)

        if (!group) {
            group = {
                name: currentCountryContinent,
                countries: [{ ...currentCountry }]
            };

            list.push(group);
        }
        else {
            group.countries = [...group.countries, currentCountry]
        }

        return list;
    }, []);

    return result;
}

export const getExpandedRowRender = (record) => {
    const columns = [
        { title: 'Country', dataIndex: 'country', key: 'country', render: (text, record) => <Link to={`/country/${record.country}`}>{text}</Link> },
        { title: 'Total cases', dataIndex: 'totalCases', key: 'totalCases', render: value => (value ?? 0).toLocaleString('en-US') },
        { title: 'Last update', dataIndex: 'time', key: 'time', render: value => dayjs(value).format('MM/DD/YYYY HH:MM') },
        { title: 'Population', dataIndex: 'population', key: 'population', render: value => (value ?? 0).toLocaleString('en-US') }
    ];

    return <Table columns={columns} dataSource={record.countries} pagination={false} rowKey="country" />;
};

export const mapCountries = countries => {
    const mappedCountries = countries.map(c => {
        return {
            ...c,
            totalCases: c?.cases?.total ?? 0
        }
    });

    return mappedCountries;
}

export const filterCountries = (countries, searchWord) => {
    const filteredCountries = countries.filter(c => {
        const country = (c.country ?? '').toUpperCase();
        const continent = (c.continent ?? '').toUpperCase();
        const searchCriteria = searchWord.toUpperCase();

        return country.indexOf(searchCriteria) >= 0 || continent.indexOf(searchCriteria) >= 0;
    });

    return filteredCountries;
}

export const hasError = countries => {
    // When there are errors, errors prop is an object instead of an array
    return !Array.isArray(countries.errors);
}

export const showError = countries => {
    const errors = Object.values(countries.errors);
    errorNotif(errors[0]);
}