import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Spacer from '../../Spacer';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			{ children }
		</>
	);
};

export default Layout;
