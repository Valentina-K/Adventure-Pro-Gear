import Image from 'next/image';
import React from 'react';
import clsx from 'clsx';
import styles from './OrderDetail.module.css'

function OrderStatusPoint({ className = '' }) {
    const classPoint = clsx(className, styles.point)
    return (
        <div className={classPoint}>
            <Image src="/icons/check.svg" width={24} height={24} alt="profile photo" />
        </div>
    )
}

export default OrderStatusPoint
