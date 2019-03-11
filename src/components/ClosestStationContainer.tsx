import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { urlPlacePhotos } from '../constants';

export interface Props {
  photoReference: () => void;
  children: (url: string | null) => Component;
}

export interface State {
  url: string | null;
}

export default class ClosestStationContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      url: null,
    };
  }

  public componentDidMount() {
    const url = urlPlacePhotos(this.props.photoReference);

    this.setState({ url });
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props !== prevProps) {
      const url = urlPlacePhotos(this.props.photoReference);

      this.setState({ url });
    }
  }

  public render() {
    const { children } = this.props;
    const { url } = this.state;
    return children(url);
  }
}
