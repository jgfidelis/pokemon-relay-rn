/**
 * @flow
 * @relayHash 222cd731ebb79263166083f2ec179300
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Home_query$ref = any;
export type HomeQueryVariables = {|
  count: number,
  cursor?: ?string,
|};
export type HomeQueryResponse = {|
  +$fragmentRefs: Home_query$ref
|};
export type HomeQuery = {|
  variables: HomeQueryVariables,
  response: HomeQueryResponse,
|};
*/

/*
query HomeQuery(
  $count: Int!
  $cursor: String
) {
  ...Home_query_1G22uz
}

fragment Home_query_1G22uz on Query {
  pokemons(first: $count, after: $cursor) {
    count
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        id
        ...PokemonRow_pokemon
        __typename
      }
    }
  }
}

fragment PokemonRow_pokemon on Pokemon {
  id
  name
  number
  imageUrl
  weight
  height
  types
}
*/

const node /*: ConcreteRequest*/ = (function() {
  var v0 = [
      {
        kind: 'LocalArgument',
        name: 'count',
        type: 'Int!',
        defaultValue: null,
      },
      {
        kind: 'LocalArgument',
        name: 'cursor',
        type: 'String',
        defaultValue: null,
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'after',
        variableName: 'cursor',
        type: 'String',
      },
      {
        kind: 'Variable',
        name: 'first',
        variableName: 'count',
        type: 'Int',
      },
    ];
  return {
    kind: 'Request',
    operationKind: 'query',
    name: 'HomeQuery',
    id: null,
    text:
      'query HomeQuery(\n  $count: Int!\n  $cursor: String\n) {\n  ...Home_query_1G22uz\n}\n\nfragment Home_query_1G22uz on Query {\n  pokemons(first: $count, after: $cursor) {\n    count\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        id\n        ...PokemonRow_pokemon\n        __typename\n      }\n    }\n  }\n}\n\nfragment PokemonRow_pokemon on Pokemon {\n  id\n  name\n  number\n  imageUrl\n  weight\n  height\n  types\n}\n',
    metadata: {},
    fragment: {
      kind: 'Fragment',
      name: 'HomeQuery',
      type: 'Query',
      metadata: null,
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'FragmentSpread',
          name: 'Home_query',
          args: [
            {
              kind: 'Variable',
              name: 'count',
              variableName: 'count',
              type: null,
            },
            {
              kind: 'Variable',
              name: 'cursor',
              variableName: 'cursor',
              type: null,
            },
          ],
        },
      ],
    },
    operation: {
      kind: 'Operation',
      name: 'HomeQuery',
      argumentDefinitions: v0,
      selections: [
        {
          kind: 'LinkedField',
          alias: null,
          name: 'pokemons',
          storageKey: null,
          args: v1,
          concreteType: 'PokemonConnection',
          plural: false,
          selections: [
            {
              kind: 'ScalarField',
              alias: null,
              name: 'count',
              args: null,
              storageKey: null,
            },
            {
              kind: 'LinkedField',
              alias: null,
              name: 'pageInfo',
              storageKey: null,
              args: null,
              concreteType: 'PageInfoExtended',
              plural: false,
              selections: [
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'hasNextPage',
                  args: null,
                  storageKey: null,
                },
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'endCursor',
                  args: null,
                  storageKey: null,
                },
              ],
            },
            {
              kind: 'LinkedField',
              alias: null,
              name: 'edges',
              storageKey: null,
              args: null,
              concreteType: 'PokemonEdge',
              plural: true,
              selections: [
                {
                  kind: 'ScalarField',
                  alias: null,
                  name: 'cursor',
                  args: null,
                  storageKey: null,
                },
                {
                  kind: 'LinkedField',
                  alias: null,
                  name: 'node',
                  storageKey: null,
                  args: null,
                  concreteType: 'Pokemon',
                  plural: false,
                  selections: [
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'id',
                      args: null,
                      storageKey: null,
                    },
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'name',
                      args: null,
                      storageKey: null,
                    },
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'number',
                      args: null,
                      storageKey: null,
                    },
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'imageUrl',
                      args: null,
                      storageKey: null,
                    },
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'weight',
                      args: null,
                      storageKey: null,
                    },
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'height',
                      args: null,
                      storageKey: null,
                    },
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: 'types',
                      args: null,
                      storageKey: null,
                    },
                    {
                      kind: 'ScalarField',
                      alias: null,
                      name: '__typename',
                      args: null,
                      storageKey: null,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: 'LinkedHandle',
          alias: null,
          name: 'pokemons',
          args: v1,
          handle: 'connection',
          key: 'home_pokemons',
          filters: null,
        },
      ],
    },
  };
})();
// prettier-ignore
(node/*: any*/).hash = '02ccb0897e42cf74294d6ffee6050284';
module.exports = node;
