import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom/extend-expect';
describe('Button component', () => {
    it('renders the children prop as text', () => {
        const { getByText } = render(
            <Button onClick={function (): void {

            }}>
                Click me</Button>);
        expect(getByText('Click me')).toBeInTheDocument();
    });

    it('calls the onClick prop when clicked', () => {
        const onClick = jest.fn();
        const { getByText } = render(<Button onClick={onClick}>Click me</Button>);
        fireEvent.click(getByText('Click me'));
        expect(onClick).toHaveBeenCalled();
    });

    it('renders with the ghost class when variant prop is set to ghost', () => {
        const { getByText } = render(<Button onClick={() => true} variant="ghost">Click me</Button>);
        expect(getByText('Click me')).toHaveAttribute('class', 'button button-ghost');
    });
});