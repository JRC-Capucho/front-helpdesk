import React from "react";
import style from "./Loader.module.scss";


function Loader() {
    return (
        <>
            <div className={style.loading_wave}>
                <div className={style.loading_bar}></div>
                <div className={style.loading_bar}></div>
                <div className={style.loading_bar}></div>
                <div className={style.loading_bar}></div>
            </div>

        </>
    );
}

export default Loader;