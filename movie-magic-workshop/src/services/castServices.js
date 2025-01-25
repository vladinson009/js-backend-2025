import Cast from '../models/Cast.js';

function create(data) {
  return Cast.create(data);
}

export default { create };
