import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import xLg from "../assets/x-lg.svg";
import useSWR, { fetcher } from "../swr";

function PokemonCard({ url }) {
	const { data, error, isLoading } = useSWR(url, fetcher);

	if (error) {
		return (
			<Card className="align-items-center">
				<Card.Body>
					<Card.Img src={xLg} alt="Error" width="96" height="96" />
				</Card.Body>
			</Card>
		);
	}

	if (isLoading) {
		return (
			<Card className="align-items-center">
				<Card.Body>
					<Spinner animation="border">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</Card.Body>
			</Card>
		);
	}

	return (
		<Card className="align-items-center">
			<Card.Img
				variant="top"
				className="w-auto"
				src={data.sprites.front_default}
				alt="" // hide from a11y tree because there is no description
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
