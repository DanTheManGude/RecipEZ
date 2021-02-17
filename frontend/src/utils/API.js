import axios from "axios";

const port = 3030;

export default axios.create({
  baseURL: `//${window.location.hostname}:${port}/api`,
});
