import Image from 'next/image';
import aboutTravel from '@/../public/images/about/aboutTravel.png';
import aboutTeam from '@/../public/images/about/aboutTeam.png';
import styles from './AboutListInfo.module.css';

function AboutListInfo() {
  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <Image
          src={aboutTravel}
          alt="travel"
          width={480}
          height={320}
          className={styles.item_img}
        />
        <p className={styles.item_text}>
          Adventure Pro Gear - ваш новий магазин для пригод та подорожей. Наші досягнення - це
          результат старанної роботи та зосередженості на якості. Ми горді нашими здобутками, які
          свідчать про нашу відданість вашим потребам. Нова надійна якість, нові пригоди, нові
          можливості - все це чекає на вас в Adventure Pro Gear. Приєднуйтеся до нашої спільноти та
          дозвольте нам зробити ваші мрії про пригоди реальністю.
        </p>
      </li>
      <li className={styles.item}>
        <Image src={aboutTeam} alt="team" width={543} height={280} className={styles.item_img} />
        <div>
          <h2 className={styles.item_title}>Спільнота Adventure Pro Gear</h2>
          <p className={styles.item_text}>
            Приєднуйтесь до спільноти Adventure Pro Gear наших ентузіастів та діліться своїми
            пригодами з нами! Ми переконані, що кожна історія нашого клієнта - це новий виклик для
            нас розвиватися та покращувати свою продукцію.
          </p>
        </div>
      </li>
    </ul>
  );
}

export default AboutListInfo;
