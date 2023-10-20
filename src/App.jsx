import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import PokemonCard from "./components/PokemonCard";
import useSWR, { fetcher } from "./swr";
import { chunkArray } from "./util";
import pokeball from "/pokeball.svg";

const LIMIT = 150;
const POKE_API = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}`;

function App() {
	const { data, error, isLoading } = useSWR(POKE_API, fetcher);
	const [searchTerms, setSearchTerms] = useState("");

	// TODO: Handle error and loading states
	if (error || isLoading) return;

	function includesSearchTerms({ name }) {
		return name.toLowerCase().includes(searchTerms.toLowerCase());
	}

	const filtered = data.results.filter(includesSearchTerms);
	const chunks = chunkArray(filtered, 6);

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

			<Container className="mt-4">
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
									<PokemonCard url={pokemon.url} />
								</Col>
							))}
						</Row>
					))}
				</div>
			</Container>
		</>
	);
}

export default App;
