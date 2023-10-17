import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import useSWR, { fetcher } from "../swr";

function PokemonCard({ url }) {
	const { data, error, isLoading } = useSWR(url, fetcher);

	// TODO: Handle error and loading states
	if (error || isLoading) return;

	return (
		<Card className="align-items-center">
			<Card.Img
				variant="top"
				className="w-auto"
				src={data.sprites.front_default}
				alt="" // hides from a11y tree for now
				width="96"
				height="96"
			/>
			<Card.Body>
				<Card.Title className="text-capitalize">{data.name}</Card.Title>
			</Card.Body>
		</Card>
	);
}

PokemonCard.propTypes = {
	url: PropTypes.string.isRequired,
};

export default PokemonCard;
