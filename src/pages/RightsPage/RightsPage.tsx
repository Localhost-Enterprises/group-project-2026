import styles from './RightsPage.module.scss';
import { Typography } from '@/components/atoms/Typography';
import ReactMarkdown from 'react-markdown';
import rightsText from './rights.md?raw';

export const RightsPage = () => {
  const currentYear = new Date().getFullYear();
  const processedText = rightsText.replace('{{year}}', currentYear.toString());

  return (
    <div className={styles.container}>
      <Typography
        variant="h3"
        className={styles.title}
      >
        Rights
      </Typography>
      <Typography
        variant="bodytext"
        className={styles.text}
      >
        <ReactMarkdown>{processedText}</ReactMarkdown>
      </Typography>
    </div>
  );
};
