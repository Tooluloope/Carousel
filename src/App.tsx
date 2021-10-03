import React from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "./components/carousel";
import { Box } from "@chakra-ui/layout";

function App() {
	return (
		<Box className="App" h="100vh" w="100vw" overflow="hidden">
			<Carousel />
		</Box>
	);
}

export default App;
