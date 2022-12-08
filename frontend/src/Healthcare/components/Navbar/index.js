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
					<NavLink to='/about' activestyle>
						About Us
					</NavLink>
					<NavLink to='/checkups' activestyle>
						General Info		</NavLink>
					<NavLink to='/book' activestyle>
						Appointment Booking
					</NavLink>
					<NavLink to='/faq' activestyle>
						FAQ

					</NavLink>
					<NavLink to='/contactUs' activestyle>
						Contact
					</NavLink>
					<NavLink to='/details' activestyle>
						Policy Details
					</NavLink>
				</NavMenu>
				<NavBtn>
					<NavBtnLink to='/feedBack1' className="navLinkSub">Premium Subscription</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;
