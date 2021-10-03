import React from "react";
import { Box, Image, Badge, Flex } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import ClampLines from "react-clamp-lines";

const ImageContainer = styled(Box)`
	transition: all 0.25s ease-in-out;
`;

export const Card = (props: Types.Movie): JSX.Element => {
	return (
		<Flex
			maxW="sm"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			height="100%"
			flexDirection="column"
			margin="auto"
		>
			<ImageContainer
				_hover={{ filter: "blur(0px)" }}
				height="400px"
				filter="blur(8px)"
				overflow="hidden"
			>
				<Image
					objectFit="cover"
					height="100%"
					width="100%"
					src={`https://www.themoviedb.org/t/p/w440_and_h660_face${props.backdrop_path}`}
					alt={props.title}
					loading="lazy"
					fallbackSrc="https://via.placeholder.com/200"
				/>
			</ImageContainer>

			<Box p="6" bg="white" minH="210px">
				<Box d="flex" alignItems="baseline">
					{props.adult && (
						<Badge borderRadius="full" px="2" colorScheme="red">
							ADULT
						</Badge>
					)}
					{props.original_language && (
						<Badge borderRadius="full" px="2" colorScheme="teal">
							{props.original_language}
						</Badge>
					)}
					<Box px="2" as="span" color="gray.600" fontSize="sm">
						{props.release_date}
					</Box>
					<Box
						color="gray.500"
						fontWeight="semibold"
						letterSpacing="wide"
						fontSize="xs"
						textTransform="uppercase"
						ml="2"
					></Box>
				</Box>

				<Box
					mt="1"
					fontWeight="semibold"
					as="h4"
					lineHeight="tight"
					isTruncated
				>
					{props.title}
				</Box>

				<Box as="span" color="gray.600" fontSize="sm" my={5} textAlign="left">
					<ClampLines
						text={props.overview}
						id="really-unique-id"
						lines={3}
						ellipsis="..."
						lessText="Collapse"
						className="custom-class"
						innerElement="p"
					/>
				</Box>

				<Box d="flex" mt="2" alignItems="center" flexWrap="wrap">
					{Array(10)
						.fill("")
						.map((_, i) => (
							<StarIcon
								key={i}
								color={i < props.vote_average ? "teal.500" : "gray.300"}
							/>
						))}
					<Box as="span" ml="2" color="gray.600" fontSize="sm">
						{props.vote_count} votes
					</Box>
				</Box>
			</Box>
		</Flex>
	);
};
