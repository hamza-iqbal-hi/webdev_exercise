import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SkillsDropdown from './SkillsFilter';
import '@testing-library/jest-dom/extend-expect';
import store from '../../store'
import { Provider } from 'react-redux';


const setup = (props: any) => {
    return (
        <Provider store={store}>
            <SkillsDropdown {...props} />
        </Provider>
    );
};
describe('SkillsFilter', () => {
    it('renders a select element and a filter button', () => {
        const skills = [
            { id: 1, name: 'JavaScript' },
            { id: 2, name: 'React' },
        ];
        const { getByText } = render(
            setup({ skills: skills })
        );
        expect(getByText('All Skills')).toBeInTheDocument();

    });


    it('displays all skills in the select element', () => {
        const skills = [
            { id: 1, name: 'JavaScript' },
            { id: 2, name: 'React' },
        ];
        const { getByTestId } = render(
            setup({ skills: skills })
        );

        const select = getByTestId('skills-select') as any;

        expect(select.options[0].value).toBe('');
        expect(select.options[0].text).toBe('All Skills');
        expect(select.options[1].value).toBe('1');
        expect(select.options[1].text).toBe('JavaScript');
        expect(select.options[2].value).toBe('2');
        expect(select.options[2].text).toBe('React');
    });
    it('calls onFilter when the filter button is clicked', () => {
        const skills = [
            { id: 1, name: 'JavaScript' },
            { id: 2, name: 'React' },
        ];

        const { getByTestId, getByText } = render(
            setup({ skills: skills })
        );

        const select = getByTestId('skills-select') as any;
        select.value = '1';

        const filterButton = getByText('Filter');
        fireEvent.click(filterButton);

        const state = store.getState();
        setTimeout(() => {
            expect(state.skills.selectedSkillId).toBe(1);
        }, 300);

    });

});

