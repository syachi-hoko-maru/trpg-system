export type Blog = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  andml: string;
};

export const blogJSON = `${process.cwd()}/assets/blog.json`;
export const blogTextDir = `${process.cwd()}/src/bloggene/text`;
export const blogImgDir = `${process.cwd()}/public/blog-image`;
