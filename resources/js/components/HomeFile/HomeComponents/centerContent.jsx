import TypeWritter from '../../common/components/typeWritterEffect';
import '../../../../css/HomeFile/centerContent.css';



export default function Center() {

    return (
        <div className='container m-10  mx-auto rounded-md aboutBg'>
            <div className='uppercase tracking-widest p-2 text-center text-xl font-medium'>
                About Us
            </div>
            <div className='lg:px-14 sm:m-9'>
                <h1 className='mt-2 font-bold '>Passionate About Crafting Digital Experiences</h1>
                <div className='mt-2 roboto-condensed-font'>
                    <p className='mb-2'>"At {process.env.MIX_APP_NAME}, we are a team of experienced web developers, designers, and digital strategists committed to bringing your vision to life. With a focus on user-centric design and cutting-edge technology, we build websites that not only look stunning but also convert visitors into customers."
                    </p>
                    <TypeWritter classArr={[]} string='"Our mission is to help businesses succeed online by creating user-friendly, scalable, and results-oriented websites."' />
                </div>

            </div>

        </div>
    )

}