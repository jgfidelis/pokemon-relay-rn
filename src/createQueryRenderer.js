// @flow
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { QueryRenderer } from 'react-relay';

import type { GraphQLTaggedNode, Variables } from 'react-relay';

// import ErrorView from '../components/common/ErrorView';
// import LoadingView from '../components/common/LoadingView';

import Environment from './Environment';

type Config = {
  query: ?GraphQLTaggedNode,
  queriesParams?: ?(props: Object) => Object,
  variables?: Variables,
  hideSplash?: boolean,
};

export default function createQueryRenderer(
  FragmentComponent: React.ComponentType<*>,
  Component: React.ComponentType<*>,
  config: Config,
): React.ComponentType<*> {
  const { query, queriesParams, hideSplash } = config;

  class QueryRendererWrapper extends React.Component<{}> {
    render() {
      const variables = queriesParams ? queriesParams(this.props) : config.variables;

      return (
        <QueryRenderer
          environment={Environment}
          query={query}
          variables={variables}
          render={({ error, props, retry }) => {
            // if (error) {
            //   return <ErrorView error={error} retry={retry} hideSplash={hideSplash} />;
            // }
            console.log('teste --- error: ', error);
            console.log('teste query --- props: ', props);

            if (props) {
              return <FragmentComponent {...this.props} query={props} />;
            }

            return null;

            // return <LoadingView />;
          }}
        />
      );
    }
  }

  return hoistStatics(QueryRendererWrapper, Component);
}
