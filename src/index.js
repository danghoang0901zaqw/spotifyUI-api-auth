import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '~/App';
import { StateProvider } from '~/utils/StateProvider';
import reducer, { initialState } from '~/utils/reducer';
import GlobalStyles from '~/components/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <StateProvider initialState={initialState} reducer={reducer}>
                <App />
            </StateProvider>
        </GlobalStyles>
    </React.StrictMode>,
);
