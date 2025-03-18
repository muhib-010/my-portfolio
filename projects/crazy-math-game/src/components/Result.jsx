export default function Result(props){
    return(
        <div className="p-8 shadow-2xl rounded-2xl bg-blur-sm backdrop-blur-md fixed top-1/2 left-1/2 
                        -translate-x-1/2 -translate-y-1/2 h-5/8 w-5/6 sm:w-1/2 
                        bg-gradient-to-r from-blue-500/75 to-purple-600/75 flex justify-center flex-col items-center
                        z-30">
            <p className="font-extrabold text-4xl text-white mb-16">Score: {props.score}</p>
            <button className="h-12 w-40 rounded-full bg-purple-500 text-2xl font-bold text-white outline-0
                            transition duration-300 ease-in-out 
                            hover:brightness-90 
                            active:scale-90"
                        onClick={() => {props.restart(); props.setKey(0)}}>
                Restart?
            </button>
            <div className="bg-gray-800 text-white text-sm p-2 rounded-lg w-fit mx-auto opacity-75 mt-8">
                <p><span className="text-blue-400">Space</span> → Restart</p>
            </div>
        </div>
    )
}