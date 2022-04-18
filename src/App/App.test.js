import App from './App';
import { screen, render } from '@testing-library/react';

describe('Should render App properly', () => {
    it ('render App', async () => {
        render(<App />);
        expect(await screen.findByText('Hello X-Force new text hehe')).toBeVisible();
    });
})