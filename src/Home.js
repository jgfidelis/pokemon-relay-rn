import * as React from 'react';
import { ActivityIndicator, View, FlatList, StyleSheet } from 'react-native';
import { createRefetchContainer, graphql } from 'react-relay';
import type { RelayRefetchProp } from 'react-relay';

import PokemonRow from './PokemonRow';
import createQueryRenderer from './createQueryRenderer';

import type { Home_query } from './__generated__/Home_query.graphql';

const TOTAL_REFETCH_ITEMS = 10;

type Props = {
  query: Home_query,
  relay: RelayRefetchProp,
};

type State = {
  isFetchingTop: boolean,
  isFetchingEnd: boolean,
  refreshing: boolean,
};

class Home extends React.PureComponent<Props, State> {
  state = {
    isFetchingTop: false,
    isFetchingEnd: false,
    refreshing: false,
  };

  renderItem = ({ item }) => {
    return <PokemonRow pokemon={item.node} />;
  };

  onRefresh = () => {
    const { isFetchingTop } = this.state;

    if (isFetchingTop) return;

    this.setState({ isFetchingTop: true });

    const refetchVariables = fragmentVariables => ({
      ...fragmentVariables,
    });
    this.props.relay.refetch(
      refetchVariables,
      null,
      () => {
        this.setState({
          isFetchingTop: false,
          isFetchingEnd: false,
        });
      },
      {
        force: true,
      },
    );
  };

  onEndReached = () => {
    const { isFetchingEnd } = this.state;

    if (isFetchingEnd) return;

    const { query } = this.props;

    const pokemons = query ? query.pokemons : null;

    if (!pokemons || !pokemons.pageInfo.hasNextPage) return;

    this.setState({
      isFetchingEnd: true,
    });

    const { endCursor } = pokemons.pageInfo;

    const total = pokemons.edges.length + TOTAL_REFETCH_ITEMS;
    const refetchVariables = fragmentVariables => ({
      ...fragmentVariables,
      count: TOTAL_REFETCH_ITEMS,
      cursor: endCursor,
    });
    const renderVariables = {
      count: total,
    };

    this.props.relay.refetch(
      refetchVariables,
      renderVariables,
      () => {
        this.setState({
          isFetchingEnd: false,
          isFetchingTop: false,
        });
      },
      {
        force: false,
      },
    );
  };

  renderFooter = () => {
    const { isFetchingEnd } = this.state;
    if (!isFetchingEnd) return null;
    return <ActivityIndicator />
  }

  render() {
    const { pokemons } = this.props.query;
    return (
      <View style={styles.container}>
        <FlatList
          data={pokemons.edges}
          renderItem={this.renderItem}
          keyExtractor={item => item.node.id}
          showsVerticalScrollIndicator={false}
          extraData={this.state}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.3}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
});

const HomeRefectContainer = createRefetchContainer(
  Home,
  {
    query: graphql`
      fragment Home_query on Query @argumentDefinitions(count: { type: "Int" }, cursor: { type: "String" }) {
        pokemons(first: $count, after: $cursor) @connection(key: "home_pokemons") {
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
            }
          }
        }
      }
    `,
  },
  graphql`
    query HomeRefetchQuery($count: Int!, $cursor: String) {
      ...Home_query @arguments(count: $count, cursor: $cursor)
    }
  `,
);

export default createQueryRenderer(HomeRefectContainer, Home, {
  query: graphql`
    query HomeQuery($count: Int!, $cursor: String) {
      ...Home_query @arguments(count: $count, cursor: $cursor)
    }
  `,
  variables: {
    count: TOTAL_REFETCH_ITEMS,
  },
});
