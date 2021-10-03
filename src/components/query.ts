export const fetchMovies = async (): Promise<Types.Movie[]> => {
    const myHeaders = new Headers()
	myHeaders.append('Content-Type', 'application/json')

	const requestOptions: RequestInit = {
		method: 'GET',
		redirect: 'follow',
		headers: myHeaders,
	}
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=40315881b5af1985a7ceba1f41b45973&language=en-US", requestOptions)
	if (response.ok) {
        const data: Types.Api = await response.json()
		return data.results
	} else if ([401].includes(response.status)) {
		throw Error('Unauthorized')
	} else if ([400].includes(response.status)) {
		throw Error('Bad Request')
	} else {
		throw Error('Oops, Try again Later')
	}
}