import './style.css';

let IOLogo = ({ colour, width, height }) => {
    let cls1;
    let cls2;
    switch (colour) {
        case 'green':
            cls1 = 'cls-1-green';
            cls2 = 'cls-2-green';
            break;
        case 'black':
            cls1 = 'cls-1-black';
            cls2 = 'cls-2-black';
            break;
        case 'red':
            cls1 = 'cls-1-red';
            cls2 = 'cls-2-red';
            break;
        case 'white':
            cls1 = 'cls-1-white';
            cls2 = 'cls-2-white';
            break;
        default:
            cls1 = 'cls-1-black';
            cls2 = 'cls-2-black';
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 612 612">
            <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <g>
                        <path
                            className={cls1}
                            d="M612,306c0,169-137,306-306,306S0,475,0,306,137,0,306,0,612,137,612,306"
                        />
                        <path
                            className={cls2}
                            d="M243,447.82a186.55,186.55,0,0,1-66.49-185,23.31,23.31,0,1,0-45.59-9.72,233.22,233.22,0,0,0,83,231.16,23.31,23.31,0,0,0,29-36.47"
                        />
                        <path
                            className={cls2}
                            d="M439.56,301.81A80.56,80.56,0,1,1,359,221.26a80.64,80.64,0,0,1,80.56,80.55M359,174.64A127.17,127.17,0,1,0,486.17,301.81,127.31,127.31,0,0,0,359,174.64"
                        />
                        <path
                            className={cls2}
                            d="M190.67,199.83a38.6,38.6,0,1,0-38.6-38.6,38.64,38.64,0,0,0,38.6,38.6"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default IOLogo;
