/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
//Unit Test Code
import { Block } from '@components';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Block component', () => {
  it('should render with the correct layout styles', () => {
    const { getByTestId } = render(
      <Block flex={1} row wrap style={{ backgroundColor: 'red' }} data-testid="block">
        <p>Hello World</p>
      </Block>
    );
    const block = getByTestId('block');
    expect(block).toHaveStyle('flex: 1');
    expect(block).toHaveStyle('flex-direction: row');
    expect(block).toHaveStyle('flex-wrap: wrap');
    expect(block).toHaveStyle('background-color: red');
  });

  it('should render with the correct size styles', () => {
    const { getByTestId } = render(
      <Block
        padding={10}
        margin={5}
        paddingTop={15}
        paddingRight={20}
        style={{ backgroundColor: 'red' }}
        data-testid="block"
      >
        <p>Hello World</p>
      </Block>
    );
    const block = getByTestId('block');
    expect(block).toHaveStyle('padding: 10px');
    expect(block).toHaveStyle('margin: 5px');
    expect(block).toHaveStyle('padding-top: 15px');
    expect(block).toHaveStyle('padding-right: 20px');
    expect(block).toHaveStyle('background-color: red');
  });

  it('should render with the correct color styles', () => {
    const { getByTestId } = render(
      <Block
        backgroundColor="red"
        borderColor="green"
        color="blue"
        opacity={0.5}
        style={{ backgroundColor: 'yellow' }}
        data-testid="block"
      >
        <p>Hello World</p>
      </Block>
    );
    const block = getByTestId('block');
    expect(block).toHaveStyle('background-color: red');
    expect(block).toHaveStyle('border-color: green');
    expect(block).toHaveStyle('color: blue');
    expect(block).toHaveStyle('opacity: 0.5');
    expect(block).toHaveStyle('background-color: yellow');
  });

  it('should render with the correct shadow styles', () => {
    const { getByTestId } = render(
      <Block shadow1 style={{ backgroundColor: 'red' }} data-testid="block">
        <p>Hello World</p>
      </Block>
    );
    const block = getByTestId('block');
    expect(block).toHaveStyle('box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1)');
    expect(block).toHaveStyle('background-color: red');
  });
});
