import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
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

	// TODO: Handle error and loading states
	if (error || isLoading) return;

	const chunks = chunkArray(data.results, 6);

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

			<Container>
				{chunks.map((chunk, index) => (
					<Row key={index} className="my-4">
						{chunk.map(pokemon => (
							<Col key={pokemon.name}>
								<PokemonCard url={pokemon.url} />
							</Col>
						))}
					</Row>
				))}
			</Container>
		</>
	);
}

export default App;
