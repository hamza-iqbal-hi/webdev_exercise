import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import store from '../../store'
import { Provider } from 'react-redux';
import Modal from './Modal';
import { createSkillSuccess } from '../SkillsFilter/skillsSlice';


const setup = (props: any) => {
    return (
        <Provider store={store}>
            <Modal {...props} />
        </Provider>
    );
};

describe('Modal', () => {

    const skills = [
        { id: 1, name: 'React' },
        { id: 2, name: 'Redux' },
        { id: 3, name: 'Node.js' },
    ];
    beforeEach(() => {
        store.dispatch(createSkillSuccess(skills[0])) 
        
    });



    it('should open the modal when the Add Skill button is clicked', () => {
        const { getByText, queryByText } = render(
            setup({ id: 1, name: "John Doe" })

        );

        const addSkillButton = getByText('Add Skill');
        fireEvent.click(addSkillButton);

        const modalHeader = queryByText('John Doe');
        expect(modalHeader).toBeInTheDocument();
    });

    it('should close the modal when the close button is clicked', () => {
        const { getByText, queryByText } = render(
            setup({ id: 1, name: "John Doe" })
        );

        const addSkillButton = getByText('Add Skill');
        fireEvent.click(addSkillButton);

        const closeButton = getByText('×');
        fireEvent.click(closeButton);

        const modalHeader = queryByText('John Doe');
        expect(modalHeader).not.toBeInTheDocument();
    });

    it('should select a skill from the list when a skill is selected', async () => {
        const { getByText, getByDisplayValue } = render(
            setup({ id: 1, name: "John Doe" })
        );

        const addSkillButton = getByText('Add Skill');
        fireEvent.click(addSkillButton);
        const select = getByDisplayValue('Select a skill') as any;
        fireEvent.change(select, { target: { value: 'React' } });
        await waitFor(() => {
            expect(select.value).toBe('React');
        });

    });
})
