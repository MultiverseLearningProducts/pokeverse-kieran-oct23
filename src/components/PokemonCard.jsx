import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

function PokemonCard(props) {
	return (
		<Card className="align-items-center">
			<Card.Img
				variant="top"
				className="w-auto"
				src={props.sprites.front_default}
				alt="" // hide from a11y tree because there is no description
				width="96"
				height="96"
			/>
			<Card.Body>
				<Card.Title className="text-capitalize">
					{props.name}
				</Card.Title>
			</Card.Body>
		</Card>
	);
}

PokemonCard.propTypes = {
	name: PropTypes.string.isRequired,
	sprites: PropTypes.shape({
		front_default: PropTypes.string.isRequired,
	}).isRequired,
};

export default PokemonCard;
