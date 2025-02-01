// Create dynamic select options for game platforms
export default function createSelectOptions(object, selected) {
  const tuples = Object.entries(object);

  return tuples.map(([value, content]) => {
    if (value == selected) {
      return { value, content, selected: true };
    } else {
      return { value, content, selected: false };
    }
  });
}
