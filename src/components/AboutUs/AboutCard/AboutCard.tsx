import Image from 'next/image';
import styles from './AboutCard.module.css';

import { useTranslations } from 'next-intl';

const LIST = [
  {
    key: '1',
    image: '/images/about/about1.png',
    width: 144,
    height: 145,
    hasTitle: false,
  },
  {
    key: '2',
    image: '/images/about/about2.png',
    width: 174,
    height: 130,
  },
  {
    key: '3',
    image: '/images/about/about3.png',
    width: 168,
    height: 130,
  },
];

function AboutCard() {
  const t = useTranslations('aboutPage.advantages.sectionFeatures');

  return (
    <ul className={styles.list_card}>
      {LIST.map(({ key, image, width, height }) => (
        <li className={styles.item_card} key={key}>
          <Image src={image} alt={key} width={width} height={height} />
          <h3 className={styles.item_card_title}>{t(`${key}.title`)}</h3>
          <p className={styles.item_card_description}>{t(`${key}.desc`)}</p>
        </li>
      ))}
    </ul>
  );
}

export default AboutCard;
