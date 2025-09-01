import api from "../api";


const getDiagram = async () => {
    const response = await api.get('/tree_diagram/?sort_by=_id&sort_type=asc&page=1&per_page=10');
    return response.data;
}

export default getDiagram;