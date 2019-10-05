import React from 'react';
import {FormattedPlural, FormattedNumber} from 'react-intl';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
  },
  wrapper: {
    flex: 1,
    margin: 0,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Content = ({nights, guests, price}) => (
  <View style={styles.wrapper}>
    <Text style={styles.text} testID="Regular.Text">
      Regular Text
    </Text>
    <Text style={styles.text} testID="Intl.Text">
      {`${nights} `}
      <FormattedPlural one="Night" other="Nights" value={nights} />
      {` - ${guests} `}
      <FormattedPlural one="Adult" other="Adults" value={guests} />
    </Text>
    <Text style={styles.text} testID="Other.Intl.Text">
      <FormattedNumber value={price} />
    </Text>
  </View>
);

export default Content;
