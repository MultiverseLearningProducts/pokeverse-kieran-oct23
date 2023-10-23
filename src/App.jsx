import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import PokemonCard from "./components/PokemonCard";
import Wrapper from "./components/Wrapper";
import * as util from "./util";

const LIMIT = 151;
const POKE_API = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`;

function App() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerms, setSearchTerms] = useState("");

	useEffect(() => {
		async function getData(url) {
			try {
				const { results: data } = await util.getData(url);
				const promises = data.map(({ url }) => util.getData(url));
				const results = await Promise.allSettled(promises);
				const fulfilled = results.filter(
					({ status }) => status === "fulfilled"
				);

				if (!fulfilled.length) {
					throw new Error("None of the requests succeeded.");
				}

				const pokemon = fulfilled.map(({ value }) => value);
				setData(pokemon);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		}

		getData(POKE_API);
	}, []);

	if (error) {
		// Deliberately avoiding the <Alert> component because I don't need the
		// ARIA alert role.
		console.log(error);
		return (
			<Wrapper>
				<Card bg="danger-subtle" border="danger-subtle">
					<Card.Body className="text-danger-emphasis">
						<p className="mb-0">
							<span className="fw-bold">Error!</span> There was a
							problem fetching the Pokémon data.
						</p>
					</Card.Body>
				</Card>
			</Wrapper>
		);
	}

	if (isLoading) {
		return (
			<Wrapper>
				<div className="text-center">
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			</Wrapper>
		);
	}

	function includesSearchTerms({ name }) {
		return name.toLowerCase().includes(searchTerms.toLowerCase());
	}

	const filtered = data.filter(includesSearchTerms);
	const chunks = util.chunkArray(filtered, 6);

	return (
		<Wrapper>
			<Form role="search" className="col-2 mx-auto">
				<Form.Control
					type="search"
					aria-label="Search"
					placeholder="Search..."
					value={searchTerms}
					onChange={e => void setSearchTerms(e.target.value)}
				/>
			</Form>

			<div>
				{chunks.map((chunk, index) => (
					<Row key={index} className="my-4">
						{chunk.map(pokemon => (
							<Col key={pokemon.name}>
								<PokemonCard {...pokemon} />
							</Col>
						))}
					</Row>
				))}
			</div>
		</Wrapper>
	);
}

export default App;
