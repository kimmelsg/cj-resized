//Test that children are rendered and that submit works recursively
import React from 'react';
import Media from '../src';
import { mount } from 'enzyme';

let functions = [];
window.addEventListener = (name, func) => functions.push(func);
window.removeEventListener = (name, func) => functions.pop();

let timeout = time => new Promise(resolve => setTimeout(resolve, time));

test('Media is passed in with correct value, and adjusts on resize', async () => {
  window.innerWidth = 768;

  const Component = Media(props =>
    <div>
      {props.media}
    </div>
  )(() => ['small', 'medium', 'large']);

  const wrapper = mount(<Component />);
  expect(wrapper.find('div').props().children).toEqual('medium');

  window.innerWidth = 500;
  functions.forEach(func => func());
  await timeout(500);

  expect(wrapper.find('div').props().children).toEqual('small');
});

test('Media works with custom size object', async () => {
  window.innerWidth = 49;

  const Component = Media(props =>
    <div>
      {props.media}
    </div>
  )(() => ({ '0': 'small', '50': 'medium', 100: 'large' }));

  const wrapper = mount(<Component />);
  expect(wrapper.find('div').props().children).toEqual('small');

  window.innerWidth = 50;
  functions.forEach(func => func());
  await timeout(500);

  expect(wrapper.find('div').props().children).toEqual('medium');
});

test('Event listener is removed on unmount', async () => {
  const Component = Media(props =>
    <div>
      {props.media}
    </div>
  )(() => ({ '0': 'small', '50': 'medium', 100: 'large' }));

  const wrapper = mount(<Component />);

  expect(functions.length).toEqual(4);

  wrapper.unmount();

  expect(functions.length).toEqual(3);
});
