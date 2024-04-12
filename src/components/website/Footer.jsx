import React from 'react';
import flower from '../../assets/flowe.png';
import logo from '../../assets/ncs.png';
import { Link } from 'react-router-dom';

export const Footer = ({ abtClick, contactClick, acctClick }) => {
    return (
        <div className='relative bg-footer flex flex-col items-center py-10'>
            <img src={flower} alt="flower" className="inset-0 absolute left-0" />
            <footer className="md:py-20 w-full">
                <div className="mx-auto md:px-4 w-full">
                    <div className="flex flex-col md:flex-row gap-12 justify-between items-center mx-4 md:mx-8">
                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-1 items-center'>
                                <img src={logo} alt="Logo" className="h-8" />
                                <span className='text-primary text-xl font-bold'>NCSCBT</span>
                            </div>
                            <p className="mt-2 text-xs">280 Nothern Blvd Suite 326-324 Albny. {' '}
                                Ny 125-1400</p>
                        </div>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 justify-between gap-8 mx-auto px-10">
                            <div>
                                <h4 className="font-semibold mb-6">Navigation</h4>
                                <div className="text-darkgrey text-xs space-y-4 flex flex-col">
                                    <Link to="#" onClick={abtClick}>About Us</Link>
                                    <Link to="#" onClick={contactClick}>Contact Us</Link>
                                    <Link to="/create-account">Create Account</Link>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-6">Help</h4>
                                <div className="text-darkgrey text-xs space-y-4 flex flex-col">
                                    <Link>FAQ</Link>
                                    <Link>Terms of use</Link>
                                    <Link>Privacy policy</Link>
                                </div>
                            </div>
                            <div className='md:ml-14'>
                                <h4 className="font-semibold mb-6">Follow us on</h4>
                                <div className="text-darkgrey text-xs flex items-center gap-4">
                                    <Link>
                                        <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.21728 3.28463H9.88839V0.457967C9.07928 0.373831 8.2663 0.332292 7.45283 0.333523C5.03505 0.333523 3.38172 1.80908 3.38172 4.5113V6.84019H0.652832V10.0046H3.38172V18.1113H6.65283V10.0046H9.37283L9.78172 6.84019H6.65283V4.82241C6.65283 3.88908 6.90172 3.28463 8.21728 3.28463Z"
                                                className='hover:fill-secondary'
                                                fill="#016F4A" />
                                        </svg>
                                    </Link>
                                    <Link>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.1105 7.55448C14.3147 7.55414 13.5313 7.75097 12.8301 8.12739C12.7662 7.95888 12.6524 7.81383 12.504 7.71149C12.3557 7.60916 12.1797 7.5544 11.9994 7.55448H8.44386C8.32711 7.55441 8.21149 7.57736 8.10361 7.622C7.99574 7.66665 7.89772 7.73212 7.81517 7.81468C7.73261 7.89723 7.66714 7.99525 7.62249 8.10313C7.57785 8.211 7.5549 8.32662 7.55497 8.44337V19.11C7.5549 19.2268 7.57784 19.3424 7.62249 19.4503C7.66714 19.5582 7.73261 19.6562 7.81517 19.7387C7.89772 19.8213 7.99574 19.8867 8.10361 19.9314C8.21149 19.976 8.32711 19.999 8.44386 19.9989H11.9994C12.1162 19.999 12.2318 19.976 12.3397 19.9314C12.4475 19.8867 12.5455 19.8213 12.6281 19.7387C12.7107 19.6562 12.7761 19.5582 12.8208 19.4503C12.8654 19.3424 12.8884 19.2268 12.8883 19.11V14.2211C12.8883 13.9854 12.982 13.7593 13.1487 13.5926C13.3153 13.4259 13.5414 13.3323 13.7772 13.3323C14.0129 13.3323 14.239 13.4259 14.4057 13.5926C14.5724 13.7593 14.6661 13.9854 14.6661 14.2211V19.11C14.666 19.2268 14.689 19.3424 14.7336 19.4503C14.7783 19.5582 14.8437 19.6562 14.9263 19.7387C15.0088 19.8213 15.1068 19.8867 15.2147 19.9314C15.3226 19.976 15.4382 19.999 15.555 19.9989H19.1105C19.2273 19.999 19.3429 19.976 19.4508 19.9314C19.5586 19.8867 19.6567 19.8213 19.7392 19.7387C19.8218 19.6562 19.8872 19.5582 19.9319 19.4503C19.9765 19.3424 19.9995 19.2268 19.9994 19.11V12.4434C19.9978 11.1472 19.4822 9.90468 18.5657 8.98818C17.6492 8.07168 16.4066 7.55609 15.1105 7.55448ZM18.2216 18.2211H16.4439V14.2211C16.4439 13.5139 16.1629 12.8356 15.6628 12.3355C15.1627 11.8354 14.4844 11.5545 13.7772 11.5545C13.0699 11.5545 12.3917 11.8354 11.8916 12.3355C11.3915 12.8356 11.1105 13.5139 11.1105 14.2211V18.2211H9.33274V9.33226H11.1105V9.95726C11.1106 10.1414 11.1679 10.321 11.2745 10.4713C11.381 10.6215 11.5316 10.7349 11.7054 10.7959C11.8792 10.8569 12.0676 10.8624 12.2447 10.8117C12.4217 10.761 12.5787 10.6565 12.6939 10.5128C13.0928 10.0062 13.6399 9.63676 14.259 9.45614C14.878 9.27552 15.5379 9.29272 16.1467 9.50533C16.7555 9.71794 17.2827 10.1154 17.6547 10.6421C18.0267 11.1688 18.2249 11.7985 18.2216 12.4434V18.2211ZM5.77719 7.55448H2.22163C2.10488 7.55441 1.98927 7.57736 1.88139 7.622C1.77352 7.66665 1.6755 7.73212 1.59295 7.81468C1.51039 7.89723 1.44492 7.99525 1.40027 8.10313C1.35562 8.211 1.33268 8.32662 1.33274 8.44337V19.11C1.33268 19.2268 1.35562 19.3424 1.40027 19.4503C1.44492 19.5582 1.51039 19.6562 1.59294 19.7387C1.6755 19.8213 1.77351 19.8867 1.88139 19.9314C1.98927 19.976 2.10488 19.999 2.22163 19.9989H5.77719C5.89394 19.999 6.00956 19.976 6.11743 19.9314C6.22531 19.8867 6.32333 19.8213 6.40588 19.7387C6.48843 19.6562 6.55391 19.5582 6.59855 19.4503C6.6432 19.3424 6.66615 19.2268 6.66608 19.11V8.44337C6.66614 8.32662 6.6432 8.211 6.59855 8.10313C6.5539 7.99525 6.48843 7.89723 6.40588 7.81468C6.32332 7.73212 6.22531 7.66665 6.11743 7.622C6.00956 7.57736 5.89394 7.55441 5.77719 7.55448ZM4.8883 18.2211H3.11052V9.33226H4.8883V18.2211ZM4.01243 0.926033C3.62342 0.902747 3.23374 0.958831 2.86708 1.09087C2.50042 1.22291 2.16445 1.42816 1.8796 1.69412C1.59476 1.96007 1.36698 2.28119 1.21013 2.63794C1.05328 2.99469 0.970632 3.37962 0.967213 3.76931C0.963794 4.15901 1.03968 4.54533 1.19024 4.90477C1.34081 5.26422 1.56292 5.58929 1.84305 5.8602C2.12319 6.13112 2.45551 6.34222 2.81979 6.48068C3.18408 6.61913 3.57272 6.68205 3.96208 6.66559H3.98725C4.37729 6.68876 4.76796 6.63215 5.13539 6.49923C5.50282 6.36632 5.83928 6.15988 6.12423 5.89253C6.40918 5.62518 6.63662 5.30254 6.79266 4.94433C6.94871 4.58611 7.03007 4.19983 7.03178 3.80911C7.0335 3.41838 6.95552 3.03141 6.80263 2.67184C6.64974 2.31227 6.42513 1.98764 6.14254 1.71781C5.85995 1.44797 5.52531 1.23859 5.15906 1.10245C4.79281 0.966317 4.40265 0.906288 4.01242 0.926033H4.01243ZM3.98726 4.88781H3.96208C3.80836 4.90648 3.65243 4.89206 3.50474 4.84553C3.35705 4.79899 3.22101 4.72142 3.10576 4.618C2.99051 4.51459 2.8987 4.38772 2.83649 4.24592C2.77428 4.10412 2.74311 3.95065 2.74507 3.79582C2.74507 3.13262 3.24247 2.7038 4.01243 2.7038C4.16772 2.6831 4.32564 2.69592 4.47556 2.74139C4.62548 2.78686 4.76391 2.86393 4.88153 2.9674C4.99916 3.07088 5.09324 3.19836 5.15745 3.34126C5.22165 3.48416 5.25449 3.63916 5.25375 3.79582C5.25375 4.45901 4.75635 4.88781 3.98726 4.88781Z"
                                                className='hover:fill-secondary'
                                                fill="#016F4A" />
                                        </svg>
                                    </Link>
                                    <Link>
                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.7467 3.40905C13.5357 3.40905 13.3295 3.47161 13.1541 3.58882C12.9787 3.70602 12.842 3.87262 12.7612 4.06752C12.6805 4.26243 12.6594 4.4769 12.7005 4.68382C12.7417 4.89073 12.8433 5.08079 12.9925 5.22997C13.1416 5.37914 13.3317 5.48073 13.5386 5.52189C13.7455 5.56305 13.96 5.54192 14.1549 5.46119C14.3498 5.38046 14.5164 5.24374 14.6336 5.06833C14.7508 4.89291 14.8134 4.68669 14.8134 4.47572C14.8134 4.19282 14.701 3.92151 14.5009 3.72147C14.3009 3.52143 14.0296 3.40905 13.7467 3.40905ZM17.8356 5.56016C17.8183 4.82265 17.6802 4.09297 17.4267 3.40016C17.2007 2.80739 16.8489 2.27063 16.3956 1.82683C15.9554 1.37121 15.4174 1.02165 14.8223 0.804607C14.1313 0.543417 13.4008 0.402127 12.6623 0.386829C11.72 0.333496 11.4178 0.333496 9.00003 0.333496C6.58226 0.333496 6.28003 0.333496 5.33781 0.386829C4.59928 0.402127 3.86878 0.543417 3.17781 0.804607C2.58375 1.02385 2.0462 1.37311 1.60448 1.82683C1.14886 2.26699 0.799302 2.805 0.582256 3.40016C0.321066 4.09113 0.179776 4.82163 0.164478 5.56016C0.111145 6.50239 0.111145 6.80461 0.111145 9.22239C0.111145 11.6402 0.111145 11.9424 0.164478 12.8846C0.179776 13.6231 0.321066 14.3536 0.582256 15.0446C0.799302 15.6398 1.14886 16.1778 1.60448 16.6179C2.0462 17.0717 2.58375 17.4209 3.17781 17.6402C3.86878 17.9014 4.59928 18.0426 5.33781 18.0579C6.28003 18.1113 6.58226 18.1113 9.00003 18.1113C11.4178 18.1113 11.72 18.1113 12.6623 18.0579C13.4008 18.0426 14.1313 17.9014 14.8223 17.6402C15.4174 17.4231 15.9554 17.0736 16.3956 16.6179C16.8509 16.1758 17.203 15.6386 17.4267 15.0446C17.6802 14.3518 17.8183 13.6221 17.8356 12.8846C17.8356 11.9424 17.8889 11.6402 17.8889 9.22239C17.8889 6.80461 17.8889 6.50239 17.8356 5.56016ZM16.2356 12.7779C16.2291 13.3422 16.1269 13.9012 15.9334 14.4313C15.7914 14.8181 15.5635 15.1677 15.2667 15.4535C14.9784 15.7473 14.6296 15.9748 14.2445 16.1202C13.7144 16.3137 13.1554 16.4159 12.5911 16.4224C11.7023 16.4668 11.3734 16.4757 9.03559 16.4757C6.69781 16.4757 6.36892 16.4757 5.48003 16.4224C4.89416 16.4334 4.31079 16.3431 3.75559 16.1557C3.3874 16.0029 3.05457 15.776 2.77781 15.4891C2.48278 15.2035 2.25767 14.8537 2.12003 14.4668C1.90302 13.9292 1.78265 13.3574 1.76448 12.7779C1.76448 11.8891 1.71115 11.5602 1.71115 9.22239C1.71115 6.88461 1.71115 6.55572 1.76448 5.66683C1.76846 5.08999 1.87377 4.51834 2.07559 3.97794C2.23208 3.60275 2.47227 3.2683 2.77781 3.00016C3.04787 2.69453 3.38162 2.4518 3.75559 2.28905C4.29741 2.09353 4.86848 1.99134 5.44448 1.98683C6.33337 1.98683 6.66226 1.9335 9.00003 1.9335C11.3378 1.9335 11.6667 1.9335 12.5556 1.98683C13.1198 1.9933 13.6789 2.09549 14.2089 2.28905C14.6129 2.43896 14.9754 2.68269 15.2667 3.00016C15.558 3.27321 15.7856 3.60704 15.9334 3.97794C16.1309 4.51922 16.2332 5.09063 16.2356 5.66683C16.28 6.55572 16.2889 6.88461 16.2889 9.22239C16.2889 11.5602 16.28 11.8891 16.2356 12.7779ZM9.00003 4.66238C8.09853 4.66414 7.21778 4.93307 6.46906 5.4352C5.72034 5.93733 5.13726 6.65012 4.79349 7.4835C4.44971 8.31688 4.36068 9.23347 4.53763 10.1174C4.71458 11.0014 5.14958 11.8131 5.78766 12.4499C6.42574 13.0868 7.23827 13.5202 8.12258 13.6954C9.00689 13.8706 9.92329 13.7798 10.756 13.4344C11.5887 13.089 12.3004 12.5046 12.801 11.7549C13.3017 11.0052 13.5689 10.1239 13.5689 9.22239C13.5701 8.62248 13.4527 8.02826 13.2234 7.4739C12.9941 6.91955 12.6574 6.41599 12.2328 5.99221C11.8082 5.56842 11.304 5.23277 10.7492 5.00454C10.1944 4.77632 9.59994 4.66004 9.00003 4.66238ZM9.00003 12.1824C8.4146 12.1824 7.84232 12.0088 7.35555 11.6835C6.86878 11.3583 6.48939 10.896 6.26535 10.3551C6.04132 9.81426 5.9827 9.2191 6.09691 8.64492C6.21112 8.07073 6.49303 7.54331 6.907 7.12935C7.32096 6.71539 7.84838 6.43347 8.42257 6.31926C8.99675 6.20505 9.59191 6.26367 10.1328 6.4877C10.6736 6.71174 11.1359 7.09113 11.4612 7.5779C11.7864 8.06467 11.96 8.63695 11.96 9.22239C11.96 9.6111 11.8835 9.99601 11.7347 10.3551C11.586 10.7143 11.3679 11.0406 11.0931 11.3154C10.8182 11.5903 10.4919 11.8083 10.1328 11.9571C9.77365 12.1058 9.38875 12.1824 9.00003 12.1824Z"
                                                className='hover:fill-secondary'
                                                fill="#016F4A" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className='font-semibold -mb-10 pt-10 pb-5'>&copy; Enda Rae 2024.</div>
        </div>
    );
};