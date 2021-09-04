import { groupCountriesByContinent, filterCountries, mapCountries } from './countriesHelper';

describe('groupCountriesByContinent should', () => {
    const countries = [
        { country: 'China', continent: 'Asia' },
        { country: 'Macao', continent: 'Asia' },
        { country: 'Spain', continent: 'Europe' },
        { country: 'Congo', continent: 'Africa' },
    ];

    const countriesWithNullContinent = [
        ...countries,
        { country: 'TestCountry', continent: null },
        { country: 'TestCountry2', continent: null },
    ]

    it('return correct amount of groups', () => {
        const continentWithCountries = groupCountriesByContinent(countries);
        expect(continentWithCountries).toHaveLength(3);
    });
    it('return empty array when countries parameter is an empty array', () => {
        const continentWithCountries = groupCountriesByContinent([]);
        expect(continentWithCountries).toHaveLength(0);
    });
    it('return empty array when countries parameter is missing', () => {
        const continentWithCountries = groupCountriesByContinent();
        expect(continentWithCountries).toHaveLength(0);
    });
    it('return correct amount of groups with null continents', () => {
        const continentWithCountries = groupCountriesByContinent(countriesWithNullContinent);
        expect(continentWithCountries).toHaveLength(4);
    });
});

describe('filterCountries should', () => {
    const countries = [
        { country: 'China', continent: 'Asia' },
        { country: 'Macao', continent: 'Asia' },
        { country: 'Spain', continent: 'Europe' },
        { country: 'Congo', continent: 'Africa' },
    ];

    it('return one country when matches every letter of country name', () => {
        const filteredCountries = filterCountries(countries, "China");
        expect(filteredCountries).toHaveLength(1);
    });
    it('return one country when matches part of the country name', () => {
        const filteredCountries = filterCountries(countries, "pain");
        expect(filteredCountries).toHaveLength(1);
    });
    it('return one country when matches lowercased country name', () => {
        const filteredCountries = filterCountries(countries, "congo");
        expect(filteredCountries).toHaveLength(1);
    });
    it('return all countries for a continent', () => {
        const filteredCountries = filterCountries(countries, "asia");
        expect(filteredCountries).toHaveLength(2);
    });
});

describe('mapCountries should', () => {
    const countries = [
        { country: 'China', continent: 'Asia', cases: { total: 51 } },
        { country: 'Macao', continent: 'Asia', cases: { total: 40 } },
        { country: 'Spain', continent: 'Europe', cases: { total: 12 } },
        { country: 'Congo', continent: 'Africa', cases: { total: 4 } }
    ];

    const countriesWithNullCases = [
        ...countries,
        { country: 'Luxembourg', continent: 'Europe' }
    ]

    it('return same amount of countries', () => {
        const mappedCountries = mapCountries(countries);
        expect(mappedCountries).toHaveLength(4);
    });
    it('return every country with total cases prop', () => {
        const mappedCountries = mapCountries(countriesWithNullCases);
        const totalCasesIsInEveryCountry = mappedCountries.every(c => typeof c.totalCases === 'number');
        expect(totalCasesIsInEveryCountry).toBeTruthy();
    });
    it('return same amount of countries even with no cases', () => {
        const mappedCountries = mapCountries(countriesWithNullCases);
        expect(mappedCountries).toHaveLength(5);
    });
});