import Mid from './HomeComponents/mainContent.jsx';
import Center from './HomeComponents/centerContent.jsx';
import Services from './HomeComponents/serviceContent.jsx';
import Portfolio from './HomeComponents/portfolioContent.jsx';
import Contact from './HomeComponents/contactContent.jsx';
import Footer from './HomeComponents/footerContent.jsx';
import Divider from '../common/components/dividerComponent.jsx';


export default function Main() {
    let classArr = ['uppercase', 'tracking-widest', 'text-nowrap', 'px-10']
    return (
        <>
            <Mid />
            <Services />
            <Center />
            <Portfolio />
            <Divider content='Connect With Us' classArr={classArr} />
            <Contact />
            <Footer />
        </>
    );
}
