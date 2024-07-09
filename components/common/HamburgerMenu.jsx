'use client'
import React from 'react';
import styles from './styles/HamburgerMenu.module.css'; // นำเข้าไฟล์ CSS Module

export default function HamburgerMenu({ isOpen, toggle }) {
  return (
    <div className={styles.hamburgerContainer} onClick={toggle}>
      <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </div>
  );
}
