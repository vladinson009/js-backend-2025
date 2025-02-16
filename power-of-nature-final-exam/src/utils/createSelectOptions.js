const object = {
  Flood: 'Flood',
  Earthquake: 'Earthquake',
  Hurricane: 'Hurricane',
  Drought: 'Drought',
  Tsunami: 'Tsunami',
  Other: 'Other',
};
// Create dynamic select options for game platforms
export default function createSelectOptions(selected) {
  const tuples = Object.entries(object);

  return tuples.map(([value, content]) => {
    if (value == selected) {
      return { value, content, selected: true };
    } else {
      return { value, content, selected: false };
    }
  });
}
/**
 *   <option value="Wildfire">Wildfire</option>
                <option value="Flood">Flood</option>
                <option value="Earthquake">Earthquake</option>
                <option value="Hurricane">Hurricane</option>
                <option value="Drought">Drought</option>
                <option value="Tsunami">Tsunami</option>
                <option value="Other">Other</option>
 */
