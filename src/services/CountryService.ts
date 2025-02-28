import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// Set up Apollo Client to interact with the GraphQL API
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql",
  cache: new InMemoryCache(),
});

// Country interface
export interface Country {
  name: string;
  code: string;
  currency: string;
  continent: {
    name: string;
    code: string;
  };
}

// CountryQueryVariables interface
interface CountryQueryVariables {
  continent?: { eq: string };
  currency?: { eq: string };
}

// CountryQueryResponse interface
interface CountryQueryResponse {
  countries: Country[];
}

export const CountryService = {
  getCountries: async (
    continent: string,
    currency: string
  ): Promise<Country[]> => {
    // GraphQL query to get countries with filters for continent and currency
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
      // Execute the query
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
      //If no countries are found, throw an error
      if (!data.countries || data.countries.length === 0) {
        throw new Error("No countries  matching your search or filters.");
      }

      return data.countries;
    } catch (error) {
      // If an error occurs, throw an error
      throw new Error("No countries found matching your search or filters.");
    }
  },
};
