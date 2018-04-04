import React from 'react';

const defaultKeys = ['0', '767', '1023'];

export default component => values =>
  class Media extends React.Component {
    constructor() {
      super();
      this.state = { width: window.innerWidth };
      this.updateWidth = this.updateWidth.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateWidth);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWidth);
    }

    updateWidth() {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(
        () => this.setState({ width: window.innerWidth }),
        50
      );
    }

    getValue() {
      let { width } = this.state;
      let realValues = values(this.props);

      if (Array.isArray(realValues)) {
        realValues = realValues.reduce(
          (acc, value, index) => ({ ...acc, [defaultKeys[index]]: value }),
          {}
        );
      }

      return realValues[
        Object.keys(realValues)
          .map(value => parseInt(value, 10))
          .sort((a, b) => Math.abs(width - a) - Math.abs(width - b))
          .sort(a => width < a)[0]
      ];
    }

    render() {
      return React.createElement(component, {
        ...this.props,
        media: this.getValue(),
      });
    }
  };
