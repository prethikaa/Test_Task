import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

export interface Country {
  name: string;
  code: string;
  currency: string;
  continent: {
    name: string;
    code: string;
  };
}

interface CountryQueryVariables {
  continent?: { eq: string };
  currency?: { eq: string };
}

interface CountryQueryResponse {
  countries: Country[];
}

export const CountryService = {
  getCountries: async (
    continent: string,
    currency: string
  ): Promise<Country[]> => {
    const GET_COUNTRIES = gql`
      query GetCountries(
        $continent: StringQueryOperatorInput
        $currency: StringQueryOperatorInput
      ) {
        countries(filter: { continent: $continent, currency: $currency }) {
          name
          code
          currency
          continent {
            name
            code
          }
        }
      }
    `;

    try {
      const { data } = await client.query<
        CountryQueryResponse,
        CountryQueryVariables
      >({
        query: GET_COUNTRIES,
        variables: {
          continent: continent ? { eq: continent } : undefined,
          currency: currency ? { eq: currency } : undefined,
        },
      });

      if (!data.countries || data.countries.length === 0) {
        throw new Error("No countries  matching your search or filters.");
      }

      return data.countries;
    } catch (error) {
      throw new Error("No countries found.");
    }
  },
};
