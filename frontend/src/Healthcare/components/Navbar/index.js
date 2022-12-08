import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from './NavbarElements';
import "./main.css";


const Navbar = () => {
	return (
		<>
			<Nav>
				<Bars />

				<NavMenu>
					<NavLink to='/about'>
						About Us
					</NavLink>
					<NavLink to='/checkups'>
						General Info		</NavLink>
					<NavLink to='/book'>
						Appointment Booking
					</NavLink>
					<NavLink to='/faq'>
						FAQ

					</NavLink>
					<NavLink to='/contactUs'>
						Contact
					</NavLink>
					<NavLink to='/details'>
						Policy Details
					</NavLink>
				</NavMenu>
				{/* <NavBtn>
					<NavBtnLink to='/feedBack1' className="navLinkSub">Premium Subscription</NavBtnLink>
				</NavBtn> */}
			</Nav>
		</>
	);
};

export default Navbar;
