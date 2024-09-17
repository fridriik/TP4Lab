"use client";
import { useState, useEffect } from 'react';
import styles from './Home.module.css';

const Home = () => {
  const [visibleText, setVisibleText] = useState([[], []]);
  const part1 = "BIENVENIDO A LA PLATAFORMA";
  const part2 = "GESTIÓN DE EMPLEADOS";

  useEffect(() => {
    const animateText = () => {
      const splitText = (text) => {
        return text.split(/(\s+)/); 
      };

      const wordsPart1 = splitText(part1);
      const wordsPart2 = splitText(part2);

      setVisibleText([wordsPart1, wordsPart2]);
    };

    const timer = setTimeout(() => {
      animateText();
    }, 300); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.animatedText}>
        {visibleText[0].map((char, index) => (
          <span key={`part1-${index}`} className={styles.word} style={{ animationDelay: `${index * 300}ms` }}>
            {char}
          </span>
        ))}
        <br />
        {visibleText[1].map((char, index) => (
          <span key={`part2-${index}`} className={styles.word} style={{ animationDelay: `${(index + visibleText[0].length) * 300 + 300}ms` }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Home;
