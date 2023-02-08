import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SkillChip from './index';
import store from '../../store'
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

describe('SkillChip component', () => {
    it('should render the children and delete button', () => {
        const onDelete = jest.fn();
        const { getByText } = render(
            <Provider store={store}>
                <SkillChip onDelete={onDelete}>Test Skill</SkillChip>
            </Provider>
        );
        const deleteButton = getByText('×');
        expect(deleteButton).toBeInTheDocument();
    });

    it('should call onDelete when delete button is clicked', () => {
        const onDelete = jest.fn();
        const { getByText } = render(<SkillChip onDelete={onDelete}>Test Skill</SkillChip>);
        const deleteButton = getByText('×');
        fireEvent.click(deleteButton);
        expect(onDelete).toHaveBeenCalled();
    });
});
