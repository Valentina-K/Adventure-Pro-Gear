import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './AboutListInfo.module.css';

const SECTIONS = [
  {
    key: '1',
    image: '/images/about/aboutTravel.png',
    width: 480,
    height: 320,
    hasTitle: false,
  },
  {
    key: '2',
    image: '/images/about/aboutTeam.png',
    width: 543,
    height: 280,
    hasTitle: true,
  },
];

function AboutListInfo() {
  const t = useTranslations('aboutPage.advantages.sectionList');

  return (
    <ul className={styles.list}>
      {SECTIONS.map(({ key, image, width, height, hasTitle }) => (
        <li className={styles.item} key={key}>
          <Image src={image} alt={key} width={width} height={height} className={styles.item_img} />
          <div>
            {hasTitle && <h2 className={styles.item_title}>{t(`${key}.title`)}</h2>}
            <p className={styles.item_text}>{t(`${key}.desc`)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default AboutListInfo;
