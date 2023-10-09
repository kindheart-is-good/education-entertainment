import axios from "axios";

const searchImages = async (term) => {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
        headers: {
            Authorization: 'Client-ID _aBWLc8m0wUX7r84nYBNb8F02pwiF5P4N-suEzihVZo',
        },
        params: {
            query: term,
        }
    })

    //console.log(response)

    return response.data.results;
}

export default searchImages;
