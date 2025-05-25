import type { ReactElement } from 'react';
import css from './Loader.module.css';
import { RotatingTriangles } from 'react-loader-spinner'
  
export default function Loader(): ReactElement {
    return (
        <p className={css.text}
            role='status'
            aria-busy='true'
        >
            <RotatingTriangles
        visible={true}
        height='80'
        width='80' 
        ariaLabel='rotating-triangles-loading'
        wrapperStyle={{}}
        wrapperClass={''}
            />
            Loading movies, please wait...
        </p>
    );
}
