import { useState, useEffect } from "react";
import useIntersectionObserver from '../../common/components/intersectionObserver';
import '../../../../css/HomeFile/portfolioContent.css';


export default function Portfolio() {

    let projects_count = '31';
    let ongo_projects_count = '25';
    let wait_projects_count = '03';
    let [projects, changeCount] = useState('00');
    let [projects2, changeCount2] = useState('00');
    let [projects3, changeCount3] = useState('00');


    let [ref, isIntersecting] = useIntersectionObserver({
        root: null,
        rootMargin: '0px',
        threshold: 0.1,

    })
    let [ref2, isIntersecting2] = useIntersectionObserver({
        root: null,
        rootMargin: '0px',
        threshold: 0.1,

    })
    let [ref3, isIntersecting3] = useIntersectionObserver({
        root: null,
        rootMargin: '0px',
        threshold: 0.1,

    })
    useEffect(() => {
        if (!isIntersecting) {
            return;
        }
        if (projects == projects_count) {
            return;
        }

        let count = Number(projects_count);
        let timer = setTimeout(() => {
            changeCount((preCount) => {
                let num = Number(preCount)
                if (typeof num != 'undefined' && (num < count)) {
                    num++
                    num = num.toString().length == 1 ? '0' + num.toString() : num.toString()
                    return num;
                }
            })
        }, 100)
        return () => {
            clearTimeout(timer);
        }
    })
    useEffect(() => {
        if (!isIntersecting2) {
            return;
        }
        if (projects2 == ongo_projects_count) {
            return;
        }

        let count = Number(ongo_projects_count);
        let timer = setTimeout(() => {
            changeCount2((preCount) => {
                let num = Number(preCount)
                if (typeof num != 'undefined' && (num < count)) {
                    num++
                    num = num.toString().length == 1 ? '0' + num.toString() : num.toString()
                    return num;
                }
            })
        }, 100)
        return () => {
            clearTimeout(timer);
        }
    })
    useEffect(() => {
        if (!isIntersecting3) {
            return;
        }
        if (projects3 == wait_projects_count) {
            return;
        }

        let count = Number(wait_projects_count);
        let timer = setTimeout(() => {
            changeCount3((preCount) => {
                let num = Number(preCount)
                if (typeof num != 'undefined' && (num < count)) {
                    num++
                    num = num.toString().length == 1 ? '0' + num.toString() : num.toString()
                    return num;
                }
            })
        }, 100)
        return () => {
            clearTimeout(timer);
        }
    })

    return (
        <div className='container m-10  rounded-md mx-auto portfolioBg'>
            <div className='uppercase tracking-widest p-2 text-center text-xl font-medium text-gray-800'>
                portfolio
            </div>
            <div className='lg:px-14 sm:m-9'>
                <h1 className='mt-2 font-semibold '>Take a Look at Our Work</h1>
                <p className='mb-2 mt-2 roboto-condensed-font'>"We’re proud of the websites we’ve created for our clients. Browse through our portfolio to see examples of our web development, design, and eCommerce projects."
                </p>

            </div>
            <div className="flex lg:px-14 sm:m-9 flex-col md:flex-row sm:gap-4">
                <div className='lg:w-1/2 md:w-full text-center'>
                    <div className="font-bold   text-8xl">

                        <div className="number_last number_block flex justify-center items-center">
                            <span className='block' ref={ref} >{projects}</span>
                        </div>
                    </div>
                    <p className="mt-2 roboto-condensed-font text-gray-600 tracking-widest uppercase">projects</p>
                </div>
                <div className='lg:w-1/2 md:w-full text-center'>
                    <div className="font-bold   text-8xl">

                        <div className="number_last number_block flex justify-center items-center">
                            <span className='block' ref={ref2} >{projects2}</span>
                        </div>
                    </div>
                    <p className="mt-2 roboto-condensed-font text-gray-600 tracking-widest uppercase">on going projects</p>
                </div>
                <div className='lg:w-1/2 md:w-full text-center'>
                    <div className="font-bold   text-8xl">

                        <div className="number_last number_block flex justify-center items-center">
                            <span className='block' ref={ref3} >{projects3}</span>
                        </div>
                    </div>
                    <p className="mt-2 roboto-condensed-font text-gray-600 tracking-widest uppercase">waiting projects</p>
                </div>


            </div>
            <div className='lg:px-14 sm:m-9'>
                <div className='w-full roboto-condensed-font text-center mt-4'>
                    <p>We’re proud of the websites we’ve created for our clients. Browse through our portfolio to see examples of our web development, design, and eCommerce projects.</p>
                </div>

            </div>

        </div>
    )


}