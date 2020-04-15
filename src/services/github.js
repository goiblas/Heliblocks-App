export const getUserUrl = async id => {
  try {
    const { html_url } = await fetch(
      `https://api.github.com/user/${id}`
    ).then(res => res.json());
    return html_url;
  } catch (error) {
    return null;
  }
};
