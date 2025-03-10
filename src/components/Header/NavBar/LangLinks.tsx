import React, { useState } from 'react';
import Select, { components } from 'react-select';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import styles from '../Header.module.css';

const CustomSingleValue = (props: any) => (
  <components.SingleValue {...props}>
    {props.children}
    <Image
      src="/icons/World.svg"
      alt="World icon"
      width={22}
      height={22}
      className={styles.globusIcon}
    />
  </components.SingleValue>
);

const LangLinks = () => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();

  const [isPending, startTransition] = React.useTransition();
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (selectedOption: any) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: selectedOption.value }
      );
    });
  };

  const options = [
    { value: 'uk', label: 'Українська' },
    { value: 'en', label: 'English' },
  ];

  return (
    <div className={styles.langSelect}>
      {isMounted && (
        <Select
          options={options}
          isSearchable={false}
          defaultValue={options.find(option => option.value === locale)}
          isDisabled={isPending}
          onChange={handleChange}
          components={{ SingleValue: CustomSingleValue }}
          styles={{
            container: (baseStyles, state) => ({
              ...baseStyles,
              color: state.isFocused ? '#1e5f72' : 'white',
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderRadius: 0,
              border: 'none',
              backgroundColor: '#152a38',
              boxShadow: 'none',
              minHeight: 40,
            }),
            valueContainer: (baseStyles, state) => ({
              ...baseStyles,
              padding: 0,
              cursor: 'pointer',
            }),
            singleValue: (baseStyles, state) => ({
              ...baseStyles,
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              marginLeft: 'auto',
              backgroundColor: '#152a38',
            }),
            indicatorsContainer: baseStyles => ({
              ...baseStyles,
              display: 'none',
            }),
          }}
        />
      )}
    </div>
  );
};

export default LangLinks;
