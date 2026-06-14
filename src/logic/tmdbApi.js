import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mjk5NWFkY2NhOWFlZjc1ZTUwMzgxMWE0ZGY0MDRmNyIsIm5iZiI6MTc4MTM5NTI1NS43MDU5OTk5LCJzdWIiOiI2YTJkZWYzN2M2YmNlNDlmMTU3NTE5MzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.L790jiYExc0Ks7wYZZ3GgOqpq8HZbZ_fcBZQPTzn1eo"
  }
});

export default tmdb