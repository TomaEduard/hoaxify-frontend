import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
    
    describe('Layout', () => {
        
        it('will be visible when visible property set to true', () => {
            // user queryByTestId because the content will be 
            // dynamic and we can't query based on something visible on page
            const { queryByTestId } = render(<Modal visible={true} />);
            const modelRootDiv = queryByTestId('model-root');
            expect(modelRootDiv).toHaveClass('modal fade d-block show');
            expect(modelRootDiv).toHaveStyle(`background-color: #000000b0`);
        });

        it('displays the title provided as props', () => {
            const { queryByText } = render(<Modal title="Test Title" />);
            expect(queryByText('Test Title')).toBeInTheDocument();
        });

        it('displays the body provided as props', () => {
            const { queryByText } = render(<Modal body="Test Body" />);
            expect(queryByText('Test Body')).toBeInTheDocument();
        });

        it('it displays OK button text provided as props', () => {
            const { queryByText } = render(<Modal okButton="OK" />);
            expect(queryByText('OK')).toBeInTheDocument();
        });

        it('it displays Cancel button text provided as props', () => {
            const { queryByText } = render(<Modal cancelButton="Cancel" />);
            expect(queryByText('Cancel')).toBeInTheDocument();
        });

        it('displays defaults for buttons when corresponding props not provided', () => {
            const { queryByText } = render(<Modal />);
            expect(queryByText('Ok')).toBeInTheDocument();
            expect(queryByText('Cancel')).toBeInTheDocument();

        });

        it('calls callback function provided as props when clicking ok button', () => {
            const mockFn = jest.fn();
            const { queryByText } = render(<Modal onClickOk={mockFn} />);
            fireEvent.click(queryByText('Ok'));
            expect(mockFn).toHaveBeenCalled();
        });

        it('calls callback function provided as props when clicking cancel button', () => {
            const mockFn = jest.fn();
            const { queryByText } = render(<Modal onClickCancel={mockFn} />);
            fireEvent.click(queryByText('Cancel'));
            expect(mockFn).toHaveBeenCalled();
        });
    });
});