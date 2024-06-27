export const postsLoader = async () => {
  try {
    const response = await fetch("https://codebuddy.review/posts");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
