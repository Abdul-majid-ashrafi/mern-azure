import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import "react-app-polyfill/stable";
import 'fast-text-encoding/text';

import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './routers';
import store from './store';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { Auth0Provider } from './contexts/auth0-context';

ReactDOM.render(
	<Provider store={store}>
		<Auth0Provider>
			<Routing />
		</Auth0Provider>
	</Provider>,
	document.getElementById('root')
);
