export default function Divider(props) {
    return (
        <div className={`w-full flex justify-center items-center gap-5 ${props.classArr && props.classArr.map((el)=>el).join('  ')}`}>
            <span className="block w-full  border  border-gray-900/10
            "></span>
            {(props.content) &&
                <>
                <span className="block text-gray-900 "> {props.content} </span>
                <span className="block w-full  border  border-gray-900/10"></span>
                
                </>
            }
        </div>
    )
}