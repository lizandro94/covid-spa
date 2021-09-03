import { Table } from 'antd';
import dayjs from 'dayjs'

export const groupCountriesByContinent = countries => {
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
        { title: 'Country', dataIndex: 'country', key: 'country' },
        { title: 'Total cases', dataIndex: 'totalCases', key: 'totalCases', render: value => (value ?? 0).toLocaleString('en-US') },
        { title: 'Last update', dataIndex: 'time', key: 'time', render: value => dayjs(value).format('MM/DD/YYYY HH:MM') },
        { title: 'Population', dataIndex: 'population', key: 'population', render: value => (value ?? 0).toLocaleString('en-US') }
    ];

    return <Table columns={columns} dataSource={record.countries} pagination={false} rowKey="country" />;
};

export const mapCountries = countries => {
    const mappedCountries = countries.response.map(c => {
        return {
            ...c,
            totalCases: c.cases.total
        }
    });

    return mappedCountries;
}