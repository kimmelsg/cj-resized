## React Resized
[![CircleCI](https://circleci.com/gh/navjobs/resized.svg?style=svg)](https://circleci.com/gh/navjobs/resized)
[![Coverage Status](https://coveralls.io/repos/github/navjobs/resized/badge.svg?branch=master&t=VOxE00)](https://coveralls.io/github/navjobs/resized?branch=master)

## Install

```js
npm install react-resized --save
```

## Usage

```js
import Media from 'react-resized'

const Test = props => (
  <img src={media} />
)

export default Media(Test)(
  props => [
    props.small,
    props.medium,
    props.large
  ]
)
```

The correct size image will be loaded according to the browser size. Default widths are: `0, 767, 1023`. The size closest to the current browser width, that isn't greater than the current width, will be returned. You can optionally pass in custom sizes as the second parameter:

```js
Media(Test)(
  props => ({
    '0': props.small,
    '500': props.medium,
    '1000': props.large
  })
)
```

That's it! 
