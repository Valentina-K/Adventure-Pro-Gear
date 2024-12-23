import Image from 'next/image';
import about1 from '@/../public/images/about/about1.png';
import about2 from '@/../public/images/about/about2.png';
import about3 from '@/../public/images/about/about3.png';
import styles from './AboutCard.module.css';

function AboutCard() {
  return (
    <ul className={styles.list_card}>
      <li className={styles.item_card}>
        <Image src={about1} alt="Якість" width={144} height={145} />
        <h3 className={styles.item_card_title}>Якість без компромісів</h3>
        <p className={styles.item_card_description}>
          Ми обираємо тільки високоякісні матеріали та продукцію, яка витримає випробування часом і
          екстремальними умовами.
        </p>
      </li>
      <li className={styles.item_card}>
        <Image src={about2} alt="вибір" width={174} height={130} />
        <h3 className={styles.item_card_title}>Широкий вибір</h3>
        <p className={styles.item_card_description}>
          У нас ви знайдете все необхідне для будь-якого типу подорожі - від легкого кемпінгу до
          екстремального гірського виходу.
        </p>
      </li>
      <li className={styles.item_card}>
        <Image src={about3} alt="Клієнтоорієнтованість" width={168} height={130} />
        <h3 className={styles.item_card_title}>Клієнтоорієнтованість</h3>
        <p className={styles.item_card_description}>
          Ваш комфорт та задоволення - наш пріоритет. Ми працюємо для вас і завжди готові надати
          консультації та підтримку.
        </p>
      </li>
    </ul>
  );
}

export default AboutCard;
