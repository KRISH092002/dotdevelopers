import { useEffect, useState } from 'react';
import useIntersectionObserver from './intersectionObserver';
import '../../../../css/common/typeWritterEffect.css';

const TypeWritter = ({ string , classArr}) => {
  const [str, typeWrite] = useState(string[0]);
  let strIndex = str.length  == 0 ? 0 : str.length-1;
  let [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,

  })

  useEffect(() => {
    if (!isIntersecting) {
      return;
    }
    if (string.length - 1 < strIndex) {
      return;
    }
    let timer = setTimeout(() => {
      typeWrite((str) => {
        strIndex++
        if (string.length > strIndex) {
          return str += string[strIndex];
        } else {
          return str;
        }

      })

    }, 150)


    return () => {
      clearTimeout(timer)
    };
  });

  return <p className={`  ${classArr.map((el)=>el).join('  ')}`} ref={ref}>{str.split('').map((e ,ind)=> <span key={ind} className='blink-text relative'>{e}</span>)}</p>;
};

export default TypeWritter;
