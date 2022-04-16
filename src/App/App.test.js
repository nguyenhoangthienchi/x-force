import App from './App';
import {mount} from 'enzyme';

describe('Should render App properly', () => {
    it ('render App', () => {
        const rendered = mount(<App />);
    });
})