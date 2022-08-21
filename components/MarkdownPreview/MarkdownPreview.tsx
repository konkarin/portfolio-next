import styles from "./MarkdownPreview.module.scss";

type Props = {
  htmlText: string;
};

export const MarkdownPreview = ({ htmlText }: Props) => {
  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{
        __html: htmlText,
      }}
    />
  );
};
