import * as React from 'react';
import { View, FlatList, StyleSheet, Image, Text } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';

import type { PokemonRow_pokemon } from './__generated__/PokemonRow_pokemon.graphql';

type Props = {
  pokemon: PokemonRow_pokemon,
};

class PokemonRow extends React.PureComponent<Props> {
  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  hectogramToKg = mass => {
    const kg = mass / 10;
    return kg.toFixed(1);
  };

  decimeterToMeter = height => {
    const meter = height / 10;
    return meter.toFixed(1);
  };

  render() {
    const { imageUrl, name, types, number, weight, height } = this.props.pokemon;
    return (
      <View style={styles.container}>
        <View style={styles.inside}>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <View style={styles.extraData}>
            <View style={styles.row}>
              <Text style={styles.bold}>{this.capitalizeFirstLetter(name)}</Text>
              <Text style={styles.hashtag}>#</Text>
              <Text style={styles.bold}>{number}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.bold}>Types: </Text>
              <Text style={styles.regular}>{types.join(', ')}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.bold}>Weight: </Text>
              <Text style={styles.regular}>{`${this.hectogramToKg(weight)}kg`}</Text>
              <Text style={styles.marginBold}>Height: </Text>
              <Text style={styles.regular}>{`${this.decimeterToMeter(height)}m`}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'black',
  },
  inside: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'black',
  },
  extraData: {
    flex: 1,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  bold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  marginBold: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  regular: {
    fontSize: 16,
  },
  hashtag: {
    marginLeft: 10,
    fontSize: 14,
    marginTop: 2,
  },
});

export default createFragmentContainer(PokemonRow, {
  pokemon: graphql`
    fragment PokemonRow_pokemon on Pokemon {
      id
      name
      number
      imageUrl
      weight
      height
      types
    }
  `,
});
