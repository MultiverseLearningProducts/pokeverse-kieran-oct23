import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import pokeball from "/pokeball.svg";

function Wrapper({ children }) {
	return (
		<>
			<Navbar variant="dark" bg="secondary">
				<Container>
					<Navbar.Brand href="#">
						<img
							alt=""
							src={pokeball}
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{" "}
						Pokéverse
					</Navbar.Brand>
				</Container>
			</Navbar>

			<Container className="mt-4">{children}</Container>
		</>
	);
}

Wrapper.propTypes = {
	children: PropTypes.node,
};

export default Wrapper;
