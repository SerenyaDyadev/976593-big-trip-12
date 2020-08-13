export const render = (container, template, place) => {
  return container.insertAdjacentHTML(place, template);
};
