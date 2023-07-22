import {Fragment} from 'react'
import Header from './Header'
import NavBar from './NavBar'
import Banner from './Banner'

export default function Layout({children}) {
	return (
		<Fragment>
			<Header/>
			<NavBar/>
			<Banner/>
			<main>
				{children}
			</main>
		</Fragment>
	)
}