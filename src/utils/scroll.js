export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    const url = id === 'hero' ? '/' : `/${id}`;
    window.history.pushState({}, '', url);
  }
};
