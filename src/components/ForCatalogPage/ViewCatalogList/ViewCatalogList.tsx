import Image from 'next/image';
import grid from '../../../../public/icons/gridView.svg';
import table from '../../../../public/icons/tableView.svg';
import styles from './ViewCatalogList.module.css';

const ViewCatalogList = ({
  setGridActive,
  gridActive,
}: {
  gridActive: {
    table: boolean;
    grid: boolean;
  };
  setGridActive: any;
}) => {
  const handleInputClick = (element: string) => {
    if (element === 'table') {
      setGridActive({
        table: true,
        grid: false,
      });
    } else {
      setGridActive({
        table: false,
        grid: true,
      });
    }
  };
  return (
    <>
      <li
        className={`${styles.input_item} ${gridActive.table ? styles.input_item_active : ''}`}
        onClick={() => handleInputClick('table')}
        aria-hidden="true"
      >
        <Image src={table} alt="icon-grid" width={24} height={24} className={styles.input_img} />
      </li>
      <li
        className={`${styles.input_item} ${gridActive.grid ? styles.input_item_active : ''}`}
        onClick={() => handleInputClick('grid')}
        aria-hidden="true"
      >
        <Image src={grid} alt="icon-grid" width={24} height={24} className={styles.input_img} />
      </li>
    </>
  );
};

export default ViewCatalogList;
