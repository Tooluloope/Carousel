import { useQuery } from "react-query";

import Slider, { Settings } from "react-slick";
import {
	CircularProgress,
	Box,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Button,
	useMediaQuery,
} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

import { Card } from "./card";
import { fetchMovies } from "./query";
import { queryClient } from "..";

export const Carousel = () => {
	const { data, isLoading, isError, error } = useQuery(
		"movieData",
		fetchMovies
	);
	const [isLessThan480] = useMediaQuery("(max-width: 480px)");

	const handleClick = async () => {
		console.log("click");
		await queryClient.refetchQueries(["movieData"], { active: true });
	};

	const settings: Settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		initialSlide: 0,
		lazyLoad: "progressive",
		vertical: isLessThan480,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 950,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 380,
				settings: {
					slidesToShow: 1,
				},
			},
		],
		autoplay: true,
		autoplaySpeed: 2000,
		cssEase: "linear",
		rtl: !isLessThan480,
	};
	fetchMovies();
	if (isLoading) {
		return (
			<Box
				h="100vh"
				w="100vw"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress isIndeterminate size="120px" />
			</Box>
		);
	}
	if (isError) {
		return (
			<Box h="100vh" w="100vw">
				<Alert status="error">
					<AlertIcon />
					<AlertTitle mr={2}>Error Loading Movie</AlertTitle>
					<AlertDescription>{error as string}</AlertDescription>
					<Button
						rightIcon={<RepeatIcon />}
						colorScheme="red"
						variant="outline"
						Call
						us
						position="absolute"
						right="8px"
						onClick={handleClick}
					>
						Retry
					</Button>
				</Alert>
			</Box>
		);
	}
	return (
		<Box>
			<Slider {...settings}>
				{data &&
					data.map(movie => (
						<Box mx={{ md: "5" }} my="5" key={movie.id}>
							<Card {...movie} />
						</Box>
					))}
			</Slider>
		</Box>
	);
};
