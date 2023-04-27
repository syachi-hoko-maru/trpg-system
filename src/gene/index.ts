export type Blog = {
  id: string;
  title: string;
  date: string;
  tags: string[];
  andml: string;
};

export const blogJSON = `${process.cwd()}/assets/blog.json`;
export const scenarioJson = `${process.cwd()}/assets/scenario.json`;

export const blogTextDir = `${process.cwd()}/src/gene/text`;
export const blogImgDir = `${process.cwd()}/public/image/blog-image`;
