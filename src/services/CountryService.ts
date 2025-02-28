// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "https://countries.trevorblades.com/graphql",
//   cache: new InMemoryCache(),
// });

// export const CountryService = {
//   getCountries: async (continent: string, currency: string) => {
//     const GET_COUNTRIES = gql`
//       query GetCountries(
//         $continent: StringQueryOperatorInput
//         $currency: StringQueryOperatorInput
//         $search: StringQueryOperatorInput
//       ) {
//         countries(
//           filter: { continent: $continent, currency: $currency, name: $search }
//         ) {
//           name
//           code
//           currency
//           capital
//           continent {
//             name
//             code
//           }
//         }
//       }
//     `;

//     try {
//       const { data } = await client.query({
//         query: GET_COUNTRIES,
//         variables: {
//           continent: continent ? { eq: continent } : undefined,
//           currency: currency ? { eq: currency } : undefined,
//         },
//       });

//       if (!data.countries || data.countries.length === 0) {
//         throw new Error(
//           "No countries available for the selected filters or search."
//         );
//       }

//       return data.countries;
//     } catch (error) {
//       console.error("Error fetching countries:", error);
//       throw new Error(
//         "No countries found matching your search or filters."
//       );
//     }
//   },
// };

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
        throw new Error("No countries available for the selected filters.");
      }

      return data.countries;
    } catch (error) {
      throw new Error("No countries found matching your search or filters.");
    }
  },
};
