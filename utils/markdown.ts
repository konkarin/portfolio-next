import merge from "deepmerge";
import { defaultSchema } from "hast-util-sanitize";
import { remark } from "remark";
import html from "remark-html";
import recommended from "remark-preset-lint-recommended";
import rehypeHighlight from "rehype-highlight";

const schema = merge(defaultSchema, { attributes: { "*": ["className"] } });

export const convertMarkdownTextToHTML = async (text: string) => {
  const hast = await remark()
    .use(recommended)
    .use(html, { sanitize: schema })
    .use(rehypeHighlight)
    .process(text);

  return hast.toString();
};
